import React, { Component } from 'react';
import { Form, Button, Header, Icon, Modal } from 'semantic-ui-react';
import sha256 from 'sha256';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
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
    this.setState({ [e.target.name]: e.target.value });
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
      <Form onSubmit={this.handleSubmit}>
        <Form.Input fluid label='Login' placeholder='Login' name='login' value={this.state.login} onChange={this.handleChange} />
        <Form.Input fluid label='Nazwa' placeholder='Nazwa' name='username' value={this.state.username} onChange={this.handleChange} />
        <Form.Input fluid label='Email' placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} />
        <Form.Input fluid label='Hasło' placeholder='Hasło' name='password' type="password" value={this.state.password} onChange={this.handleChange} />
        <Form.Button onClick={this.handleOpenModal}>Zarejestruj</Form.Button>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          basic
          size='small'>
            <Header icon='money' content='Aktywacja konta'></Header>
          <Modal.Content>
            <h3>Na podany adres e-mail została wysłana wiadomość aktywacyjna. <br/>Aby aktywować swoje konto, wystarczy podążać za instrukcją w wysłanej wiadomości.</h3>
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