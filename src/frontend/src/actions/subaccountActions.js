import {
    SUBACCOUNT_ERROR,
    SUBACCOUNT_SUCCESS,
    SUBACCOUNT_LOADING } 
  from './types';
  
  export const pullSubaccountData = pullData => dispatch => {
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: true
    })
    dispatch({
      type: SUBACCOUNT_SUCCESS
    })
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: false
    })
  }