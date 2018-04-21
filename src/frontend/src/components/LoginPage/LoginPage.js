import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import IntroContainer from './IntroContainer'
import LoginSegment from '../../containers/LoginSegment'

import './LoginPage.css'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Grid stackable className="login-page" centered>
                <Grid.Column width={8}>
                    <IntroContainer />
                </Grid.Column>
                <Grid.Column width={6}>
                    <LoginSegment />
                </Grid.Column>
            </Grid>
        );
    }
}