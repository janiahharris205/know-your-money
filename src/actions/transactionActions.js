import React from 'react';
import { PARSE_TRANSACTIONS } from './types';
import axios from 'axios';

//parse raw transaction data into display elements for rendering
export const parseTransactions = (rawTransactions) => dispatch => {

    //map through each transaction to create an array of table row elements
    let displayElements = rawTransactions.map(rawTransaction => (
        <tr>
            <td>
                {rawTransaction.date}
            </td>
            <td>
                {rawTransaction.name}
            </td>
            <td>
                {rawTransaction.amount}
            </td>
        </tr>
    ));
    dispatch({
            type: PARSE_TRANSACTIONS,
            payload: {displayElements}
    });
}