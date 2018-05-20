import React, { Component } from 'react';

import './SubaccPage.css'

import SubaccTable from '../../containers/SubaccTable.js'

export default class SubaccPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddModalOpen: false,
            isEditModalOpen: false,
            neededForEdit: {},
            data: []
        }

        this.fetchData = this.fetchData.bind(this);
        
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){

    }

    toggleModal(modalOpenStateName){
        this.setState({
            [modalOpenStateName]: !this.state[modalOpenStateName]
        })
    }

    submitData(data){

    }

    submitEdit(data){

    }

    editRow(row){
        this.setState({
            isEditModalOpen: true,
            neededForEdit: {

            }
        })
    }

    deleteRow(row){

    }
    
    render() {
        
        return (
            <div>
                <h1>
                    Tabela finansów użytkownika {}
                </h1>
                <SubaccTable
                data =  {this.state.data}
                editRow = {this.editRow}
                deleteRow = {this.deleteRow}
                submitEdit = {this.submitEdit}
                />
           </div>
        );
    }
}

