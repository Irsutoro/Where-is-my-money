import {
    SUBACCOUNT_ERROR,
    SUBACCOUNT_SUCCESS,
    SUBACCOUNT_LOADING,
    SUBACCOUNT_GET_FULL_DATA_LOADING,
    SUBACCOUNT_GET_FULL_DATA_SUCCESS,
    SUBACCOUNT_GET_FULL_DATA_ERROR} 
  from './types';
  
  const subaccUrl = "http://www.iraminius.pl/wmm/api/subaccounts"
  const transatcionsUrl = "http://www.iraminius.pl/wmm/api/transactions"

  import axios from 'axios'

  export const pullSubaccountData = () => dispatch => {
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: true
    })
    const AuthStr = "Basic ".concat( window.sessionStorage.getItem('Authorization'))
    axios.get(subaccUrl, { 
      headers: {'Authorization': AuthStr}
    })
    .then(res =>{
      let subAccs = res.data
      dispatch({
        type: SUBACCOUNT_SUCCESS,
        payload: subAccs
      })
    })
    .catch(()=>{
      dispatch({
        type: SUBACCOUNT_ERROR,
        payload: false
      })
    })
                 
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: false
    })
  }

  export const getSubaccountFullData = (choosenSubacc) => dispatch => {
    
    dispatch({
      type: SUBACCOUNT_GET_FULL_DATA_LOADING,
      payload: true
    })

    const AuthStr = "Basic ".concat( window.sessionStorage.getItem('Authorization'))

    axios.get(transatcionsUrl, { 
      headers: {'Authorization': AuthStr},
      params: {subaccount_id: choosenSubacc}
    })
    .then(res =>{
      let fullData = res.data
      dispatch({
        type: SUBACCOUNT_GET_FULL_DATA_SUCCESS,
        payload: fullData
      })
      console.log(fullData)
    })
    .catch(()=>{
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

