import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Menu, Image, Grid, Input, Button, List, Container, Header } from 'semantic-ui-react'

export default class LoginForm extends Component {
    render() {
        return (
            <Segment inverted vertical style={{ padding: '1em' }}>
                    <Container>
                        <Grid divided inverted stackable>

                            <Grid.Column width={4}>
                                <Header inverted as='h4' content='O nas' />
                                <List link inverted>
                                    <List.Item as='a'>Patryk Mroczyński</List.Item>
                                    <List.Item as='a'>Jakub Wiśniewski</List.Item>
                                    <List.Item as='a'>Oskar Rutkowski</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Usługi' />
                                <List link inverted>
                                    <List.Item as='a'>Regulamin</List.Item>
                                    <List.Item as='a'>Prywatność</List.Item>
                                    <List.Item as='a'>FAQ</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Container>
            </Segment>
        );
    }
  }