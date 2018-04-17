import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';

import store from './store';
import Login from './containers/Login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Login />
      </Provider>
    );
  }
}

export default App;
