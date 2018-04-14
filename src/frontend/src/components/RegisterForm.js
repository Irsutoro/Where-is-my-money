import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div>
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Login: </label>
            <br />
            <input
              type="text"
              name="login"
              onChange={this.onChange}
              value={this.state.login}
            />
          </div>
          <br />
          <div>
            <label>Email: </label>
            <br />
            <input
              type="text"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            />
          </div>
          <br />
          <div>
            <label>Password: </label>
            <br />
            <input
              type="password"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>

        <label>Loading: {this.props.isLoading.toString()}</label>
        <label>Error: {this.props.isError.toString()}</label>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  submit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
};