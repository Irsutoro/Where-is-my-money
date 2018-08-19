import {
  SUBACCOUNTS_ERROR,
  SUBACCOUNTS_SUCCESS,
  SUBACCOUNTS_LOADING,
  CHOOSE_SUBACCOUNT
}
from './types';

const subaccUrl = "http://www.iraminius.pl/wmm/api/subaccounts/"

import axios from 'axios'
import { getTransactions } from './transactionsActions';

export const getSubaccounts = () => dispatch => {
  dispatch({
    type: SUBACCOUNTS_LOADING,
    payload: true
  })
  dispatch({
    type: SUBACCOUNTS_ERROR,
    payload: false
  })

  return axios.get(subaccUrl, {
      headers: {
        'Authorization': sessionStorage.getItem('Authorization')
      }
    })
    .then(res => {
      let subAccs = res.data

      if (subAccs.length !== 0) {
        dispatch(chooseSubaccount(subAccs[0]))
      }

      dispatch({
        type: SUBACCOUNTS_SUCCESS,
        payload: subAccs
      })
    })
    .catch(() => {
      dispatch({
        type: SUBACCOUNTS_ERROR,
        payload: true
      })
    })
    .finally(() => {
      dispatch({
        type: SUBACCOUNTS_LOADING,
        payload: false
      })
    })
}

export const addSubaccount = (name, currencyId) => dispatch => {
  dispatch({
    type: SUBACCOUNTS_LOADING,
    payload: true
  })

  return axios.post(subaccUrl, {
      currency_id: currencyId,
      name: name
      
    }, {
      headers: {
        'Authorization': sessionStorage.getItem('Authorization')
      }
    })
    .finally(() => {
      dispatch({
        type: SUBACCOUNTS_LOADING,
        payload: false
      })

      dispatch(getSubaccounts())
    })
}

export const deleteSubaccount = (subaccountId) => dispatch => {
  dispatch({
    type: SUBACCOUNTS_LOADING,
    payload: true
  })
  
  return axios.delete(subaccUrl + subaccountId, {
      headers: {
        'Authorization': sessionStorage.getItem('Authorization')
      }
    })
    .finally(() => {
      dispatch({
        type: SUBACCOUNTS_LOADING,
        payload: false
      })

      dispatch(getSubaccounts())
    })
}

export const chooseSubaccount = (subaccount) => dispatch => {
  dispatch({
    type: CHOOSE_SUBACCOUNT,
    payload: subaccount
  })
}