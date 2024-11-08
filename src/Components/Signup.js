import React, {  Component } from "react";
import axios from "axios";
import { Navigate } from 'react-router';
import {connect} from 'react-redux';
import {signupUser} from '../actions/signupActions'; 
import { Button, Container, Grid} from '@mui/material';

class SignUp extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        //binding methods to class instance
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    //update email state as input changes
    updateEmail(event){
        this.setState({
            email: event.target.value
        });
    }

    //update password state as input changes
    updatePassword(event){
        this.setState({
            password: event.target.value
        });
    }

    //handle form submission and dispatch signup action
    submitForm(){
        this.props.signupUser(this.state.email, this.state.password);
    }

    render(){
        //redirect to sign-in page if signup is completed
        if (this.props.formCompleted){
            return (<Navigate to="/sign-in" />)
        }
        return (
            <Container maxWidth='sm'>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                            <h3>Sign Up</h3>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.updateEmail}/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.updatePassword}/>
                            </div>
                            <Button variant="contained" color="primary" onClick={this.submitForm}>Create Account</Button>
                </Grid>
            </Container>
        )
    }
}

//mapping Redux state to component props
const mapStateToProps = state => ({
        formCompleted: state.signup.formCompleted //indicates signup completion status
});
//connect component to Redux store and map actions as props
export default connect(mapStateToProps, { signupUser })(SignUp);