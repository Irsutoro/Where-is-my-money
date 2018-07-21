import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Grid, List, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import './Footer.css'

export default class LoginForm extends Component {
    render() {
        return (
            <Menu stackable className="footer-menu">
                <Grid container divided stackable className="footer-grid">
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
                            <List.Item ><Link to="/regulations">Regulamin</Link></List.Item>
                            <List.Item as='a'>Prywatność</List.Item>
                            <List.Item as='a'>FAQ</List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
            </Menu>
        );
    }
}