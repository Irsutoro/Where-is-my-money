import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import subaccountReducer from './subaccountReducer';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  routerReducer,
  loginReducer,
  subaccountReducer
});
