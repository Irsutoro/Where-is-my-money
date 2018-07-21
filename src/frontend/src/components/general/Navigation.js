import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import logo from '../../resources/images/logo.svg'
import './Navigation.css'

export default class Navigation extends Component {
    render() {
        return (
            <Menu
                className="navigation"
                stackable
                inverted
                borderless
                fixed="top"
            >
                <Menu.Item
                    header
                    className="logo"
                >
                    <Link to="/" className="logo"><img src={logo} className="logo" /></Link>
                </Menu.Item>
            </Menu>
        );
    }
}
