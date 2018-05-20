import React , { Component }  from 'react';
import ReactTable from 'react-table';

import './SubaccTable.css';
import { Button } from 'semantic-ui-react';

export default class SubaccTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            columns: [{
                Header: "ID",
                accessor: "id" /*id pochodzi z tabeli entries */
            },{
                Header: "Kategoria",
                accessor: "name", /*id oraz name pochodza z tabeli categories, moze byc duplikacja id !! */
            },{
                Header: "Waluta",
                accessor: "code" /*id oraz code pochodza z tabeli currencies, jak wyzej */
            },{
                Header: "Data dodania",
                accessor: "date" /* tab entries */
            },{
                Header: "Ilość",
                accessor: "amount" /*tab entries */
            },{
                Header: "Opis",
                accessor: "comment" /*tab entries */
            },{
                Header: "Modyfikacja",
                accessor: "actions",
                sortable: false,
                filterable: false,
                Cell: row =>(
                    <div>
                        <Button onClick={()=> this.props.editRow(row.row)}>Edytuj</Button>
                        <Button onClick={()=> this.props.deleteRow(row.row)}>Usuń</Button>
                    </div>
                )
            }]
        }
    };
    render(){
        return(
            <ReactTable
                data={this.props.data}
                columns = {this.state.columns}
                defaultPageSize={10}
                pageSizeOptions={[5,10,20,40]}
                filterable={true}
                defaultFilterMethod={(filter, row, column) => {
                    const id = filter.pivotId || filter.id
                    return row[id] !== undefined ? String(row[id]).toUpperCase().includes(filter.value.toUpperCase()) : true
                }}
                previousText="Poprzednia"
                nextText="Następna"
                loadingText="Ładowanie"
                noDataText="Brak wpisów w tym subkoncie"
                pageText="Strona"
                ofText="z"
                rowsText="rzędów"
                className="-striped -highlight"
            />
        )
    }
}