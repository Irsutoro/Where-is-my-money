import {
  LOGIN_FORM_LOADING,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS
}
  from './types';

export const registerUser = registerData => dispatch => {
  dispatch({
    type: LOGIN_FORM_LOADING,
    payload: true
  })
  // register request with registerData, then =>
  setTimeout(() => {
    dispatch({
      type: REGISTER_USER_SUCCESS
    })
    dispatch({
      type: LOGIN_FORM_LOADING,
      payload: false
    })
  }, 3000)
}

export const loginUser = loginData => dispatch => {
  dispatch({
    type: LOGIN_FORM_LOADING,
    payload: true
  })
  console.log(loginData)
  // login request with loginData, then =>
  dispatch({
    type: LOGIN_USER_SUCCESS
  })
  dispatch({
    type: LOGIN_FORM_LOADING,
    payload: false
  })
}