import React, {  Component } from "react";
import axios from 'axios';
import { Navigate } from 'react-router';
import { connect } from 'react-redux';
import { loginUser, generateLinkToken, getTransactions} from '../actions/loginActions';
import { Button, Container, Grid} from '@mui/material';
import { Link } from "react-router-dom";

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    //update state as email input changes
    updateEmail(event){
        this.setState({
            email: event.target.value
        }, () => console.log(this.state));
    }

    //update state as password input changes
    updatePassword(event){
        this.setState({
            password: event.target.value
        }, () => console.log(this.state));
    }

    //handle form submission and dispatch login action
    submitForm(event){
        event.preventDefault();

        this.props.loginUser(this.state.email, this.state.password);
    }

    //react lifecycle method, triggers after component re-renders
    componentDidUpdate(){
        //check if user is logged in and dispatch additional actions
        if (this.props.uid !== ''){
            this.props.generateLinkToken(this.props.uid);
            this.props.getTransactions(this.props.uid);
        }
    }

    render(){
        //if user is logged in, redirect to overview page
        if (this.props.isLoggedin){
            return (<Navigate to={{pathname: "/overview", state: {uid: this.state.uid}}}/>)
        }
            
        return (
            <Container>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.updateEmail}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.updatePassword}/>
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <Button variant="contained" color="primary" onClick={this.submitForm}>Login</Button>
                    <div>
                        <p>
                            Don’t have an account? <Link to="/sign-up">Sign up</Link>
                        </p>
                    </div>
                </Grid>
            </Container>
        )
    }
}

//mapping Redux state to component props
const mapStateToProps = state => ({
    uid: state.login.uid, //user ID from Redux login state
    isLoggedin: state.login.isLoggedin, //login status
    link_token: state.login.link_token, //link token from login state
    transactions: state.login.transactions //transactions data
});

//connect component to Redux store and map actions as props
export default connect(mapStateToProps, { loginUser, generateLinkToken, getTransactions})(Login);