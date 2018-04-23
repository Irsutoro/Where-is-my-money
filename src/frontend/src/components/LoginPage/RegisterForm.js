import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import './RegisterForm.css'

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault()

    const registerData = {
      login: this.state.login,
      email: this.state.email,
      password: this.state.password
    }

    this.props.submit(registerData)
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Input fluid label='Login' name='login' placeholder='Login' value={this.state.login} onChange={this.handleChange} />
        <Form.Input fluid label='Email' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange} />
        <Form.Input fluid label='Hasło' name='password' placeholder='Hasło' value={this.state.password} onChange={this.handleChange} />
        <Form.Button color='google plus'>Zarejestruj</Form.Button>
      </Form>
    );
  }
}