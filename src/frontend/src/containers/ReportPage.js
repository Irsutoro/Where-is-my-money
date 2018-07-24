import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Tab, Container, Button, Grid, Column, Row, Divider } from 'semantic-ui-react';
import {Doughnut, Line} from 'react-chartjs-2'
import {CSVLink} from 'react-csv'
import { Link } from 'react-router-dom'
import withSubaccountsCheck from './withSubaccountsCheck';
import {getTransactionsPart} from '../actions/transactionsActions'
let doughnutPlus={
    labels: [],
    datasets: [{
          data: [],
          backgroundColor: [
          '#ad343e',
          '#be7c4d',
          '#f2af29',
          '#f86624',
          '#468c98',
          '#8ac926',
          '#813405',
          '#3772ff',
          '#beb7a4'
          ],
          hoverBackgroundColor: [
          '#ad4134',
          '#be8c4d',
          '#f2cb29',
          '#f85124',
          '#467b98',
          '#acc926',
          '#811f05',
          '#3791ff',
          '#a4b8be'
          ]
  }]
  }
let doughnutMinus={
    labels: [],
      datasets: [{
          data: [],
          backgroundColor: [
            '#ad343e',
            '#be7c4d',
            '#f2af29',
            '#f86624',
            '#468c98',
            '#8ac926',
            '#813405',
            '#3772ff',
            '#beb7a4'
          ],
          hoverBackgroundColor: [
            '#ad4134',
            '#be8c4d',
            '#f2cb29',
            '#f85124',
            '#467b98',
            '#acc926',
            '#811f05',
            '#3791ff',
            '#a4b8be'
          ]
  }]
  }
let dataLinePlus = {
    labels: [],
    datasets: [
      {
        label: 'Przychód w ostatnich miesiącach',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      }
    ]
  };
let dataLineMinus = {
    labels: [],
    datasets: [
      {
        label: 'Wydatki w ostatnich miesiącach',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      }
    ]
  };


const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
];

class ReportPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            doughnutPlus: doughnutPlus,
            doughnutMinus: doughnutMinus,
            dataLinePlus: dataLinePlus,
            dataLineMinus: dataLineMinus
        }
        this.parseTransactionsToDougnutData = this.parseTransactionsToDougnutData.bind(this)
        this.parseTransactionsToLineData = this.parseTransactionsToLineData.bind(this)
        this.getInfoCSV = this.getInfoCSV.bind(this)
    }
    componentDidMount(){
        let date = new Date(),y = date.getFullYear(), m=date.getMonth();
        Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

        //current month
        let first = new Date(y,m,2).getUnixTime();
        let last = new Date(y,m+1,1).getUnixTime();

        this.props.getTransactionsPart(first,last,this.props.choosenSubaccount.id).then( () =>{
            this.parseTransactionsToDougnutData();
        });
        //past months
        first = new Date(y,m-2,2).getUnixTime();    
        last = new Date(y,m+1,1).getUnixTime();
        this.props.getTransactionsPart(first,last,this.props.choosenSubaccount.id).then( () =>{
            this.parseTransactionsToLineData();
        });
    }
    getInfoCSV(){
        let date = new Date(),y = date.getFullYear(), m=date.getMonth();
        Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

        //current month
        let first = new Date(y,m,2).getUnixTime();
        let last = new Date(y,m+1,1).getUnixTime();

        this.props.getTransactionsPart(first,last,this.props.choosenSubaccount.id).then( () =>{
            this.parseTransactionsToDougnutData();
        });
    }
    parseTransactionsToDougnutData(){
        let plus = []
        let minus =[]

        let JSONresult = JSON.stringify(this.props.transactionsPart);
        let arr = JSON.parse(JSONresult)

        arr.forEach(function (a) {
            if(a.amount>0){
              if (!plus[a.category]) {
                plus[a.category] = { category: a.category, amount: 0 };
                plus.push(plus[a.category]);
              }
              plus[a.category].amount += a.amount;
            }
            if(a.amount<=0){
              if (!minus[a.category]) {
                minus[a.category] = { category: a.category, amount: 0 };
                minus.push(minus[a.category]);
              }
              minus[a.category].amount += a.amount;
            }
          }, 
          Object.create(null));

        let catplustemp = [];
        let amsplustemp =[];
        for(var i=0;i<plus.length;i++){
        catplustemp[i] = plus[i].category
        amsplustemp[i] = plus[i].amount
        }
        let catminustemp = [];
        let amsminustemp =[];
        for(var i=0;i<minus.length;i++){
        catminustemp[i] = minus[i].category
        amsminustemp[i] = minus[i].amount * (-1)
        }
        
        doughnutPlus.labels = catplustemp;
        doughnutPlus.datasets[0].data = amsplustemp;
        doughnutMinus.labels = catminustemp;
        doughnutMinus.datasets[0].data = amsminustemp;
        this.setState(()=>{
            return{
                doughnutPlus: doughnutPlus,
                doughnutMinus: doughnutMinus
            }
        })
    }
    parseTransactionsToLineData(){
        let JSONresult = JSON.stringify(this.props.transactionsPart);
        let arr = JSON.parse(JSONresult)
        let date = new Date(),y = date.getFullYear(), m=date.getMonth();
        Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

        let currentPlus = 0;
        let currentMinus = 0;
        let pastPlus = 0;
        let pastMinus = 0;
        let pastpastPlus = 0;
        let pastpastMinus =0;

        //current month
        let currentFirstDay = new Date(y,m,2).getUnixTime();
        let currentLastDay = new Date(y,m+1,1).getUnixTime();
        let currentMonthName = monthNames[new Date(y,m,2).getMonth()]
        //past month
        let pastFirstDay = new Date(y,m-1,2).getUnixTime();
        let pastLastDay = new Date(y,m,1).getUnixTime();
        let pastMonthName = monthNames[new Date(y,m-1,2).getMonth()]
        //past past month
        let pastpastFirstDay = new Date(y,m-2,2).getUnixTime();
        let pastpastLastDay = new Date(y,m-1,1).getUnixTime();
        let pastpastMonthName = monthNames[new Date(y,m-2,2).getMonth()]

        arr.forEach(function (a) {
            if(a.date>currentFirstDay){
                if(a.amount>0){
                    currentPlus += a.amount;
                  }
                  if(a.amount<=0){
                    currentMinus += a.amount;
                  }
            }
            if(a.date>pastFirstDay && a.date < pastLastDay){
                if(a.amount>0){
                    pastPlus += a.amount;
                  }
                  if(a.amount<=0){
                    pastMinus += a.amount;
                  }
            }
            if(a.date>pastpastFirstDay && a.date< pastpastLastDay){
                if(a.amount>0){
                    pastpastPlus += a.amount;
                  }
                  if(a.amount<=0){
                    pastpastMinus += a.amount;
                  }
            }
          }, 
          Object.create(null));

        
        let amsplustemp =[];
        amsplustemp.push(pastpastPlus);
        amsplustemp.push(pastPlus);
        amsplustemp.push(currentPlus);

        let amsminustemp =[];
        amsminustemp.push(pastpastMinus*(-1));
        amsminustemp.push(pastMinus*(-1));
        amsminustemp.push(currentMinus*(-1));
        
        let monthTable = [];
        monthTable.push(pastpastMonthName);
        monthTable.push(pastMonthName);
        monthTable.push(currentMonthName);

        dataLinePlus.datasets[0].data = amsplustemp;
        dataLinePlus.labels = monthTable;

        dataLineMinus.datasets[0].data = amsminustemp;
        dataLineMinus.labels = monthTable;

        this.setState(()=>{
            return{
                dataLinePlus: dataLinePlus,
                dataLineMinus: dataLineMinus
            }
        })
    }
    render() {
        return (    
            <Grid stackable>
                <Grid.Row centered columns={16}>
                    <Grid.Column width = {8}>
                        <h1>Przychody w obecnym miesiącu:</h1>
                        <Doughnut data={this.state.doughnutPlus} />
                    </Grid.Column>
                    
                    <Grid.Column width = {8}>
                        <h1>Wydatki w obecnym miesiącu:</h1>
                        <Doughnut data={this.state.doughnutMinus} />
                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                <Grid.Row centered columns={9}>
                <h3>Aby wyeksportować przychody oraz wydatki z obecnego miesiąca, naciśnij poniższy przycisk.</h3>
                    <Button onClick={this.getInfoCSV} size ="huge">
                        <CSVLink data={this.props.transactionsPart} filename="ostatniMiesiac.csv">
                            Eksport
                        </CSVLink>
                    </Button>
                </Grid.Row>
                <Divider/>
                <Grid.Row centered columns={2}>
                    <Grid.Column>
                        <h2>Przychody w ostatnich 3 miesiącach:</h2>
                        <Line data={dataLinePlus}/>
                    </Grid.Column>
                    <Grid.Column>
                        <h2>Wydatki w ostatnich 3 miesiącach:</h2>
                        <Line data={dataLineMinus}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
ReportPage.propTypes = {
    transactionsPart: PropTypes.array.isRequired,
    choosenSubaccount: PropTypes.object.isRequired,
    getTransactionsPart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    transactionsPart: state.transactionsReducer.transactionsPart,
    choosenSubaccount: state.subaccountsReducer.choosenSubaccount
})
export default connect(mapStateToProps, {getTransactionsPart})(withSubaccountsCheck(ReportPage))