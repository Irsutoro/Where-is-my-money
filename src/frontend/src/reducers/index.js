import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import subaccountReducer from './subaccountReducer';

export default combineReducers({
  loginReducer,
  subaccountReducer
});
