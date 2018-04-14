import {
  LOGIN_FORM_SWITCH,
  REGISTER_USER_LOADING,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS } 
from './types';

export const switchForm = formName => dispatch => {
  dispatch({
    type: LOGIN_FORM_SWITCH,
    payload: formName
  })
}

export const registerUser = registerData => dispatch => {
  dispatch({
    type: REGISTER_USER_LOADING,
    payload: true
  })
  // register request with registerData, then =>
  dispatch({
    type: REGISTER_USER_SUCCESS
  })
  dispatch({
    type: REGISTER_USER_LOADING,
    payload: false
  })
}

export const loginUser = loginData => dispatch => {
  dispatch({
    type: LOGIN_USER_LOADING,
    payload: true
  })
  // login request with loginData, then =>
  dispatch({
    type: LOGIN_USER_SUCCESS
  })
  dispatch({
    type: LOGIN_USER_LOADING,
    payload: false
  })
}