import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { activateUser } from '../actions/loginActions';
import { Container, Input, Button, Image,Grid , Row, Divider,Column } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './ActivationPage.css';
import logo from '../resources/images/logo.svg';

class ActivationPage extends Component {
    componentDidMount(){
        let url = new URL(window.location.href);
        //'http://iraminius.pl/wmm/activate?token=0FA58AHGNAP1E6M50E6F8GGBMLUPR7'
        let searchParams = new URLSearchParams(url.search);
        console.log(searchParams.get("token"));
        this.props.activateUser(searchParams.get("token"));
    }
    render() {
        return (
            <Grid stackable>
            <Grid.Row >
            <div className="imageTextact">
                <div className="imageText-textact">
                    Aktywacja konta
                </div>
            </div>
            </Grid.Row >
                <Grid.Row centered columns={16}>
                    <h2>Twoje konto zostało aktywowane. Zarządzaj swoimi finansami już teraz! Aby wrócić na stronę główną naciśnij poniższy przycisk.</h2>
                </Grid.Row>
                <Divider/>
                <Grid.Row centered columns={16}>
                    <Button active={this.props.location === '/'}>
                        <Link to='/'>Strona główna</Link>
                    </Button>
                </Grid.Row>
            </Grid>
        );
    }
}

ActivationPage.propTypes = {
    activateUser: PropTypes.func.isRequired,
    activated: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    activated: state.loginReducer.activated,
     location: state.routerReducer.location.pathname
})

export default connect(mapStateToProps, { activateUser })(ActivationPage);
