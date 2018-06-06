import React , { Component }  from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './SubaccTable.css';
import { Button, Table, Header, Row, Cell, Body, Sidebar, Pushable, Pusher, Menu, Item, Icon, Content, Modal, Form, Input } from 'semantic-ui-react';

import { pullSubaccountData, createNewSubaccount } from '../actions/subaccountActions';

class SubaccTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible: false, 
            isParentOpen: false,
            isChildOpen: false,
            subAccName: ''
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm=this.submitForm.bind(this);
    };
    componentWillMount(){
        this.props.pullSubaccountData();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.newAcc){
            this.props.pulled.unshift(nextProps.newAcc)
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    toggleVisibility(){
        this.setState({ visible: !this.state.visible });
    }
    handleClick(){
        this.setState({
            isParentOpen: !this.state.isParentOpen
        });
    }
    submitForm(e){
        e.preventDefault()
        this.props.createNewSubaccount(this.state.subAccName)
        this.setState({
            isParentOpen: !this.state.isParentOpen
        });
    }

    render(){

        const { visible } = this.state;

        const subaccItems = this.props.pulled.map(subaccItem => (
            <Menu.Item key={subaccItem.id}>
                <Icon name='user' />
                <a >{subaccItem.name}</a>
            </Menu.Item>
        ));

        const subaccData = this.props.data.map(subaccItem => (
            <Table.Row key={subaccItem.id}>
                <Table.Cell> {subaccItem.id} </Table.Cell>
                <Table.Cell> {subaccItem.name} </Table.Cell>
                <Table.Cell> {subaccItem.amount} </Table.Cell>
                <Table.Cell> {subaccItem.code} </Table.Cell>
                <Table.Cell> {subaccItem.date} </Table.Cell>
                <Table.Cell> {subaccItem.comment} </Table.Cell>
            </Table.Row>
        )); 

        return(
            <Sidebar.Pushable className="main-page-pushable">
                    <Sidebar as={Menu} animation='uncover' width='thin' visible={visible} icon='labeled' vertical inverted>

                        {subaccItems}

                        <Menu.Item className="add-new-subaccount">
                            <Icon name='add circle' />
                            <a onClick={this.handleClick}> Dodaj subkonto</a>
                        </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <h1>
                            Tabela finansów użytkownika {}
                        </h1>
                        <Table celled inverted selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>Kategoria</Table.HeaderCell>
                                    <Table.HeaderCell>Ilość</Table.HeaderCell>
                                    <Table.HeaderCell>Waluta</Table.HeaderCell>
                                    <Table.HeaderCell>Data</Table.HeaderCell>
                                    <Table.HeaderCell>Opis</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                                <Table.Body>
                                    {subaccData}
                                </Table.Body>
                        </Table>
                        <Button onClick={this.toggleVisibility} className="floating-button" >Menu</Button>
                    </Sidebar.Pusher>

                    <Modal open={this.state.isParentOpen} >
                            <Modal.Header>Dodaj subkonto</Modal.Header>
                            <Modal.Content >
                                <Form onSubmit={this.submitForm}>
                                    <Form.Input value={this.state.subAccName} name='subAccName' list='subacc' size='big' placeholder='Wybierz nazwę nowego subkonta' onChange={this.handleChange}/>
                                        <datalist id='subacc'>
                                            <option value='Jan Kowalski' />
                                            <option value='Adam Nowak' />
                                        </datalist>
                                        <br/>
                                
                                    <Form.Button  positive icon='checkmark' className='modal-btn' labelPosition='right' content='Potwierdź' />
                                
                                </Form>
                            </Modal.Content>
                    </Modal>

                </Sidebar.Pushable>
            
        )
    }
}

SubaccTable.propTypes = {
    pullData: PropTypes.bool.isRequired,
    pulled: PropTypes.array.isRequired,
    newAcc: PropTypes.string.isRequired,
    pullError: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    /*pullData: state.subaccountReducer.pullData,*/
    pulled: state.subaccData.pulled,
    newAcc: state.subaccData.newAcc
    /*pullError: state.subaccs.pullError*/
})

export default connect(mapStateToProps, {pullSubaccountData, createNewSubaccount})(SubaccTable);