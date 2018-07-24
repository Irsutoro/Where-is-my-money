import React, { Component } from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

import logo from '../../resources/images/logo.svg'

import './NotFound.css'

export default class NotFound extends Component {
    render() {
        return (
            <div className="error-page">
                <Image src={logo} size='medium'/>
                <Header as='h1'>Nie znaleziono strony?!</Header>
            </div>
        );
    }
}
