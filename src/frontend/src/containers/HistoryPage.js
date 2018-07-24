import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Tab, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import withSubaccountsCheck from './withSubaccountsCheck';

class HistoryPage extends Component {
    render() {
        return (
            <Container fluid>
                <h1>Historia</h1>
            </Container>
        );
    }
}

export default connect(() => ({}), {})(withSubaccountsCheck(HistoryPage))
