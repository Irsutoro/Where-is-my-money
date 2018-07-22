import {
  LOGIN_FORM_LOADING,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_ERROR
}
  from '../actions/types';

const initialState = {
  formLoading: false,
  registered: false,
  registerError: false,
  activated: false,
  activationError: false,
  logged: false,
  loginError: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_FORM_LOADING:
      return {
        ...state,
        formLoading: action.payload
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registered: true
      }
    case REGISTER_USER_ERROR:
      return {
        ...state,
        registerError: action.payload
      }
    case ACTIVATE_USER_SUCCESS:
      return {
        ...state,
        activated: true,
        activationError: false
      }
    case ACTIVATE_USER_ERROR:
      return {
        ...state,
        activationError: action.payload,
        activated: false
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        logged: true
      }
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loginError: action.payload,
        logged: false
      }
    case LOGOUT:
      return {
        ...state,
        logged: false
      }
    default:
      return state;
  }
}
