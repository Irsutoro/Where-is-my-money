import {
    REPORT_ERROR,
    REPORT_SUCCESS
  } from './types';
  
  import { routerActions } from 'react-router-redux'
  import axios from 'axios'
  
  const transUrl = 'http://www.iraminius.pl/wmm/api/transactions/'
  
  export const getTransactions = subaccInfo = dispatch => {
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();

    let timestampFrom = Math.floor((new Date(year,month,1))/1000)
    dispatch({
      type: REPORT_ERROR,
      payload: false
    })
  
    axios.get(transUrl,{
      params: {
        time_from: timestampFrom,
        time_to: loginData.password,
        subaccount_id: subaccInfo.id
      }
    })
      .then(res => res.json())
      .then(reportData => {
      dispatch({
        type: SUBACCOUNT_SUCCESS,
        payload: reportData
      })
    }).catch(() => {
        dispatch({
          type: REPORT_ERROR,
          payload: true
        })
      })
  }
  
