import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import Landing from "./Components/Landing";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import { Component } from 'react';



class App extends Component {

  constructor(props){
    super(props);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  //checks if the user is logged in
  isLoggedIn(){
    if (this.props.isLoggedIn){
      return true
    }
    return false;
  }

render () {
  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/overview" element={!this.isLoggedIn() ? <Navigate to="/sign-in" /> : <Landing />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
}

//maps login state from Redux to component props
const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedin
})

//connect component to Redux
export default connect(mapStateToProps, {})(App);