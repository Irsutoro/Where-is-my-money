import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
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

    const loginData = {
      login: this.state.login,
      password: this.state.password
    }

    this.props.submit(loginData)
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Input fluid label='Login' name='login' placeholder='Login' value={this.state.login} onChange={this.handleChange} />
        <Form.Input fluid label='Hasło' name='password' placeholder='Hasło' value={this.state.password} onChange={this.handleChange} />
        <Form.Button>Zaloguj</Form.Button>
      </Form>
    );
  }
}