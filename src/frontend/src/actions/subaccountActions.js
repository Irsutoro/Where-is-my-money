import {
    SUBACCOUNT_ERROR,
    SUBACCOUNT_SUCCESS,
    SUBACCOUNT_LOADING,
    SUBACCOUNT_CREATED } 
  from './types';
  
  export const pullSubaccountData = () => dispatch => {
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: true
    })

    fetch('http://localhost:3000/subaccounts',{
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            
        }).then(res => res.json())
          .then(subaccs =>
            
            dispatch({
                type: SUBACCOUNT_SUCCESS,
                payload: subaccs
              }));
              
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: false
    })
  }

  export const createNewSubaccount = postData => dispatch => {
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: true
    })

    fetch('http://localhost:3000/subaccounts',{
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }).then(res => res.json())
          .then(postData =>
            
            dispatch({
                type: SUBACCOUNT_CREATED,
                payload: postData
              }));
              
    dispatch({
      type: SUBACCOUNT_LOADING,
      payload: false
    })
  }