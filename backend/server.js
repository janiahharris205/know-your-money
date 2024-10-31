const express = require('express');
const moment = require ('moment');
const app = express();
const port = 3001;
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const plaid = require('plaid');
const {PLAID_CLIENT_ID, PLAID_SECRET} = require('./key');

// Modified: https://www.npmjs.com/package/plaid
// The constructor has been changed for the client
const client = new plaid.Configuration({
        basePath: plaid.PlaidEnvironments.sandbox,
        baseOptions: {
            headers: {
                'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
                'PLAID-SECRET': PLAID_SECRET
            }
        }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Assumes MongoDB instance is available, I created one using a Docker container: 
// Reference: https://hub.docker.com/_/mongo
// docker run --name kym-mongo -d \
// -p 21000:27017 \
// -e MONGO_INITDB_ROOT_USERNAME=kym -e MONGO_INITDB_ROOT_PASSWORD=kym -e MONGO_INITDB_DATABASE=kym \
// -v ./mongo_data:/data/db mongo:4
// Note: I used a "non-standard" port (21000) for the instance I created.
mongoose.connect("mongodb://kym:kym@localhost:21000/users?authSource=admin")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const db = mongoose.connection;
let userSchema = mongoose.Schema({
        email: String,
        password: String,
        transactions: Array,
        items: Array
    });

let User = mongoose.model('User', userSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {

app.get('/', (req, res) => {
        res.send('Hello world!!!');
    });

app.post('/signup', (req, res) => {
        let {email, password } = req.body;
        let newUser = new User({email, password});

        newUser.save((err, user) => { res.send({message:`User created with ID: ${user._id}`})});
    });

// Modified due to mongoose 8.7.3 updates: https://mongoosejs.com/docs/api/query.html#Query.prototype.findOne()
// I mainly just removed the callback, as MongooseJS seems to no longer support them in their queries.
app.post('/login', async (req, res) => {
        let {email, password } = req.body;
        const user = await User.findOne({email, password});

        if (!user){
            res.sendStatus(401);
            console.error(`User with email "${email}" and password "${password}" not found`)
            return;
        }
        res.send({id:doc._id})
    });

app.post('/create_link_token', (req, res) => {
        let {uid} = req.body;
        console.log(`Recieved: ${uid} as token!!!`);
        User.findById(uid, (err, doc) => {
            if (err){
                res.sendStatus(400);
                return;
            }
            let userId = doc._id;

            client.createLinkToken({
                user: {
                        client_user_id: userId
                    },
                client_name: 'Know Your Money',
                products: ['transactions'],
                country_codes: ['US'],
                language: 'en'
                }, (err, linkTokenResponse) => {
                    res.json({link_token: linkTokenResponse.link_token});
                    });

            });
    });

app.post('/get_access_token', (req, res) => {
        let {public_token, uid} = req.body;

        client.exchangePublicToken(public_token, (err, response) => {
                if (err)
                    return res.json({error: "Oops"});

                let {access_token, item_id} = response;

                User.findByIdAndUpdate(uid, { $addToSet: {items: {access_token: access_token, item_id: item_id}}}, (err, data) => {
                console.log("Getting transactions");
                let today = moment().format('YYYY-MM-DD');
                let past = moment().subtract(30, 'days').format('YYYY-MM-DD');
                client.getTransactions(access_token, past, today, (err, response) => {
                res.send({transactions: response.transactions});
                User.findByIdAndUpdate(uid, { $addToSet: {transactions: response.transactions}}, (err, data) => {
                    });
                    });
                    });
            });
    });

app.post('/transactions', (req, res) => {
        let {uid} = req.body;

        User.findById(uid, (err, doc) => {
            if (err){
                res.sendStatus(400);
                return;
            }
                res.send({transactions : doc.transactions});
            });
    });

app.post('/accounts', (req, res) => {
        let {uid} = req.body;

        User.findById(uid, (err, doc) => {
            if (err){
                res.sendStatus(400);
                return;
            }
                res.send({accounts : doc.items});
            });
    });

app.listen(port, () =>{
        console.log(`Listending on port ${port}`);
    });
    });
