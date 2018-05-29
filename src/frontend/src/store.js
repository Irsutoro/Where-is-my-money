import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import createHistory from 'history/createHashHistory'
import { routerMiddleware } from 'react-router-redux'

const initialState = {};

export const history = createHistory()
const middleware = [
  thunk,
  routerMiddleware(history)
]

export function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
}