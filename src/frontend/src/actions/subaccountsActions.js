import {
  SUBACCOUNTS_ERROR,
  SUBACCOUNTS_SUCCESS,
  SUBACCOUNTS_LOADING,
  SUBACCOUNT_GET_FULL_DATA_LOADING,
  SUBACCOUNT_GET_FULL_DATA_SUCCESS,
  SUBACCOUNT_GET_FULL_DATA_ERROR,
}
from './types';

const subaccUrl = "http://www.iraminius.pl/wmm/api/subaccounts"
const transatcionsUrl = "http://www.iraminius.pl/wmm/api/transactions"

import axios from 'axios'

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

export const getSubaccountFullData = (choosenSubacc) => dispatch => {

  dispatch({
    type: SUBACCOUNT_GET_FULL_DATA_LOADING,
    payload: true
  })

  axios.get(transatcionsUrl, {
      headers: {
        'Authorization': sessionStorage.getItem('Authorization')
      },
      params: {
        subaccount_id: choosenSubacc
      }
    })
    .then(res => {
      let fullData = res.data
      dispatch({
        type: SUBACCOUNT_GET_FULL_DATA_SUCCESS,
        payload: fullData
      })
      console.log(fullData)
    })
    .catch(() => {
      dispatch({
        type: SUBACCOUNT_GET_FULL_DATA_ERROR,
        payload: false
      })
    })


  dispatch({
    type: SUBACCOUNT_GET_FULL_DATA_LOADING,
    payload: false
  })
}