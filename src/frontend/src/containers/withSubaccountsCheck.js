import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSubaccounts } from '../actions/subaccountsActions'
import CreateSubaccount from '../components/LoggedContent/CreateSubaccount';

const withSubaccountCheck = (WrappedComponent) => {
  class SubaccountCheck extends Component {
    constructor(props){
      super(props)
    }

    render() {
      if (this.props.subaccounts.length === 0) {
        this.props.getSubaccounts()
        return <CreateSubaccount />
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
  
  return connect(mapStateToProps, { getSubaccounts })(SubaccountCheck)
}

export default withSubaccountCheck