import React, { Component } from 'react';
import { Form, Button, Header, Icon, Modal, Message } from 'semantic-ui-react';
import sha256 from 'sha256';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: '',
      login: '',
      password: '',
      passwordError: '',
      repeatPassword: '',
      repeatError: '',
      email: '',
      username: '',
      modalOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleChange(e) {
    let fieldName = e.target.name
    let newValue = e.target.value

    let formError = false
    let passwordError = false
    let repeatError = false

    let passwordMatched = true
    let passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?.])(?!.*[ ]).*$/
    if (fieldName === 'password') {
      passwordMatched = passwordRegex.test(newValue)
    } else {
      passwordMatched = passwordRegex.test(this.state.password)
    }

    if (!passwordMatched) {
      formError = true
      passwordError = true
    } else {
      let equalPasswords = true
      if (fieldName === 'repeatPassword') {
        equalPasswords = newValue === this.state.password
      } else if (fieldName === 'password') {
        equalPasswords = this.state.repeatPassword === newValue
      } else {
        equalPasswords = this.state.repeatPassword === this.state.password
      }

      formError = !equalPasswords
      repeatError = !equalPasswords
    }
    if(e.target.name === "login" && e.target.value.length >20){
      alert("Długość loginu nie może być większa niż 20 znaków.")
    }
    else if(e.target.name === "username" && e.target.value.length >50){
      alert("Długość nazwy użytkownika nie może być większa niż 50 znaków.")
    }
    else{
      this.setState({
        [e.target.name]: e.target.value,
        formError: formError,
        passwordError: passwordError,
        repeatError: repeatError
      });
    }
    
  }

  handleSubmit(e) {
    e.preventDefault()

    const registerData = {
      login: this.state.login,
      password: sha256(this.state.password),
      email: this.state.email,
      username: this.state.username
    }

    this.props.submit(registerData)
  }

  handleOpenModal(){
    this.setState({
      modalOpen: true
    })
  }
  handleCloseModal(){
    this.setState({
      modalOpen: false
    })
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit} error={this.state.formError}>
        <Form.Input fluid label='Login' placeholder='Login' name='login' value={this.state.login} onChange={this.handleChange} />
        <Form.Input fluid label='Nazwa' placeholder='Nazwa' name='username' value={this.state.username} onChange={this.handleChange} />
        <Form.Input fluid label='Hasło' placeholder='Hasło' name='password' type="password" value={this.state.password} onChange={this.handleChange} error={this.state.passwordError}/>
        <Form.Input fluid label='Powtórz hasło' placeholder='Powtórz hasło' name='repeatPassword' type="password" value={this.state.repeatPassword} onChange={this.handleChange} error={this.state.repeatError} />
        <Form.Input fluid label='Email' placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} />
        <Message
          hidden={!this.state.passwordError}
          error
          header='Hasło musi składać się z:'
          content={(
              <ul>
                <li>co najmniej 8 znaków</li>
                <li>przynajmniej 1 wielkiej litery</li>
                <li>przynajmniej 1 cyfry</li>
                <li>Minimum 1 znaku specjalnego (!@#$%^&*()?.)</li>
              </ul>
          )}
        />
        <Message
          hidden={!this.state.repeatError}
          error
          header='Hasła nie zgadzają się'
        />
        <Form.Button onClick={this.handleOpenModal} disabled={this.state.formError}>Zarejestruj</Form.Button>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          basic
          size='small'>
            <Header icon='money'>Aktywacja konta</Header>
          <Modal.Content>
            <h4>Na podany adres e-mail została wysłana wiadomość aktywacyjna. <br/>Aby aktywować swoje konto, wystarczy podążać za instrukcją w wysłanej wiadomości.</h4>
            <br/>
          
            <Button color='green' onClick={this.handleCloseModal} inverted>
              <Icon name='checkmark' /> Jasne!
            </Button>
            </Modal.Content>
        </Modal>
      </Form>
    );
  }
}
