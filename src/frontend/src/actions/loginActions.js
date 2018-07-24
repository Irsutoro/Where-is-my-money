import {
  LOGIN_FORM_LOADING,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  LOADING,
  ACTIVATE_USER_ERROR,
  ACTIVATE_USER_SUCCESS
} from './types';

import { routerActions } from 'react-router-redux'
import axios from 'axios'
import { getSubaccounts } from './subaccountsActions';

const authUrl = 'http://www.iraminius.pl/wmm/api/auth/'


export const registerUser = registerData => dispatch => {
  dispatch({
    type: LOGIN_FORM_LOADING,
    payload: true
  })
  dispatch({
    type: REGISTER_USER_ERROR,
    payload: false
  })

  axios.post(authUrl, registerData)
    .then(() => {
      dispatch({
        type: REGISTER_USER_SUCCESS
      })
    }).catch(() => {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: true
      })
    }).finally(() => {
      dispatch({
        type: LOGIN_FORM_LOADING,
        payload: false
      })
    })
}

export const activateUser = token => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  })
  dispatch({
    type: ACTIVATE_USER_ERROR,
    payload: false
  })

  axios.put(authUrl, {}, {
    params: {
      token: token
    }
  })
    .then(() => {
      dispatch({
        type: ACTIVATE_USER_SUCCESS
      })
    }).catch(() => {
      dispatch({
        type: ACTIVATE_USER_ERROR,
        payload: true
      })
    }).finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })
}

export const loginUser = loginData => dispatch => {
  dispatch({
    type: LOGIN_FORM_LOADING,
    payload: true
  })
  dispatch({
    type: LOGIN_USER_ERROR,
    payload: false
  })

  axios.get(authUrl,
    {
      params: {
        login: loginData.login,
        password: loginData.password
      }
    }
  ).then(res => {
    const authToken = res.data['auth_token']
    sessionStorage.setItem('Authorization', `Basic ${authToken}`)

    dispatch(getSubaccounts())

    dispatch({
      type: LOGIN_USER_SUCCESS
    })

    dispatch(routerActions.push('/report'))
  }).catch(() => {
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: true
    })
  }).finally(() => {
    dispatch({
      type: LOGIN_FORM_LOADING,
      payload: false
    })
  })
}

export const logout = () => dispatch => {
  sessionStorage.removeItem('Authorization')

  dispatch({
    type: LOGOUT
  })

  dispatch(routerActions.push('/login'))
}