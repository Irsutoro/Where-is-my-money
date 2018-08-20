import { TRANSACTIONS_LOADING, TRANSACTIONS_ERROR,FILE_LOADING, TRANSACTIONS_SUCCESS,TRANSACTIONS_PART_SUCCESS, CURRENCIES_UPDATE, CATEGORIES_UPDATE,FORMATS_UPDATE }
from './types';

const transactionsUrl = "http://www.iraminius.pl/wmm/api/transactions/"
const currenciesUrl = "http://www.iraminius.pl/wmm/api/currency/"
const categoriesUrl = "http://www.iraminius.pl/wmm/api/categories/"
const csvUrl = "http://www.iraminius.pl/wmm/api/csv/"

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
            dispatch(getTransactions(transaction.subaccount_id))
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
    
          dispatch(getTransactions(transaction.subaccount_id))
        })
}

export const deleteTransaction = (id, subaccountId) => dispatch => {
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
    
          dispatch(getTransactions(subaccountId))
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
export const getFormats = () => dispatch => {
    axios.get(csvUrl, {
        headers: {
            'Authorization': sessionStorage.getItem('Authorization')
        }
    })
    .then(res => {
        let formats = res.data
        dispatch({
            type: FORMATS_UPDATE,
            payload: formats
        })
    })
}
export const updateCsvFile = (formatId,subaccountId,file) => dispatch => {
    dispatch({
        type: FILE_LOADING,
        payload: true
      })
      var formData = new FormData();
      formData.append("csv_file",file);
      formData.append("format_id",formatId);
      formData.append("subaccount_id",subaccountId);
      axios.post(csvUrl, formData, {
        headers: {
            'Authorization': sessionStorage.getItem('Authorization'),
            'Content-Type':'multipart/form-data'
        }
    })
    .finally(() => {
        dispatch({
          type: FILE_LOADING,
          payload: false
        })
        dispatch(getTransactions(subaccountId))
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