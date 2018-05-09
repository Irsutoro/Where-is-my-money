import React, { Component } from 'react';

import './MainPage.css'

import MainMenu from '../../containers/MainMenu';

export default class MainPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        return (
          <MainMenu/>  
           
        );
    }
}

