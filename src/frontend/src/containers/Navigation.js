import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { logout } from '../actions/loginActions'
import { pullSubaccountData } from '../actions/subaccountActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../resources/images/logo.svg'
import './Navigation.css'

class Navigation extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.pullSubaccountData();
    }
    render() {
        const subs = this.props.subaccs.map(sub =>(
            <div key={sub.id}>
                <h3>{sub.name}</h3>
            </div>
        ))
        const loggedMenuItems = [
            (<Dropdown
                key="1"
                item
                selection
                placeholder="Wybierz subkonto"
                options={[
                    { key: 1, text: 'Elvis', value: 1},
                    { key: 2, text: 'Zdzichu', value: 2},
                    { key: 3, text: 'Marian', value: 3}
                ]}
            />),
            (<Menu.Item key="2" link active={this.props.location === '/history'}>
                <Link to='/history'>Historia</Link>
            </Menu.Item>),
            (<Menu.Item key="3" link active={this.props.location === '/report'}>
                <Link to='/report'>Raport</Link>
            </Menu.Item>),
            (<Menu.Item key="4" link active={this.props.location === '/properties'}>
            <Link to='/properties'>Ustawienia</Link>
            </Menu.Item>),
            (<Menu.Item key="5" link position="right" onClick={this.props.logout}>
                Wyloguj
            </Menu.Item>)
        ]

        return (
            <Menu
                className="navigation"
                stackable
                inverted
                borderless
                fixed="top"
            >
                <Menu.Item
                    header
                    className="logo"
                >
                    <Link
                        to="/"
                        className="logo"
                    >
                        <img
                            src={logo}
                            className="logo"
                        />
                    </Link>
                </Menu.Item>

                {this.props.logged &&
                    loggedMenuItems
                }
            </Menu >
        );
    }
}

Navigation.propTypes = {
    logged: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    location: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    logged: state.loginReducer.logged,
    location: state.routerReducer.location.pathname
})

export default connect(mapStateToProps, { logout, pullSubaccountData })(Navigation);