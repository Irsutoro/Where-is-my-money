import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

import './IntroContainer.css'

export default class IntroContainer extends Component {
    render() {
        return (
            <Container textAlign="center" fluid className="intro-container">
                <Header as="h1">Where's my money?!</Header>
                <Header as="h2">Najlepsza aplikacja do zarządzania Twoim budżetem na wyciągnięcie ręki!</Header>
                <Header as="h2">Miej kontrolę nad swoimi finansami, dzięki naszej aplikacji.</Header>
            </Container>
        );
    }
}