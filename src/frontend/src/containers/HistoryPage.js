import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import { connect } from 'react-redux';
import { Segment, Table, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import withSubaccountsCheck from './withSubaccountsCheck';
import { getTransactions, updateTransaction, addTransaction, deleteTransaction, getCategories, getCurrencies, addCategory, deleteCategory, getFormats, updateCsvFile } from '../actions/transactionsActions'
import EditTransactionModal from '../components/LoggedContent/EditTransactionModal';
import AddTransactionModal from '../components/LoggedContent/AddTransactionModel';
import UploadFromFile from '../components/LoggedContent/UploadFromFile';

class HistoryPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            subaccountId: this.props.choosenSubaccount.id,
            subaccountCurrency: this.props.choosenSubaccount.currency,
            sortedColumn: null,
            sortDirection: null,
            data: []
        }
    }

    componentDidMount() {
        this.props.getCategories()
        this.props.getCurrencies()
        this.props.getFormats()
        this.props.getTransactions(this.state.subaccountId).then(() => {
            this.setState({ 
                data: _.sortBy(this.props.transactions, ['date']).reverse()
            })
        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.choosenSubaccount.id !== this.state.subaccountId) {
            this.props.getTransactions(newProps.choosenSubaccount.id)
        }

        this.setState({
            subaccountId: newProps.choosenSubaccount.id,
            data: _.sortBy(newProps.transactions, ['date']).reverse()
        })
    }

    render() {
        return (
            <Container fluid>
                <Button onClick={() => {
                    this.props.getTransactions(this.state.subaccountId)
                }}>Odśwież wpisy</Button>
                <AddTransactionModal
                    subaccountCurrency={this.props.choosenSubaccount.currency}
                    categories={this.props.categories}
                    addTransaction={this.props.addTransaction}
                    addCategory={this.props.addCategory}
                    deleteCategory={this.props.deleteCategory}
                    subaccountId={this.state.subaccountId}
                    getCurrencies={this.props.getCurrencies}
                    getCategories={this.props.getCategories}
                />
                <UploadFromFile
                    formats={this.props.formats}
                    getFormats={this.props.getFormats}
                    subaccountId={this.state.subaccountId}
                    updateCsvFile={this.props.updateCsvFile}
                />
                {/* <Button onClick={() => {
                    this.state.exportView()
                }}>Wyeksportuj widok</Button> */}
                <Table celled sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Data</Table.HeaderCell>
                            <Table.HeaderCell>Wartość</Table.HeaderCell>
                            <Table.HeaderCell>Kategoria</Table.HeaderCell>
                            <Table.HeaderCell>Komentarz</Table.HeaderCell>
                            <Table.HeaderCell>Edytuj</Table.HeaderCell>
                            <Table.HeaderCell>Usuń</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.data.map((transaction, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{new Date(transaction.date * 1000).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{transaction.amount}</Table.Cell>
                                <Table.Cell>{transaction.category}</Table.Cell>
                                <Table.Cell>{transaction.comment}</Table.Cell>
                                <Table.Cell>
                                    <EditTransactionModal
                                        transaction={transaction}
                                        subaccountCurrency={this.props.choosenSubaccount.currency}
                                        categories={this.props.categories}
                                        updateTransaction={this.props.updateTransaction}
                                        addCategory={this.props.addCategory}
                                        deleteCategory={this.props.deleteCategory}
                                        subaccountId={this.state.subaccountId}
                                        getCurrencies={this.props.getCurrencies}
                                        getCategories={this.props.getCategories}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => {
                                        console.log(transaction.subaccount_id)
                                        this.props.deleteTransaction(transaction.id, transaction.subaccount_id)
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

HistoryPage.propTypes = {
    choosenSubaccount: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    getTransactions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    choosenSubaccount: state.subaccountsReducer.choosenSubaccount,
    transactions: state.transactionsReducer.transactions,
    currencies: state.transactionsReducer.currencies,
    categories: state.transactionsReducer.categories,
    formats: state.transactionsReducer.formats
})

export default connect(mapStateToProps, { getTransactions, updateTransaction, addTransaction, deleteTransaction, getCategories, getCurrencies, addCategory, deleteCategory, getFormats, updateCsvFile })(withSubaccountsCheck(HistoryPage))
