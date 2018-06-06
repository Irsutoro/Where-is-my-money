import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Sidebar, SidebarPushable, SidebarPusher, MenuItem, Button, Menu, Icon, Header, Modal, Form, Input } from 'semantic-ui-react';
import { pullSubaccountData, createNewSubaccount } from '../actions/subaccountActions';
import vid from '../resources/video/dollar.mp4'
import './MainMenu.css'

class MainMenu extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            visible: false, 
            isParentOpen: false,
            isChildOpen: false,
            subAccName: ''
        };

        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm=this.submitForm.bind(this);
    }

    componentWillMount(){
        this.props.pullSubaccountData();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.newAcc){
            this.props.pulled.unshift(nextProps.newAcc)
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    toggleVisibility(){
        this.setState({ visible: !this.state.visible });
    }
    handleClick(){
        this.setState({
            isParentOpen: !this.state.isParentOpen
        });
    }
    submitForm(e){
        e.preventDefault()
        this.props.createNewSubaccount(this.state.subAccName)
        this.setState({
            isParentOpen: !this.state.isParentOpen
        });
    }
    render() {
        const { visible } = this.state;
        const subaccItems = this.props.pulled.map(subaccItem => (
            <Menu.Item key={subaccItem.id}>
                <Icon name='user' />
                <a >{subaccItem.name}</a>
            </Menu.Item>
        ));

        return (
            
           
                <Sidebar.Pushable className="main-page-pushable">
                    <Sidebar as={Menu} animation='uncover' width='thin' visible={visible} icon='labeled' vertical inverted>

                        {subaccItems}

                        <Menu.Item className="add-new-subaccount">
                            <Icon name='add circle' />
                            <a onClick={this.handleClick}> Dodaj subkonto</a>
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

                    <Modal open={this.state.isParentOpen} >
                            <Modal.Header>Dodaj subkonto</Modal.Header>
                            <Modal.Content >
                                <Form onSubmit={this.submitForm}>
                                    <Form.Input value={this.state.subAccName} name='subAccName' list='subacc' size='big' placeholder='Wybierz nazwę nowego subkonta' onChange={this.handleChange}/>
                                        <datalist id='subacc'>
                                            <option value='Jan Kowalski' />
                                            <option value='Adam Nowak' />
                                        </datalist>
                                        <br/>
                                
                                    <Form.Button  positive icon='checkmark' className='modal-btn' labelPosition='right' content='Potwierdź' />
                                
                                </Form>
                            </Modal.Content>
                    </Modal>

                </Sidebar.Pushable>
           
        );
    }
}
MainMenu.propTypes = {
    pullData: PropTypes.bool.isRequired,
    pulled: PropTypes.array.isRequired,
    newAcc: PropTypes.string.isRequired,
    pullError: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    /*pullData: state.subaccountReducer.pullData,*/
    pulled: state.subaccData.pulled,
    newAcc: state.subaccData.newAcc
    /*pullError: state.subaccs.pullError*/
})

export default connect(mapStateToProps, {pullSubaccountData, createNewSubaccount})(MainMenu);