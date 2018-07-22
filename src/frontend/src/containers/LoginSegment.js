import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser, loginUser } from '../actions/loginActions';
import { Segment, Tab, Container, Button } from 'semantic-ui-react';
import LoginForm from '../components/LoginPage/LoginForm'
import RegisterForm from '../components/LoginPage/RegisterForm'
import { Link } from 'react-router-dom'

import './LoginSegment.css'

class LoginSegment extends Component {
    render() {
        const loginSegment = (
            <Segment basic loading={this.props.formLoading} className="login-segment">
                <Tab
                    className="login-segment-tab"
                    menu={{
                        attached: true,
                        pointing: true
                    }}
                    panes={[
                        {
                            menuItem: 'Logowanie',
                            pane: {
                                key: 'login',
                                content: <LoginForm
                                    logged={this.props.logged}
                                    loginError={this.props.loginError}
                                    submit={(loginData) => { this.props.loginUser(loginData) }}
                                />
                            }
                        },
                        {
                            menuItem: 'Rejestracja',
                            pane: {
                                key: 'register',
                                content: <RegisterForm
                                    registered={this.props.registered}
                                    registerError={this.props.registerError}
                                    submit={(registerData) => { this.props.registerUser(registerData) }}
                                />
                            }
                        }
                    ]}
                    renderActiveOnly={false}
                />
            </Segment>
        )

        return (
            <Container fluid>
                {!this.props.logged &&
                    loginSegment
                }
                {this.props.logged &&
                    (
                        <Link to="/report">
                            <Button>
                                Wejdź do aplikacji
                            </Button>
                        </Link>
                    )
                }
            </Container>
        );
    }
}

LoginSegment.propTypes = {
    formLoading: PropTypes.bool.isRequired,
    registered: PropTypes.bool.isRequired,
    registerUser: PropTypes.func.isRequired,
    registerError: PropTypes.bool.isRequired,
    logged: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
    loginError: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    formLoading: state.loginReducer.formLoading,
    registered: state.loginReducer.registered,
    registerSuccess: state.loginReducer.registerSuccess,
    registerError: state.loginReducer.registerError,
    logged: state.loginReducer.logged,
    loginSuccess: state.loginReducer.loginSuccess,
    loginError: state.loginReducer.loginError
})

export default connect(mapStateToProps, { registerUser, loginUser })(LoginSegment);
