import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal, Form, Input, Dropdown, Divider } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';

let categoryInput = React.createRef()
class NestedModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open(){
    this.setState({ open: true })
  }
  close(){
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={
          <Button primary icon>
            Dodaj kategorię <Icon name='right chevron' />
          </Button>
        }
      >
        <Modal.Header>Dodaj kategorię</Modal.Header>
        <Modal.Content>
              <Input
                placeholder='Nazwa kategorii (max 30 znaków)'
                focus
                ref={categoryInput}
              >
                <input />
                
                <Button onClick={() => {
                  if (categoryInput.current.inputRef.value.length > 30) {
                    alert('Nazwa kategorii nie może przekraczać 30 znaków')
                  } else {
                    this.props.addCategory(categoryInput.current.inputRef.value);
                    this.close();
                  }
                }}>Dodaj kategorię</Button>
              </Input>
              <br/>
              <br/>
              <Button color='red' onClick={() => {
                this.close()
              }}>
                <Icon name='cancel' /> Anuluj
              </Button>

        </Modal.Content>
      </Modal>
    )
  }
}
class AddTransactionModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
      transaction: {
        date: moment()
      }
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
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

  handleDateChange(date) {
    let transaction = this.state.transaction
    transaction.date = date

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
          <Form>
            <Form.Field required>
              <label>Data</label>
              <DatePicker
                  selected={this.state.transaction.date}
                  onChange={this.handleDateChange}
                  dateFormat="DD-MM-YYYY, HH:mm"
                  showTimeSelect
                  timeIntervals={15}
                  timeFormat="HH:mm"
                  timeCaption="time"
              />
            </Form.Field>
            <Form.Field required>
              <label>Wartość</label>
              <Input name="amount" value={this.state.transaction.amount} placeholder={this.state.transaction.amount} onChange={this.handleChange} />
            </Form.Field>
            
            <Form.Field required>
              <label>Kategoria</label>
              <Dropdown 
                name="category_id" 
                fluid 
                selection 
                options={this.props.categories.map(category => {
                return {
                  text: category.name,
                  value: category.id
                }
              })}
                onChange={(event, data) => {this.handleChange({target:{name: "category_id"}}, data)}}
              />
            </Form.Field>
            <Form.Field>
              <Button onClick={() => {
                this.props.getCategories()
              }}>Odśwież kategorie</Button>
              <NestedModal
                addCategory={this.props.addCategory}
              />
              <Button color='red' onClick={() => {
                this.props.deleteCategory(this.state.transaction.category_id)
              }}><Icon name='cancel' /> Usuń kategorię</Button>
              
              
            </Form.Field>
            <Form.Field>
              <label>Komentarz</label>
              <Input name="comment" value={this.state.transaction.comment} placeholder={this.state.transaction.comment} onChange={this.handleChange} />
            </Form.Field>
            <div>
              Waluta konta: {this.props.subaccountCurrency}
            </div>
          </Form>
          <Divider/>
          <Button color='green' onClick={() => {
            this.props.addTransaction({
              subaccount_id: this.props.subaccountId,
              category_id: this.state.transaction.category_id,
              date: this.state.transaction.date.unix(),
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
        </Modal.Content>
      </Modal>
    )
  }
}

AddTransactionModal.propTypes = {
  addTransaction: PropTypes.func.isRequired
};

export default AddTransactionModal