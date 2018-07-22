import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      username: '',
      email: '',
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

    const registerData = {
      login: this.state.login,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    this.props.submit(registerData)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input fluid label='Login' placeholder='Login' name='login' value={this.state.login} onChange={this.handleChange} />
        <Form.Input fluid label='Nazwa' placeholder='Nazwa' name='username' value={this.state.username} onChange={this.handleChange} />
        <Form.Input fluid label='Email' placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} />
        <Form.Input fluid label='Hasło' placeholder='Hasło' name='password' type="password" value={this.state.password} onChange={this.handleChange} />
        <Form.Button>Zarejestruj</Form.Button>
      </Form>
    );
  }
}