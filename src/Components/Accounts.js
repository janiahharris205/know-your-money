import React, {Component} from 'react';
import {
    Table
  } from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import { getAccounts, parseAccounts } from '../actions/accountActions';
import { CardHeader, Typography } from '@mui/material';
/**
 *  AccountHolder component displays account information for a user
 */

class AccountHolder extends Component{

    //called when the component mounts. initiates fetching account data
    componentDidMount(){
        this.props.getAccounts(this.props.uid); //fetch accounts for the current user by UID
    }

    //called after each update to the component
    componentDidUpdate(){
        //if rawAccounts are loaded but displayElements are not yet set, parse rawAccounts into display elements
        if (this.props.rawAccounts.length > 0 && this.props.displayElements.length === 0)
            this.props.parseAccounts(this.props.rawAccounts); //convert raw account data to display format
      }

    render(){
         //display a header if there are no accounts or display elements are empty
        if (!this.props.displayElements || this.props.displayElements.length === 0){
            return (<>

                <CardHeader title="Accounts" titleTypographyProps={{variant:'h4'}}>
                    <Typography variant="h2" gutterBottom>
                        Accounts
                    </Typography>
                </CardHeader>
            </>)
        }
        //render the accounts table with parsed account data
        return (<>
            <CardHeader title="Accounts" titleTypographyProps={{variant:'h4'}}>
                <Typography variant="h2" gutterBottom>
                    Accounts
                </Typography>
            </CardHeader>
            
            <Table striped>
                <tbody>
                    <tr>
                        <th>Name</th>
                    </tr>
                    {this.props.displayElements}
                </tbody>
            </Table>
        </>);
    }
} 

//map Redux state to component props for account and user data
const mapStateToProps = state => ({
    rawAccounts: state.account.rawAccounts,  //raw account data from the state
    displayElements: state.account.displayElements,  //parsed elements ready for display
    uid: state.login.uid  //user ID from the login state
});

//connect component to Redux store and actions
export default connect(mapStateToProps, {getAccounts, parseAccounts})(AccountHolder);