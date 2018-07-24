import {
    SUBACCOUNTS_ERROR,
    SUBACCOUNTS_SUCCESS,
    SUBACCOUNTS_LOADING,
    SUBACCOUNT_GET_FULL_DATA_LOADING,
    SUBACCOUNT_GET_FULL_DATA_SUCCESS,
    SUBACCOUNT_GET_FULL_DATA_ERROR
  }
    from '../actions/types';
  
  const initialState = {
    subaccountsLoading: false,
    subaccounts: [],
    subaccountsError: false,
    getFullData: false,
    fullData: [],
    getFullDataError: false
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SUBACCOUNTS_LOADING:
        return {
          ...state,
          subaccountsLoading: action.payload
        }
      case SUBACCOUNTS_SUCCESS:
        return {
          ...state,
          subaccounts: action.payload
        }
      case SUBACCOUNTS_ERROR:
        return {
          ...state,
          subaccountsError: action.payload
        }
      case SUBACCOUNT_GET_FULL_DATA_LOADING:
        return{
          ...state,
          getFullData: action.payload
        }
      case SUBACCOUNT_GET_FULL_DATA_SUCCESS:
        return{
          ...state,
          fullData: action.payload
        }
      case SUBACCOUNT_GET_FULL_DATA_SUCCESS:
        return{
          ...state,
          getFullDataError: action.payload
        }
      default:
        return state;
    }
  }
  