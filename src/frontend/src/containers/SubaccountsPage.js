import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Tab, Container, Button, Table, Grid, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import withSubaccountsCheck from './withSubaccountsCheck';
import { getSubaccounts, addSubaccount, deleteSubaccount } from '../actions/subaccountsActions'
import{getCurrencies} from '../actions/transactionsActions'
import CreateSubaccount from '../components/LoggedContent/CreateSubaccount';

import './SubaccountsPage.css'
class SubaccountsPage extends Component {
    render() {
        return (
            <Grid stackable className="mainGrid">
            <Grid.Row >
            <div className="imageTextsub">
                <div className="imageText-textsub">
                    zarządzanie subkontami
                </div>
            </div>
            </Grid.Row >
            <Grid.Row columns={16} centered>
            
                <Grid.Column width={8}>
                <h1> Panel tworzenia nowego subkonta:</h1>
                    <CreateSubaccount 
                        addSubaccount={(name,currencyId) => {this.props.addSubaccount(name,currencyId)}} 
                        currencies={this.props.currencies}
                    />
                </Grid.Column>
                <Divider vertical/>
                <Grid.Column width={8}>
                <h1> Panel zarządzania istniejącymi subkontami:</h1>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nazwa</Table.HeaderCell>
                                <Table.HeaderCell>Waluta</Table.HeaderCell>
                                <Table.HeaderCell>Akcja</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.props.subaccounts.map((subaccount, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{subaccount.name}</Table.Cell>
                                    <Table.Cell>{subaccount.currency}</Table.Cell>
                                    <Table.Cell>
                                        <Button onClick={() => {
                                            this.props.deleteSubaccount(subaccount.id)
                                        }}>Usuń</Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
            </Grid>
        );
    }
}

SubaccountsPage.propTypes = {
    subaccounts: PropTypes.array.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    currencies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    subaccounts: state.subaccountsReducer.subaccounts,
    currencies: state.transactionsReducer.currencies,
})

export default connect(mapStateToProps, { getSubaccounts, addSubaccount, deleteSubaccount,getCurrencies })(withSubaccountsCheck(SubaccountsPage))
