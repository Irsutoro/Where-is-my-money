import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { activateUser } from '../actions/loginActions';
import { Container, Input, Button } from 'semantic-ui-react'

import './ActivationPage.css'

let tokenInput = React.createRef()

class ActivationPage extends Component {
    render() {
        return (
            <Container fluid textAlign="center">
                <Input
                    placeholder='Kod aktywacyjny'
                    focus
                    ref={tokenInput}
                    className="token-input"
                >
                    <input />
                    <Button onClick={() => {
                        this.props.activateUser(tokenInput.current.inputRef.value)
                    }}>Aktywuj</Button>
                </Input>
            </Container>
        );
    }
}

ActivationPage.propTypes = {
    activateUser: PropTypes.func.isRequired,
    activated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    activated: state.loginReducer.activated
})

export default connect(mapStateToProps, { activateUser })(ActivationPage);
