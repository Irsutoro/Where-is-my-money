import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Tab, Container, Button, Grid, Column, Row, Divider, Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import withSubaccountsCheck from './withSubaccountsCheck';
import sha256 from 'sha256';
import {getUserProperties,setUserProperties} from '../actions/propertiesActions'

import './PropertiesPage.css'
class PropertiesPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            formError: '',
            username: '',
            password: '',
            passwordError: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.props.getUserProperties();
    }
    handleChange(e) {
        let fieldName = e.target.name
        let newValue = e.target.value

        let formError = false
        let passwordError = false

        let passwordMatched = true
        let passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&? "])(?!.*[ ]).*$/
        if (fieldName === 'password') {
            passwordMatched = passwordRegex.test(newValue)
        } else {
            passwordMatched = passwordRegex.test(this.state.password)
        }

        if (!passwordMatched) {
            formError = true
            passwordError = true
        }

        this.setState({
            [e.target.name]: e.target.value,
            formError: formError,
            passwordError: passwordError
        });
      }
    
      handleSubmit(e) {
        e.preventDefault()
    
        const changeData = {
          username: this.state.username,
          password: sha256(this.state.password),
          email: this.state.email
        }
    
        this.props.setUserProperties(changeData)
      }
    render() {
        
        return (    
            <Grid stackable className="mainGrid">
                <Grid.Row >
                <div className="imageTextprop">
                    <div className="imageText-textprop">
                        ustawienia konta
                    </div>
                </div>
                </Grid.Row >
                <Grid.Row centered columns={16}>
                    <Grid.Column width = {8}>
                    <Form onSubmit={this.handleSubmit} error={this.state.formError}>
                        <Form.Input fluid label='Login' placeholder={this.props.userProperties.username} name='username' type="text" value={this.state.username} onChange={this.handleChange} />
                        <Form.Input fluid label='Hasło' placeholder='Hasło' name='password' type="password" value={this.state.password} onChange={this.handleChange} error={this.state.passwordError}/>
                        <Form.Input fluid label='Email' placeholder={this.props.userProperties.email} name='email' type="text" value={this.state.email} onChange={this.handleChange} />
                        <Message
                            hidden={!this.state.passwordError}
                            error
                            header='Hasło musi składać się z:'
                            content={(
                                <ul>
                                    <li>co najmniej 8 znaków</li>
                                    <li>przynajmniej 1 wielkiej litery</li>
                                    <li>przynajmniej 1 cyfry</li>
                                    <li>inimum 1 znaku specjalnego</li>
                                </ul>
                            )}
                            />
                        <Divider/>
                        <Form.Button disabled={this.state.formError}>Zmień</Form.Button>
                    </Form>
                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                
                <Grid.Row centered>
                    Data rejestracji: {this.props.userProperties.registration_date}
                </Grid.Row>
                <Divider/>
            </Grid>
        );
}
}
PropertiesPage.propTypes = {
userProperties: PropTypes.object.isRequired,
getUserProperties: PropTypes.func.isRequired,
setUserProperties: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
userProperties: state.propertiesReducer.userProperties
})
export default connect(mapStateToProps, {getUserProperties,setUserProperties})(withSubaccountsCheck(PropertiesPage))