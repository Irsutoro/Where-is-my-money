import React, { Component } from 'react';
import { Menu, Grid } from 'semantic-ui-react'

import './Navigation.css'
import logo from '../../resources/images/logo.svg'

export default class Navigation extends Component {
    render() {
        return (
            <Menu fixed="top" stackable className="navigation">
                <Menu.Item>
                    <img src={logo} className="navigation-logo"/>
                </Menu.Item>
            </Menu>
        );
    }
}
