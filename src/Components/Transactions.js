import React, {Component} from 'react';
import {
    Table
  } from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import {parseTransactions} from '../actions/transactionActions'
import {CardHeader, Typography} from '@mui/material';

class Transactions extends Component{

    componentDidUpdate(props){
        if (this.props.rawTransactions.length > 0 && this.props.displayElements.length  === 0)
            this.props.parseTransactions(this.props.rawTransactions);
    }

    render(){
        if (!this.props.displayElements || this.props.displayElements.length === 0){
            return (<>
                <CardHeader title="Transactions" titleTypographyProps={{variant:'h4'}}>
                <Typography variant="h2" gutterBottom>
                    Transactions
                </Typography>
            </CardHeader>
            </>)
        }
        return (<>
                <CardHeader title="Transactions" titleTypographyProps={{variant:'h4'}}>
                    <Typography variant="h2" gutterBottom>
                        Transactions
                    </Typography>
                </CardHeader>
                <Table striped>
                    <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                        {this.props.displayElements}
                    </tbody>
                </Table>
        </>);
    }
} 

const mapStateToProps = state => ({
        displayElements: state.transaction.displayElements,
        rawTransactions: state.login.transactions
});

export default connect(mapStateToProps, { parseTransactions })(Transactions);