import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Tab, Container, Button, Grid, Column, Row, Divider, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import withSubaccountsCheck from './withSubaccountsCheck';
import sha256 from 'sha256';
import {getUserProperties,setUserProperties} from '../actions/propertiesActions'

class PropertiesPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.props.getUserProperties();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
            <Grid stackable>
                <Grid.Row centered columns={16}>
                    <Grid.Column width = {8}>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Input fluid label='Login' placeholder={this.props.userProperties.username} name='username' type="text" value={this.state.username} onChange={this.handleChange} />
                        <Form.Input fluid label='Hasło' placeholder='Hasło' name='password' type="password" value={this.state.password} onChange={this.handleChange} />
                        <Form.Input fluid label='Email' placeholder={this.props.userProperties.email} name='email' type="text" value={this.state.email} onChange={this.handleChange} />
                        <Divider/>
                        <Form.Button>Zmień</Form.Button>
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