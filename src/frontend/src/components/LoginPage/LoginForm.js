import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()

    const loginData = {
      login: this.state.login,
      password: this.state.password
    }

    this.props.submit(loginData)
  }

  render() {
    return (
      
      <Form onSubmit={this.handleSubmit} >
        <Form.Input fluid label='Login' placeholder='Login' name='login' type="text" value={this.state.login} onChange={this.handleChange} />
        <Form.Input fluid label='Hasło' placeholder='Hasło' name='password' type="password" value={this.state.password} onChange={this.handleChange} />
        <Form.Button>Zaloguj</Form.Button>
      </Form>
    );
  }
}