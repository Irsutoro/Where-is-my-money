import React, { Component } from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export default class IntroContainer extends Component {
    render() {
        return (
            <Container textAlign="center" fluid>
                <Header as='h1' >Where's my money?!</Header>
                <Header as='h2' >Najlepsza aplikacja do zarządzania Twoim budżetem<br/> na wyciągnięcie ręki!</Header>
                <Header as='h2' >Miej kontrolę nad swoimi finansami,<br/> dzięki naszej aplikacji.</Header>

                <Link to="/login"><Button>Wypróbuj wersję demo!</Button></Link>
            </Container>
        );
    }
}