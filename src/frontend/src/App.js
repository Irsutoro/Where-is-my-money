import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux';
import { configureStore, history } from './store'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import './App.css';
import { Container } from 'semantic-ui-react'

import Navigation from './components/general/Navigation'
import Footer from './components/general/Footer'
import NotFound from './components/general/NotFound'
import LoginPage from './components/LoginPage/LoginPage'
import Regulations from './components/general/Regulations'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Container fluid className="main-container">
            <Navigation />
            <Container fluid className="content">
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/regulations" component={Regulations} />
                <Route component={NotFound} />
              </Switch>
            </Container>
            <Footer />
          </Container>
        </ConnectedRouter>
      </Provider>
    );
  }
}
