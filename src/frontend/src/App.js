import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import { Grid, Segment, Container } from 'semantic-ui-react'

import Navigation from './components/general/Navigation'
import Footer from './components/general/Footer'
import NotFound from './components/general/NotFound'
import LoginPage from './components/LoginPage/LoginPage'
import Regulations from './components/general/Regulations'
import MainPage from './components/MainPage/MainPage';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="main-container">
            <Navigation />
            <Segment className="content">
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/login" component={LoginPage}/>
                <Route path="/regulations" component={Regulations}/>
                <Route path="/main" component={MainPage}/>
                <Route component={NotFound} />
              </Switch>
            </Segment>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
