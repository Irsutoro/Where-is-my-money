import {
    SUBACCOUNTS_ERROR,
    SUBACCOUNTS_SUCCESS,
    SUBACCOUNTS_LOADING,
    CHOOSE_SUBACCOUNT
  }
    from '../actions/types';
  
  const initialState = {
    subaccountsLoading: false,
    subaccounts: [],
    subaccountsError: false,
    choosenSubaccount: {}
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
          subaccountsError: action.payload,
          subaccounts: []
        }
      case CHOOSE_SUBACCOUNT:
        return {
          ...state,
          choosenSubaccount: action.payload
        }
      default:
        return state;
    }
  }
  