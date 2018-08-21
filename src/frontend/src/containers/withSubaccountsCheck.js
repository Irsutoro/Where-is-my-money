import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSubaccounts, addSubaccount } from '../actions/subaccountsActions'
import{getCurrencies} from '../actions/transactionsActions'
import CreateSubaccount from '../components/LoggedContent/CreateSubaccount';
import { Container, Header , Grid} from 'semantic-ui-react'

import './withSubaccountsCheck.css'
const withSubaccountCheck = (WrappedComponent) => {
  class SubaccountCheck extends Component {
    constructor(props){
      super(props)

      if (this.props.subaccounts.length === 0) {
        this.props.getSubaccounts();
        this.props.getCurrencies();
      }
    }
    render() {
      if (this.props.subaccounts.length === 0) {
        return (
          <Grid centered fluid className="mainGrid">
          <Grid.Row >
            <div className="imageTextchc">
                <div className="imageText-textchc">
                    Tworzenie subkonta
                </div>
            </div>
            </Grid.Row >
            
            <Grid.Row>
            <h2>Stwórz swoje pierwsze subkonto</h2>
            </Grid.Row >
            <Grid.Row>
            <CreateSubaccount 
              addSubaccount={(name,currencyId) => {this.props.addSubaccount(name,currencyId)}} 
              currencies={this.props.currencies}
            />
          </Grid.Row>
          </Grid>
        )
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };

  SubaccountCheck.propTypes = {
    subaccounts: PropTypes.array.isRequired,
    getSubaccounts: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    currencies: PropTypes.array.isRequired
  };
  
  const mapStateToProps = state => ({
    subaccounts: state.subaccountsReducer.subaccounts,
    currencies: state.transactionsReducer.currencies,
  })
  
  return connect(mapStateToProps, { getSubaccounts, addSubaccount,getCurrencies })(SubaccountCheck)
}

export default withSubaccountCheck