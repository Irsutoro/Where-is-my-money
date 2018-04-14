import {
  LOGIN_FORM_SWITCH,
  REGISTER_USER_LOADING,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS } 
from '../actions/types';

const initialState = {
  activeForm: 'login',
  registered: false,
  registerLoading: false,
  registerError: false,
  logged: false,
  loginLoading: false,
  loginError: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_FORM_SWITCH:
      return {
        ...state,
        activeForm: action.payload
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registered: true
      }
    case REGISTER_USER_LOADING:
      return {
        ...state,
        registerLoading: action.payload
      }
    case REGISTER_USER_ERROR:
      return {
        ...state,
        registerError: action.payload
      }
      case LOGIN_USER_SUCCESS:
      return {
        ...state,
        logged: true
      }
    case LOGIN_USER_LOADING:
      return {
        ...state,
        loginLoading: action.payload
      }
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loginError: action.payload
      }
    default:
      return state;
  }
}
