import { TRANSACTIONS_LOADING, TRANSACTIONS_ERROR, TRANSACTIONS_SUCCESS }
from './types';

const transactionsUrl = "http://www.iraminius.pl/wmm/api/transactions"

import axios from 'axios'

/**
 * getTransactions
 *
 * @param {number} from Timestamp from which begin fetching transactions
 * @param {number} to Timestamp of last transaction date to fetch
 */
export const getTransactions = (from, to) => dispatch => {
    dispatch({
        type: TRANSACTIONS_LOADING,
        payload: true
    })
    dispatch({
        type: TRANSACTIONS_ERROR,
        payload: false
    })

    axios.get(transactionsUrl, {
            headers: {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
        .then(res => {
            let transactions = res.data
            dispatch({
                type: TRANSACTIONS_SUCCESS,
                payload: transactions
            })
        })
        .catch(() => {
            dispatch({
                type: TRANSACTIONS_ERROR,
                payload: true
            })
        })
        .finally(() => { 
            dispatch({
                type: TRANSACTIONS_LOADING,
                payload: false
            })
        })
}