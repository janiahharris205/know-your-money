import React, {Component} from 'react';
import {
    Table
  } from 'reactstrap';
import {connect} from 'react-redux';
import {parseTransactions} from '../actions/transactionActions'
import {CardHeader, Typography} from '@mui/material';

class Transactions extends Component{

    componentDidUpdate(props){
        //parse transactions if there are raw transactions but displayElements is empty
        if (this.props.rawTransactions.length > 0 && this.props.displayElements.length  === 0) {
            this.props.parseTransactions(this.props.rawTransactions);
        }
    }

    render(){
        //render message if there are no transactions to display
        if (!this.props.displayElements || this.props.displayElements.length === 0){
            return (<>
                <CardHeader title="Transactions" titleTypographyProps={{variant:'h4'}}>
                <Typography variant="h2" gutterBottom>
                    Transactions
                </Typography>
            </CardHeader>
            </>)
        }

        //render table with transaction details if displayElements are present
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
    displayElements: state.transaction.displayElements,  //processed transactions for display
    rawTransactions: state.login.transactions  //unprocessed raw transactions
});

//connect component to Redux, mapping state and the parseTransactions action
export default connect(mapStateToProps, { parseTransactions })(Transactions);