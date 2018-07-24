import React, { Component } from 'react';
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { logout } from '../actions/loginActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { chooseSubaccount } from '../actions/subaccountsActions'

import logo from '../resources/images/logo.svg'
import './Navigation.css'

class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subaccountsDropdown: (
                <Dropdown
                    key="1"
                    item
                    selection
                    placeholder="Wybierz subkonto"
                    options={this.getSubaccountsChoices(this.props.subaccounts)}
                />
            )
        }

        this.getSubaccountsChoices = this.getSubaccountsChoices.bind(this)
    }

    getSubaccountsChoices(subaccounts) {
        return subaccounts.map((subaccount, index) =>({
            key: index, text:subaccount.name, value: subaccount.id, onClick: () => {
                this.props.chooseSubaccount(subaccount)
            }
        }))
    }

    componentWillReceiveProps(newProps) {
        if (Object.keys(newProps.choosenSubaccount).length !== 0) {
            this.setState({
                subaccountsDropdown: (
                    <Dropdown
                        key="1"
                        item
                        selection
                        placeholder="Wybierz subkonto"
                        value={newProps.choosenSubaccount.id}
                        options={this.getSubaccountsChoices(newProps.subaccounts)}
                    />
                )
            })
        } else {
            this.setState({
                subaccountsDropdown: (
                    <Dropdown
                        key="1"
                        item
                        placeholder="Wybierz subkonto"
                    />
                )
            })
        }
    }

    render() {
        const loggedMenuItems = [
            this.state.subaccountsDropdown,
            (<Menu.Item key="2" link active={this.props.location === '/history'}>
                <Link to='/history'>Historia</Link>
            </Menu.Item>),
            (<Menu.Item key="3" link active={this.props.location === '/report'}>
                <Link to='/report'>Raport</Link>
            </Menu.Item>),
            (<Menu.Item key="4" link active={this.props.location === '/subaccounts'}>
                <Link to='/subaccounts'>Subkonta</Link>
            </Menu.Item>),
            (<Menu.Item key="5" link active={this.props.location === '/properties'}>
            <Link to='/properties'>Ustawienia</Link>
            </Menu.Item>),
            (<Menu.Item key="6" link position="right" onClick={this.props.logout}>
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
    location: PropTypes.string.isRequired,
    subaccounts: PropTypes.array.isRequired,
    choosenSubaccount: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    logged: state.loginReducer.logged,
    location: state.routerReducer.location.pathname,
    subaccounts: state.subaccountsReducer.subaccounts,
    choosenSubaccount: state.subaccountsReducer.choosenSubaccount
})

export default connect(mapStateToProps, { logout, push, chooseSubaccount })(Navigation);