import React, { Component } from 'react';
import { Segment, Sidebar, SidebarPushable, SidebarPusher, MenuItem, Button, Menu, Icon, Header, Modal, Form, Input } from 'semantic-ui-react';

import './MainPage.css'
import vid from '../../resources/video/dollar.mp4'
export default class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            visible: false, 
            isParentOpen: false,
            isChildOpen: false
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus=this.handleFocus.bind(this);
    }

    

    toggleVisibility(){
        this.setState({ visible: !this.state.visible });
    }
    handleClick(){
        this.setState({
            isParentOpen: !this.state.isParentOpen
        });
    }
    handleFocus(){
        this.setState({
            isChildOpen: true
        });
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
                        <a onClick={this.handleClick}> Dodaj subkonto</a>
                        <Modal open={this.state.isParentOpen}>
                            <Modal.Header>Dodaj subkonto</Modal.Header>
                            <Modal.Content >
                                <Form>
                                <Input onFocus={this.handleFocus} list='languages' size='big' placeholder='Wybierz nazwę nowego subkonta' />
                                    <datalist id='languages'>
                                        <option value='Rozrywka' />
                                        <option value='Zdrowie' />
                                        <option value='Praca' />
                                        <option value='Zakupy' />
                                    </datalist>
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.handleClick} negative className='modal-btn'>
                                No
                                </Button>
                                <Button onClick={this.handleClick} positive icon='checkmark' className='modal-btn' labelPosition='right' content='Yes' />
                            </Modal.Actions>
                        </Modal>

                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                    
                    
                    <header className="v-header container">
                    
                        <div className="fullscreen-video-wrap">
                           <video autoPlay loop src={vid} muted/>
                        </div>
                        <div className="header-overlay"></div>
                        <div className="header-content text-md-center">
    
                            <h1>Witaj w aplikacji<br/> Where's my money?!</h1>
                            <p>Już teraz stwórz swoje nowe<br/> subkonto i zacznij zarządzać <br/>swoimi finansami!</p>
                            <Button onClick={this.handleClick}>Utwórz subkonto</Button>
                            <br/>
                            <Button onClick={this.toggleVisibility} className="floating-button" >Menu</Button>
                        </div>
                    </header>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
           
        );
    }
}