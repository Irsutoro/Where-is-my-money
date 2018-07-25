import { TRANSACTIONS_LOADING, TRANSACTIONS_ERROR, TRANSACTIONS_SUCCESS,TRANSACTIONS_PART_SUCCESS, CURRENCIES_UPDATE, CATEGORIES_UPDATE }
from './types';

const transactionsUrl = "http://www.iraminius.pl/wmm/api/transactions/"
const currenciesUrl = "http://www.iraminius.pl/wmm/api/currency/"
const categoriesUrl = "http://www.iraminius.pl/wmm/api/categories/"

import axios from 'axios'

/**
 * getTransactions
 *
 * @param {number} from Timestamp from which begin fetching transactions
 * @param {number} to Timestamp of last transaction date to fetch
 */
export const getTransactions = (subaccountId) => dispatch => {
    dispatch({
        type: TRANSACTIONS_LOADING,
        payload: true
    })
    dispatch({
        type: TRANSACTIONS_ERROR,
        payload: false
    })

    return axios.get(transactionsUrl, {
            headers: {
                'Authorization': sessionStorage.getItem('Authorization')
            },
            params:{
                subaccount_id: subaccountId
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

export const addTransaction = (transaction) => dispatch => {
    dispatch({
        type: TRANSACTIONS_LOADING,
        payload: true
      })
    
      return axios.post(transactionsUrl, transaction, {
          headers: {
            'Authorization': sessionStorage.getItem('Authorization')
          }
        })
        .then(() => {
            dispatch(getTransactions())
        })
        .finally(() => {
          dispatch({
            type: TRANSACTIONS_LOADING,
            payload: false
          })
        })
}

export const updateTransaction = (id, transaction) => dispatch => {
    dispatch({
        type: TRANSACTIONS_LOADING,
        payload: true
      })
    
      return axios.put(transactionsUrl + id, transaction, {
          headers: {
            'Authorization': sessionStorage.getItem('Authorization')
          }
        })
        .finally(() => {
          dispatch({
            type: TRANSACTIONS_LOADING,
            payload: false
          })
    
          dispatch(getTransactions())
        })
}

export const deleteTransaction = (id) => dispatch => {
    dispatch({
        type: TRANSACTIONS_LOADING,
        payload: true
      })
    
      return axios.delete(transactionsUrl + id, {
          headers: {
            'Authorization': sessionStorage.getItem('Authorization')
          }
        })
        .finally(() => {
          dispatch({
            type: TRANSACTIONS_LOADING,
            payload: false
          })
    
          dispatch(getTransactions())
        })
}

export const getTransactionsPart = (from,to,subaccountId) => dispatch => {
    dispatch({
        type: TRANSACTIONS_LOADING,
        payload: true
    })
    dispatch({
        type: TRANSACTIONS_ERROR,
        payload: false
    })
    
    return axios.get(transactionsUrl, {
            headers: {
                'Authorization': sessionStorage.getItem('Authorization')
            },
            params:{
                subaccount_id: subaccountId,
                time_from: from,
                time_to: to
            }
        })
        .then(res => {
            let transactionsPart = res.data
            dispatch({
                type: TRANSACTIONS_PART_SUCCESS,
                payload: transactionsPart
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

export const getCurrencies = () => dispatch => {
    axios.get(currenciesUrl, {
        headers: {
            'Authorization': sessionStorage.getItem('Authorization')
        }
    })
    .then(res => {
        let currencies = res.data
        dispatch({
            type: CURRENCIES_UPDATE,
            payload: currencies
        })
    })
}

export const getCategories = () => dispatch => {
    axios.get(categoriesUrl, {
        headers: {
            'Authorization': sessionStorage.getItem('Authorization')
        }
    })
    .then(res => {
        let categories = res.data
        dispatch({
            type: CATEGORIES_UPDATE,
            payload: categories
        })
    })
}

export const addCategory = (name) => dispatch => {
    axios.post(categoriesUrl, {
        name: name
    }, {
        headers: {
            'Authorization': sessionStorage.getItem('Authorization')
        }
    })
    .finally(res => {
        dispatch(getCategories())
    })
}

export const deleteCategory = (id) => dispatch => {
    axios.delete(categoriesUrl + id, {
        headers: {
            'Authorization': sessionStorage.getItem('Authorization')
        }
    })
    .finally(res => {
        dispatch(getCategories())
    })
}