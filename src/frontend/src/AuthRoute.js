import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { logout } from './actions/loginActions'
import { getSubaccounts } from './actions/subaccountsActions'
import { connect } from 'react-redux'
import { store } from './App'
import { LOGIN_USER_SUCCESS } from './actions/types';

const AuthRoute = ({ component: Component, logout, getSubaccounts, ...rest }) => (
    <Route {...rest} render={(props) => {
      if (sessionStorage.getItem('Authorization')) {
        store.dispatch({
          type: LOGIN_USER_SUCCESS
        })

        return (<Component {...props} />)
      } else {
        logout()

        return (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )
      }
    }} />
)

export default connect(() => ({}), { logout, getSubaccounts })(AuthRoute)