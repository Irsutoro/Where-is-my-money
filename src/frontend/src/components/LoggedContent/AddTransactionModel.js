import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal, Form, Input, Dropdown } from 'semantic-ui-react'

let categoryInput = React.createRef()

class AddTransactionModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
      transaction: {}
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  handleClose() {
    this.setState({ modalOpen: false })
  }

  handleChange(e, { value }) {
    let transaction = this.state.transaction
    transaction[e.target.name] = value

    this.setState({
      transaction: transaction
    })
  }

  render() {
    return (
      <Modal trigger={<Button onClick={this.handleOpen}>Dodaj wpis</Button>} closeIcon
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header content='Dodawanie wpisu' />
        <Modal.Content>
        <Button onClick={() => {
            this.props.getCurrencies()
          }}>Odśwież waluty</Button>
          <Button onClick={() => {
            this.props.getCategories()
          }}>Odśwież kategorie</Button>
          <Input
            placeholder='Nazwa kategorii'
            focus
            ref={categoryInput}
          >
            <input />
            <Button onClick={() => {
              this.props.addCategory(categoryInput.current.inputRef.value)
            }}>Dodaj kategorię</Button>
          </Input>

          <Form>
            <Form.Field required>
              <label>Data</label>
              <Input name="date" value={this.state.transaction.date} placeholder={this.state.transaction.date} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field required>
              <label>Wartość</label>
              <Input name="amount" value={this.state.transaction.amount} placeholder={this.state.transaction.amount} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field required>
              <label>Waluta</label>
              <Dropdown fluid selection options={this.props.currencies.map(currency => {
                return {
                  text: currency.code,
                  value: currency.id
                }
              })}
                onChange={(event, data) => {this.handleChange({target:{name: "currency_id"}}, data)}}
              />
            </Form.Field>
            <Form.Field required>
              <label>Kategoria</label>
              <Dropdown name="category_id" fluid selection options={this.props.categories.map(category => {
                return {
                  text: category.name,
                  value: category.id
                }
              })}
                onChange={(event, data) => {this.handleChange({target:{name: "category_id"}}, data)}}
              />
              <Button onClick={() => {
                this.props.deleteCategory(this.state.transaction.category_id)
              }}>Usuń kategorię</Button>
            </Form.Field>
            <Form.Field>
              <label>Komentarz</label>
              <Input name="comment" value={this.state.transaction.comment} placeholder={this.state.transaction.comment} onChange={this.handleChange} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => {
            this.props.addTransaction({
              subaccount_id: this.props.subaccountId,
              category_id: this.state.transaction.category_id,
              currency_id: this.state.transaction.currency_id,
              date: this.state.transaction.date,
              amount: this.state.transaction.amount,
              comment: this.state.transaction.comment
            })
            this.handleClose()
          }}>
            <Icon name='save' /> Zapisz
          </Button>
          <Button color='red' onClick={() => {
            this.handleClose()
          }}>
            <Icon name='cancel' /> Anuluj
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

AddTransactionModal.propTypes = {
  addTransaction: PropTypes.func.isRequired
};

export default AddTransactionModal