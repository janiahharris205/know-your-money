import React from 'react';
import { PlaidLink } from 'react-plaid-link';
import {connect} from 'react-redux';
import {generateLinkTransactions} from '../actions/linkActions';
import { getAccounts, parseAccounts } from '../actions/accountActions';
import { getTransactions } from '../actions/loginActions';
import { parseTransactions } from '../actions/transactionActions';

/**
 * Link component connects a bank account using Plaid's service
 */
class Link extends React.Component {
  render (){
    return (
        <PlaidLink
          style={{ marginRight: "0", marginLeft: "auto"}}
          token={this.props.link_token}
          onSuccess={ (public_token) => {
            this.props.generateLinkTransactions(public_token,this.props.uid, (uid) => {
              this.props.getAccounts(uid, (accounts) => {this.props.parseAccounts(accounts)})

              this.props.getTransactions(this.props.uid, (transactions) => {
                this.props.parseTransactions(transactions);
              })
            })
          }}
        >
          Connect a bank account
        </PlaidLink>
      );
  }
};

//maps state from Redux store to component props
const mapStateToProps = state => ({
  link_token: state.login.link_token,  //token from the login state for Plaid link
  uid: state.login.uid,  //user ID from login state
  transactions: state.link.transactions  //transactions data from link state
});

//connects the component to the Redux store and maps actions as props
export default connect(mapStateToProps, {generateLinkTransactions, getAccounts, parseAccounts, getTransactions, parseTransactions})(Link);
