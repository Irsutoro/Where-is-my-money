import React, { Component } from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export default class CreateSubaccount extends Component {
    render() {
        return (
            <Container textAlign="center" fluid>
                <Header as='h1' >Stwórz swoje pierwsze subkonto</Header>

                <Button>Dodaj subkonto</Button>
            </Container>
        );
    }
}