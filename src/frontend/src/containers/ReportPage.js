import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Tab, Container, Button, Grid, Column } from 'semantic-ui-react';
import {Doughnut} from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import withSubaccountsCheck from './withSubaccountsCheck';
import {getTransactionsPart} from '../actions/transactionsActions'
let datadoutest={
    labels: ['raz','dwa'],
      datasets: [{
          data: [1000,2344],
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
      '#FFCE56',
      '#FF6384',
          '#36A2EB',
      '#FFCE56',
      '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
      '#FFCE56',
      '#FF6384',
          '#36A2EB',
      '#FFCE56',
      '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ]
  }]
  }
class ReportPage extends Component {
    render() {
        return (    
            <Grid stackable>
                <Grid.Column width={8}>
                    <h2>Donut1</h2>
                    <Doughnut data={datadoutest} />
                </Grid.Column>
                    
                <Grid.Column width={6}>
                <h2>Donut2</h2>
                    <Doughnut data={datadoutest} />
                </Grid.Column>
            </Grid>
        );
    }
}
ReportPage.propTypes = {
    transactionsPart: PropTypes.array.isRequired,
    getTransactionsPart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    transactionsPart: state.transactionsReducer.transactionsPart
})
export default connect(mapStateToProps, {getTransactionsPart})(withSubaccountsCheck(ReportPage))