import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchForm, registerUser, loginUser } from '../actions/loginActions';
import { Segment, Menu, Image, Grid, Input, Button, List, Container, Header } from 'semantic-ui-react';
import logo from '../resources/images/logo.svg';
import Footer from '../components/Footer';

class Login extends Component {
    constructor(props) {
        super(props)

        this.switchForm = this.switchForm.bind(this)
    }

    switchForm(e) {
        this.props.switchForm(e.target.name)
    }

    render() {
        const styles={
            root:{
                marginTop: '-7vh',
                marginLeft: '6vw'
            },
            gridek:{
                marginTop: '3vh'
            }
        }

        return (
            <div>
                <Segment inverted>
                    <Menu inverted pointing secondary />
                </Segment>
                <Menu.Menu position="left" style={styles.root}>
                    <Image src={ logo } size="small" />
                </Menu.Menu>

                <div className="position">
                    <Grid columns={5} textAlign='center' stackable>
                        <Grid.Row >
                            <Grid.Column width={5}>
                                <div className="mainstring">WHERE'S MY MONEY?!</div>
                                <div className="space" />
                                <div className="substring">Najlepsza aplikacja do zarządzania Twoim budżetem na wyciągnięcie ręki!</div>
                                <br />
                                <div className="substring">Miej kontrolę nad swoimi finansami, dzięki naszej aplikacji.</div>
                                <br />
                                <br />
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <div id="login-form">
                                    <input type="radio" id="login" name="switch" className="hide" />
                                    <input type="radio" id="signup" name="switch" className="hide" />
                                    <div>
                                        <label for="login" className="changebut button5">LOGIN</label>
                                        <label for="signup" className="changebut button5">REGISTER</label>
                                    </div>
                                    <div className="section-out">
                                        <section className="login-section">
                                            <div className="login">
                                                <form action="">
                                                    <div className="labelborder">
                                                        <label className="labelstring">Podaj swój adres E-mail:</label>
                                                        <br />
                                                        <Input placeholder="E-mail" className='inputborder'></Input>
                                                    </div>
                                                    <div className="space" />
                                                    <label className="labelstring">Podaj swoje hasło:</label>
                                                    <br />
                                                    <Input placeholder="Hasło" className='inputborder'></Input>
                                                    <div className="space" />
                                                    <Button name='login' onClick={this.switchForm}>Login</Button>
                                                    <div className="space" />
                                                    <label className="labelstring">Nie pamiętasz hasła?</label>
                                                    <br />
                                                    <a className="labelstring">Przypomnij hasło.</a>
                                                </form>
                                            </div>
                                        </section>

                                        <section className="signup-section">
                                            <div className="login">
                                                <form action="">
                                                    <div className="labelborder">
                                                        <label className="labelstring">Podaj nowy login:</label>
                                                        <br />
                                                        <Input placeholder="Podaj nowy login" className='inputborder'></Input>
                                                        <br />
                                                        <label className="labelstring">Podaj swój adres E-mail:</label>
                                                        <br />
                                                        <Input placeholder="E-mail" className='inputborder'></Input>
                                                    </div>
                                                    <br />
                                                    <label className="labelstring">Podaj swoje hasło:</label>
                                                    <br />
                                                    <Input placeholder="Hasło" className='inputborder'></Input>
                                                    <br />
                                                    <label className="labelstring">Potwierdź hasło:</label>
                                                    <br />
                                                    <Input placeholder="Potwierdź hasło" className='inputborder'></Input>
                                                    <div className="space" />
                                                    <Button name='register' onClick={this.switchForm}>Register</Button>
                                                </form>
                                            </div>
                                        </section>

                                        {/* {this.props.activeForm === 'login' ?
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
                                            } */}
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={5}>
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <List link color="orange" >
                                    <List.Item as='a'>
                                        <div className="demostring">
                                            Lub wypróbuj wersję demo!
                                        </div>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div >

                <Footer/>

            </div >
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
