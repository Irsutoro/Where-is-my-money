import {
    SUBACCOUNT_ERROR,
    SUBACCOUNT_SUCCESS,
    SUBACCOUNT_CREATED,
    SUBACCOUNT_LOADING
  }
    from '../actions/types';
  
  const initialState = {
    pullData: false,
    pulled: [],
    pullError: false
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SUBACCOUNT_LOADING:
        return {
          ...state,
          pullData: action.payload
        }
      case SUBACCOUNT_SUCCESS:
        return {
          ...state,
          pulled: action.payload
        }
      case SUBACCOUNT_CREATED:
        return{
          ...state,
          newAcc: action.payload
        }
      case SUBACCOUNT_ERROR:
        return {
          ...state,
          pullError: action.payload
        }
      default:
        return state;
    }
  }
  