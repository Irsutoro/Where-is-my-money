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
            subaccountName:"",
            subaccountsDropdown: [(
               
                <Dropdown
                    key="1"
                    item
                    selection
                    placeholder="Wybierz subkonto"
                    options={this.getSubaccountsChoices(this.props.subaccounts)}
                />),
                (<Menu.Item key="2">
                    Waluta: {this.subaccountName}
                </Menu.Item>
            )]
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
            console.log(newProps.choosenSubaccount.currency)
            this.setState({
                subaccountName: newProps.choosenSubaccount.currency,
                subaccountsDropdown: [(
                    <Dropdown
                        key="1"
                        item
                        selection
                        placeholder="Wybierz subkonto"
                        value={newProps.choosenSubaccount.id}
                        options={this.getSubaccountsChoices(newProps.subaccounts)}
                    />),
                    (<Menu.Item key="2">
                        Waluta: {newProps.choosenSubaccount.currency}
                    </Menu.Item>
                )]
            })
        } else {
            this.setState({
                subaccountsDropdown: [(
                    <Dropdown
                        key="1"
                        item
                        placeholder="Wybierz subkonto"
                    />),
                    (<Menu.Item key="2">
                        Waluta:
                    </Menu.Item>
                )]
            })
        }
    }

    render() {
        const loggedMenuItems = [
            (<Menu
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
                </Menu.Item>),
            {this.state.subaccountsDropdown},
            (<Menu.Item key="3" link active={this.props.location === '/history'}>
                <Link to='/history'>Historia</Link>
            </Menu.Item>),
            (<Menu.Item key="4" link active={this.props.location === '/report'}>
                <Link to='/report'>Raport</Link>
            </Menu.Item>),
            (<Menu.Item key="5" link active={this.props.location === '/subaccounts'}>
                <Link to='/subaccounts'>Subkonta</Link>
            </Menu.Item>),
            (<Menu.Item key="6" link active={this.props.location === '/properties'}>
            <Link to='/properties'>Ustawienia</Link>
            </Menu.Item>),
            (<Menu.Item key="7" link position="right" onClick={this.props.logout}>
                Wyloguj
            </Menu.Item>),
            ( </Menu >)
        ]
        
        return (    
            
<div>
                {this.props.logged &&
                    loggedMenuItems
                }
                
</div>
           
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