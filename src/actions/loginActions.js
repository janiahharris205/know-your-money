import { LOGIN_USER, GENERATE_LINK_TOKEN, GET_TRANSACTIONS} from './types';
import axios from 'axios';

//log in a user with email and password, dispatch login status and UID to Redux store
export const loginUser = (email, password, callback) => dispatch => {
    axios.post('http://localhost:3001/login', { email, password })
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: LOGIN_USER,
                    payload: { uid: res.data.id, isLoggedin: true }
                });
                // all generateLinkToken after successful login to create a link token for the user
                dispatch(generateLinkToken(res.data.id)); // dispatch the action directly
                if (callback) callback(); // optional callback for further actions
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            // handle specific error scenarios (e.g., 401 Unauthorized)
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Login failed: ${error.response.data.message}`); // Show a user-friendly message
            } else if (error.request) {
                console.error('Request error:', error.request);
                alert('Login failed: No response from server.'); // Handle request errors
            } else {
                console.error('Error message:', error.message);
                alert(`Login failed: ${error.message}`); // Other errors
            }
        });
};

//generate a link token after user login, dispatched to Redux store
export const generateLinkToken = (uid) => dispatch => {
    console.log('Generating link token for UID:', uid);
    axios.post('http://192.168.86.119:3001/create_link_token', { uid })
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: GENERATE_LINK_TOKEN,
                    payload: { link_token: res.data.link_token }
                });
            }
        })
        .catch(error => {
            console.error('Error generating link token:', error);
            // Handle errors similarly as in loginUser
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('Request error:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        });
};

//fetch transactions for a specific user, dispatched to Redux store
export const getTransactions = (uid, callback) => dispatch => {
    axios.post('http://192.168.86.119:3001/transactions', { uid })
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: GET_TRANSACTIONS,
                    payload: { transactions: res.data.transactions }
                });
                if (callback) {
                    callback(res.data.transactions);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching transactions:', error);
            // Handle errors similarly as in loginUser
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('Request error:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        });
};