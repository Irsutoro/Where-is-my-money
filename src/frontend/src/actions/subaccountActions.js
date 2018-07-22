import {
    SUBACCOUNT_ERROR,
    SUBACCOUNT_SUCCESS,
    SUBACCOUNT_LOADING,
    SUBACCOUNT_CREATED,
    SUBACCOUNT_SET } 
  from './types';
  
  const subaccUrl = 'http://www.iraminius.pl/wmm/api/subaccounts'

  import axios from 'axios'

  export const pullSubaccountData = () => dispatch => {
    console.log("ppulll")
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: true
    })
    axios.get(subaccUrl, {
      
    })
    .then(res => res.json())
    .then(subaccs => {
      console.log(subaccs)
      dispatch({
        type: SUBACCOUNT_SUCCESS,
        payload: subaccs
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

  export const setSubacc = choosenSubacc => dispatch => {
    
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: true
    })

    dispatch({
      type: SUBACCOUNT_SET,
      payload: choosenSubacc
    })
    
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: false
    })
  }

