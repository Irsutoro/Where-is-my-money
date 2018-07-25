import React, { Component } from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/loginActions'
import PropTypes from 'prop-types'

class IntroContainer extends Component {
    render() {
        return (
            <Container textAlign="center" fluid>
                <Header as='h1' >Where's my money?!</Header>
                <Header as='h2' >Najlepsza aplikacja do zarządzania Twoim budżetem<br/> na wyciągnięcie ręki!</Header>
                <Header as='h2' >Miej kontrolę nad swoimi finansami,<br/> dzięki naszej aplikacji.</Header>

                <Button onClick={() => {
                    this.props.loginUser({
                        login: "test",
                        password: "test"
                    })
                }}>Wypróbuj wersję demo!</Button>
            </Container>
        );
    }
}

IntroContainer.propTypes = {
    loginUser: PropTypes.func.isRequired
}

export default connect(() => ({}), { loginUser })(IntroContainer)