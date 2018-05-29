import {
  LOGIN_FORM_LOADING,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS
} from './types';

import { routerActions } from 'react-router-redux'

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

  setTimeout(() => {
    if (loginData.login === 'ppiesiak' && loginData.password === '1234') {
      dispatch(routerActions.push('/main'))
      dispatch({
        type: LOGIN_FORM_LOADING,
        payload: false
      })
    } else {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: true
      })
      dispatch({
        type: LOGIN_FORM_LOADING,
        payload: false
      })
    }
  }, 2000)
}