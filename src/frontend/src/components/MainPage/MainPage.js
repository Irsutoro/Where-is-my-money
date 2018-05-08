import React, { Component } from 'react';
import { Segment, Sidebar, SidebarPushable, SidebarPusher, MenuItem, Button, Menu, Icon } from 'semantic-ui-react';

import './MainPage.css'
import vid from '../../resources/video/dollar.mp4'
export default class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            visible: false 
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    

    toggleVisibility(){
        this.setState({ visible: !this.state.visible });
    }

    

    render() {
        const { visible } = this.state;
        return (
            
           
                <Sidebar.Pushable className="main-page-pushable">
                    <Sidebar as={Menu} animation='scale down' width='thin' visible={visible} icon='labeled' vertical inverted>
                        <Menu.Item >
                        <Icon name='shop' />
                        <a href='/'>Zakupy</a>
                        </Menu.Item>
                        <Menu.Item >
                        <Icon name='gamepad' />
                        <a href='/'>Gry</a>
                        </Menu.Item>
                        <Menu.Item >
                        <Icon name='calendar' />
                        <a href='/'>Wakacje</a>
                        </Menu.Item>
                        <Menu.Item >
                        <Icon name='car' />
                        <a href='/'>Samochód</a>
                        </Menu.Item>
                        <Menu.Item className="add-new-subaccount">
                        <Icon name='add circle' />
                        <a href='/'>Dodaj subkonto</a>
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                    
                    
                    <header className="v-header container">
                    
                        <div className="fullscreen-video-wrap">
                           <video src={vid} autoPlay="true" loop="true"/>
                        </div>
                        <div className="header-overlay"></div>
                        <div className="header-content text-md-center">
    
                            <h1>Witaj w aplikacji<br/> Where's my money?!</h1>
                            <p>Już teraz stwórz swoje nowe subkonto <br/>i zacznij zarządzać swoimi finansami!</p>
                            <Button >Utwórz subkonto</Button>
                            <br/>
                            <Button onClick={this.toggleVisibility} className="floating-button" >Menu</Button>
                        </div>
                    </header>
                        
                    
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
           
        );
    }
}