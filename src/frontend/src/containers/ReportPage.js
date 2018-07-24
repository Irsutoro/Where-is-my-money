import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Tab, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import withSubaccountsCheck from './withSubaccountsCheck';

class ReportPage extends Component {
    render() {
        return (
            <Container fluid>
                <h1>Raport ogólny</h1>
            </Container>
        );
    }
}

export default withSubaccountsCheck(ReportPage)
