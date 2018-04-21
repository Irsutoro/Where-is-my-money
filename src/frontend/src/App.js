import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import { Grid, Segment, Container } from 'semantic-ui-react'

import Navigation from './components/general/Navigation'
import Footer from './components/general/Footer'
import LoginPage from './components/LoginPage/LoginPage'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="main-container">
            <Navigation />
            <Segment className="content">
              <Route exact path="/" component={LoginPage} />
            </Segment>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
