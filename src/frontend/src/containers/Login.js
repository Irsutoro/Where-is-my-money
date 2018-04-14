import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchForm, registerUser, loginUser } from '../actions/loginActions';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm'
import { Button } from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props)

        this.switchForm = this.switchForm.bind(this)
    }

    switchForm(e) {
        this.props.switchForm(e.target.name)
    }

    render() {
        return (
            <div>
                <Button name='login' onClick={this.switchForm}>Login</Button>
                <Button name='register' onClick={this.switchForm}>Register</Button>

                {this.props.activeForm === 'login' ?
                    <LoginForm
                        isLoading={this.props.loginLoading}
                        isError={this.props.loginError}
                        submit={(loginData) => this.props.loginUser(loginData)}
                    />
                    : this.props.activeForm === 'register' ?
                        <RegisterForm
                            isLoading={this.props.registerLoading}
                            isError={this.props.registerError}
                            submit={(registerData) => this.props.registerUser(registerData)}
                        />
                        : null
                }
            </div>
        );
    }
}

Login.propTypes = {
    activeForm: PropTypes.string.isRequired,
    registerUser: PropTypes.func.isRequired,
    registerLoading: PropTypes.bool.isRequired,
    registerError: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
    loginLoading: PropTypes.bool.isRequired,
    loginError: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    activeForm: state.loginReducer.activeForm,
    registerSuccess: state.loginReducer.registerSuccess,
    registerLoading: state.loginReducer.registerLoading,
    registerError: state.loginReducer.registerError,
    loginSuccess: state.loginReducer.loginSuccess,
    loginLoading: state.loginReducer.loginLoading,
    loginError: state.loginReducer.loginError
})

export default connect(mapStateToProps, { switchForm, registerUser, loginUser })(Login);
