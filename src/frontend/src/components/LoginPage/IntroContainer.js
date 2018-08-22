import React, { Component } from 'react';
import { Container, Header, Button, Divider, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/loginActions'
import PropTypes from 'prop-types'
import './IntroContainer.css'

import sha256 from 'sha256';
class IntroContainer extends Component {
    render() {
        return (
            <Grid fluid className="mainText" centered>
                <Grid.Row columns={12} centered>
                <Grid.Column width={8}>
                <Header className="mainText-h1" >Where's my money?!</Header>
                <Divider className="loginDivider"/>
                </Grid.Column>
                </Grid.Row>
                
                
                <Grid.Row columns={12} centered>
                <Grid.Column width={8} centered>
                <Header className="mainText-h2" >Najlepsza aplikacja do zarządzania Twoim budżetem<br/> na wyciągnięcie ręki!</Header>
                <Divider className="loginDivider"/>
                </Grid.Column>
                </Grid.Row>
                
                <Grid.Row columns={12} centered>
                <Grid.Column width={8}>
                <Header className="mainText-h2" >Miej kontrolę nad swoimi finansami,<br/> dzięki naszej aplikacji.</Header>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={12} centered>
                <Grid.Column width={8} centered className="align-center">
                <Button onClick={() => {
                    this.props.loginUser({
                        login: "kontodemo",
                        password: sha256("Kont12@test")
                    })
                }}>Wypróbuj wersję demo!</Button>
                </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

IntroContainer.propTypes = {
    loginUser: PropTypes.func.isRequired
}

export default connect(() => ({}), { loginUser })(IntroContainer)