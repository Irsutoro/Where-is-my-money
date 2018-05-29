import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux';
import { configureStore, history } from './store'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import './App.css';
import { Grid, Segment, Container } from 'semantic-ui-react'

import Navigation from './components/general/Navigation'
import Footer from './components/general/Footer'
import NotFound from './components/general/NotFound'
import LoginPage from './components/LoginPage/LoginPage'
import Regulations from './components/general/Regulations'
import MainPage from './components/MainPage/MainPage';
import SubaccPage from './components/SubaccPage/SubaccPage';

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="main-container">
            <Segment className="content">
              <Navigation />
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/regulations" component={Regulations} />
                <Route path="/main" component={MainPage} />
                <Route path="/subaccInfo" component={SubaccPage} />
                <Route component={NotFound} />
              </Switch>
            </Segment>
            <Footer />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
