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
                <Segment inverted>
                    <Menu inverted pointing secondary/>
                </Segment>  
                <Menu.Menu position="left" style={styles.root}>
                    <Image src="logo.svg" size="small"/>
                </Menu.Menu>

                <div className="position">
                    <Grid columns={5} textAlign='center' stackable>
                        <Grid.Row >
                            <Grid.Column width={5}>
                                <div className="mainstring">WHERE'S MY MONEY?!</div>
                                <div className="space"/>
                                <div className="substring">Najlepsza aplikacja do zarządzania Twoim budżetem na wyciągnięcie ręki!</div>
                                <br/>
                                <div className="substring">Miej kontrolę nad swoimi finansami, dzięki naszej aplikacji.</div>
                                <br/>
                                <br/>
                            </Grid.Column>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn width={4}>
                                <div id="login-form">
                                    <input type="radio" id="login" name="switch" className="hide"/>
                                    <input type="radio" id="signup" name="switch" className="hide"/>
                                    <div>
                                        <label for="login" className="changebut button5">LOGIN</label>
                                        <label for="signup"className="changebut button5">REGISTER</label>
                                    </div>
                                    <div className="section-out">
                                        <section className="login-section">
                                            <div className="login">
                                                <form action="">
                                                    <div className="labelborder">
                                                        <label className="labelstring">Podaj swój adres E-mail:</label>
                                                        <br/>
                                                        <Input placeholder="E-mail" className='inputborder'></Input>
                                                    </div>
                                                    <div className="space"/>
                                                    <label className="labelstring">Podaj swoje hasło:</label>
                                                    <br/>
                                                    <Input placeholder="Hasło" className='inputborder'></Input>
                                                    <div className="space"/>
                                                    <Button name='login' onClick={this.switchForm}>Login</Button>
                                                    <div className="space"/>
                                                    <label className="labelstring">Nie pamiętasz hasła?</label>
                                                    <br/>
                                                    <a className="labelstring">Przypomnij hasło.</a>
                                                </form>
                                            </div>
                                        </section>

                                        <section className="signup-section">
                                            <div className="login">
                                                <form action="">
                                                    <div className="labelborder">
                                                        <label className="labelstring">Podaj nowy login:</label>
                                                        <br/>
                                                        <Input placeholder="Podaj nowy login" className='inputborder'></Input>
                                                        <br/>
                                                        <label className="labelstring">Podaj swój adres E-mail:</label>
                                                        <br/>
                                                        <Input placeholder="E-mail" className='inputborder'></Input>
                                                    </div>
                                                    <br/>
                                                    <label className="labelstring">Podaj swoje hasło:</label>
                                                    <br/>
                                                    <Input placeholder="Hasło" className='inputborder'></Input>
                                                    <br/>
                                                    <label className="labelstring">Potwierdź hasło:</label>
                                                    <br/>
                                                    <Input placeholder="Potwierdź hasło" className='inputborder'></Input>
                                                    <div className="space"/>
                                                    <Button name='register' onClick={this.switchForm}>Register</Button>
                                                </form>
                                            </div>

                                        </section>
                                </div>

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
                                    
                        
                            </GridColumn>
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
                </div>
                
            <Segment inverted vertical style={{ padding: '1em' }}>
                <Container>
                    <Grid divided inverted stackable>
                    
                        <Grid.Column width={4}>
                        <Header inverted as='h4' content='O nas' />
                        <List link inverted>
                            <List.Item as='a'>Patryk Mroczyński</List.Item>
                            <List.Item as='a'>Jakub Wiśniewski</List.Item>
                            <List.Item as='a'>Oskar Rutkowski</List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <Header inverted as='h4' content='Usługi' />
                        <List link inverted>
                            <List.Item as='a'>Regulamin</List.Item>
                            <List.Item as='a'>Prywatność</List.Item>
                            <List.Item as='a'>FAQ</List.Item>
                        </List>
                        </Grid.Column>
                        
                   
                    </Grid>
                </Container>
            </Segment>
            
                
                

                
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
