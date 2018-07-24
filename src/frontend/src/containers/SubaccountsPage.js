import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Tab, Container, Button, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import withSubaccountsCheck from './withSubaccountsCheck';
import { getSubaccounts, addSubaccount, deleteSubaccount } from '../actions/subaccountsActions'
import CreateSubaccount from '../components/LoggedContent/CreateSubaccount';

class SubaccountsPage extends Component {
    render() {
        return (
            <Container fluid>
                <CreateSubaccount addSubaccount={(name) => {this.props.addSubaccount(name)}} />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nazwa</Table.HeaderCell>
                            <Table.HeaderCell>Akcja</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.subaccounts.map((subaccount, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{subaccount.name}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => {
                                        this.props.deleteSubaccount(subaccount.id)
                                    }}>Usuń</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

SubaccountsPage.propTypes = {
    subaccounts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    subaccounts: state.subaccountsReducer.subaccounts
})

export default connect(mapStateToProps, { getSubaccounts, addSubaccount, deleteSubaccount })(withSubaccountsCheck(SubaccountsPage))
