import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSubaccounts, addSubaccount } from '../actions/subaccountsActions'
import CreateSubaccount from '../components/LoggedContent/CreateSubaccount';
import { Container, Header } from 'semantic-ui-react'

const withSubaccountCheck = (WrappedComponent) => {
  class SubaccountCheck extends Component {
    constructor(props){
      super(props)

      if (this.props.subaccounts.length === 0) {
        this.props.getSubaccounts()
      }
    }

    render() {
      if (this.props.subaccounts.length === 0) {
        return (
          <Container textAlign="center" fluid>
            <Header as="h1">Stwórz swoje pierwsze subkonto</Header>
            <CreateSubaccount addSubaccount={(name) => {this.props.addSubaccount(name)}} />
          </Container>
        )
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };

  SubaccountCheck.propTypes = {
    subaccounts: PropTypes.array.isRequired,
    getSubaccounts: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    subaccounts: state.subaccountsReducer.subaccounts
  })
  
  return connect(mapStateToProps, { getSubaccounts, addSubaccount })(SubaccountCheck)
}

export default withSubaccountCheck