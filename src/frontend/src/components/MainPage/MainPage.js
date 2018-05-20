import React, { Component } from 'react';

import './MainPage.css'

import MainMenu from '../../containers/MainMenu';

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.fetchSubacc = this.fetchSubacc.bind(this);
        this.addSubacc = this.addSubacc.bind(this);
    }

    componentDidMount(){
        this.fetchSubacc();
    }
    
    fetchSubacc(){
        fetch('https://httpbin.org/get',{
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            
        }).then((Response)=>Response.json())
          .then((result)=>{
            console.log(result);
        });
    }

    addSubacc(){
        fetch('https://httpbin.org/post',{
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: ''})
        }).then((Response)=>Response.json())
          .then((result)=>{
            console.log(result);
        });
    }

    render() {
        
        return (
          <MainMenu
            onAdd = {this.addSubacc}
            />  
           
        );
    }
}

