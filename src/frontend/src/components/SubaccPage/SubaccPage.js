import React, { Component } from 'react';

import './SubaccPage.css'

import SubaccTable from '../../containers/SubaccTable.js'

export default class SubaccPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
        
    }


    
    render() {
        const data = [{
            id: 1,
            name: 'hajs',
            code: 'PLN',
            date: '23.03.2103',
            amount: 3,
            comment: 'pożyczka'            
          },{
            id: 2,
            name: 'hajs',
            code: 'PLN',
            date: '24.03.2103',
            amount: 2,
            comment: 'pożyczka'            
          }
        ]
        return (
            <SubaccTable data={data}/>
        );
    }
}

