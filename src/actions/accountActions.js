import React from 'react';
import {GET_ACCOUNTS, PARSE_ACCOUNTS} from './types';
import axios from 'axios';

//retrieve accounts from the backend and dispatch them to the Redux store
export const getAccounts = (uid, callback) => dispatch => {
    axios.post('http://localhost:3001/accounts',{uid})
         .then(res => {
                if (res.status === 200){
                    dispatch({
                            type: GET_ACCOUNTS,
                            payload: {rawAccounts: res.data.accounts}
                    })
                    if (callback) {
                        callback(res.data.accounts);
                    }
                }
    });
}

//parse raw account data into display elements for rendering
export const parseAccounts = (rawAccounts) => dispatch => {
        let elements = rawAccounts.map(rawAccount => (
            <tr>
                <td>
                    {rawAccount.item_id}
                </td>
            </tr>
        ));

        dispatch({
                type: PARSE_ACCOUNTS,
                payload: {displayElements: elements}
            });
};