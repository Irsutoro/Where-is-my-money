import {
  LOGIN_FORM_LOADING,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS
}
  from '../actions/types';

const initialState = {
  formLoading: false,
  registered: false,
  registerError: false,
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
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        logged: true
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
