import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal, Form, Input, Dropdown, Divider } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import ReactFileReader from 'react-file-reader';
import 'react-datepicker/dist/react-datepicker.css';

let categoryInput = React.createRef()

class UploadFromFile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
      format: "",
      file: [],
      fileName: ""
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFiles=this.handleFiles.bind(this)
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  handleClose() {
    this.setState({ modalOpen: false })
  }

  handleChange(id) {
    this.setState({ format: id });
  }
  handleFiles(files){
    var reader = new FileReader();
    reader.onload = () => {
      reader.fileName=files[0].name
      this.setState({
            file: files[0],
            fileName: reader.fileName
      })
    }
  reader.readAsText(files[0]);
}

  render() {
    return (
      <Modal trigger={<Button onClick={this.handleOpen}>Wgraj CSV</Button>} closeIcon
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header content='Wgraj CSV' />
        <Modal.Content>
          <Form>
            <Form.Field required>
              <label>Format</label>
              <Dropdown name="format" fluid  selection options={this.props.formats.map(format => {
                return {
                  text: format.name,
                  value: format.id
                }
              })}
                onChange={(event, data) => {this.handleChange(data.value)}}
              />
            </Form.Field>
            <Form.Field>
              <Button onClick={() => {
                this.props.getFormats()
              }}>Odśwież formaty</Button>
              
            </Form.Field>
            <Form.Field>
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <Button className='btn' color='orange'>Wgraj plik</Button>
                </ReactFileReader>
                <br/>
                Wgrany plik: {this.state.fileName}
            </Form.Field>
          </Form>
          <Divider/>
          <Button color='green' onClick={() => {
            this.props.updateCsvFile(
                this.state.format,
                this.props.subaccountId,
                this.state.file)
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

UploadFromFile.propTypes = {
    updateCsvFile: PropTypes.func.isRequired
};

export default UploadFromFile