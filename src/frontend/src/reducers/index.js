import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import subaccountsReducer from './subaccountsReducer'
import transactionsReducer from './transactionsReducer'
import propertiesReducer from './propertiesReducer'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  routerReducer,
  loginReducer,
  subaccountsReducer,
  transactionsReducer,
  propertiesReducer
});
