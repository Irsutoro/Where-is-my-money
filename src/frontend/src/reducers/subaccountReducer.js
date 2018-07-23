import {
    SUBACCOUNT_ERROR,
    SUBACCOUNT_SUCCESS,
    SUBACCOUNT_LOADING,
    SUBACCOUNT_GET_FULL_DATA_LOADING,
    SUBACCOUNT_GET_FULL_DATA_SUCCESS,
    SUBACCOUNT_GET_FULL_DATA_ERROR
  }
    from '../actions/types';
  
  const initialState = {
    pullData: false,
    pulled: [],
    pullError: false,
    getFullData: false,
    fullData: [],
    getFullDataError: false
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
      case SUBACCOUNT_ERROR:
        return {
          ...state,
          pullError: action.payload
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
  