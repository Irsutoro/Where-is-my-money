import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Tab, Container, Button, Grid, Column, Row, Divider } from 'semantic-ui-react';
import {Doughnut, Line,Bar} from 'react-chartjs-2'
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
let barData = {
    
    labels: [],
    datasets: [
      {
        label: 'Suma wydatków i przychodów',
        backgroundColor: '#7FB069',
        borderColor: '#9ab069',
        borderWidth: 1,
        hoverBackgroundColor: '#7a8c52',
        hoverBorderColor: '#7a8c52',
        data: []
      }
    ]
  };
const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
const weekNames = ["Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"];

class ReportPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            subaccountId: this.props.choosenSubaccount.id,
            doughnutPlus: doughnutPlus,
            doughnutMinus: doughnutMinus,
            dataLinePlus: dataLinePlus,
            dataLineMinus: dataLineMinus,
            barData: barData
        }
        this.parseTransactionsToDougnutData = this.parseTransactionsToDougnutData.bind(this)
        this.parseTransactionsToLineData = this.parseTransactionsToLineData.bind(this)
        this.parseTransactionsToBarData = this.parseTransactionsToBarData.bind(this)
        this.getInfoCSV = this.getInfoCSV.bind(this)
    }
    componentDidMount(){
        let date = new Date(),y = date.getFullYear(), m=date.getMonth(),d=date.getDate();
        Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

        //current month
        let first = new Date(y,m,2).getUnixTime();
        let last = new Date(y,m+1,1).getUnixTime();

        this.props.getTransactionsPart(first,last,this.state.subaccountId).then( () =>{
            this.parseTransactionsToDougnutData();
        });
        //past months
        first = new Date(y,m-2,2).getUnixTime();    
        last = new Date(y,m+1,1).getUnixTime();
        this.props.getTransactionsPart(first,last,this.state.subaccountId).then( () =>{
            this.parseTransactionsToLineData();
        });
        //past 7days
        first = new Date(y,m,-7).getUnixTime();
        last = new Date(y,m,d+1).getUnixTime();
        this.props.getTransactionsPart(first,last,this.state.subaccountId).then(()=>{
            this.parseTransactionsToBarData();
        })
    }
    componentWillReceiveProps(anotherAccount){
        if (anotherAccount.choosenSubaccount.id !== this.state.subaccountId) {
            let date = new Date(),y = date.getFullYear(), m=date.getMonth(),d=date.getDate();
            Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

            //current month
            let first = new Date(y,m,2).getUnixTime();
            let last = new Date(y,m+1,1).getUnixTime();

            this.props.getTransactionsPart(first,last,this.state.subaccountId).then( () =>{
                this.parseTransactionsToDougnutData();
            });
            //past months
            first = new Date(y,m-2,2).getUnixTime();    
            last = new Date(y,m+1,1).getUnixTime();
            this.props.getTransactionsPart(first,last,this.state.subaccountId).then( () =>{
                this.parseTransactionsToLineData();
            });
            //past 7days
            first = new Date(y,m,-7).getUnixTime();
            last = new Date(y,m,d+1).getUnixTime();
            this.props.getTransactionsPart(first,last,this.state.subaccountId).then(()=>{
                this.parseTransactionsToBarData();
            })
        }

        this.setState({
            subaccountId: anotherAccount.choosenSubaccount.id
        })
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
        amsminustemp.push(pastpastMinus);
        amsminustemp.push(pastMinus);
        amsminustemp.push(currentMinus);
        
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
    parseTransactionsToBarData(){
    
        var JSONresult = JSON.stringify(this.props.transactionsPart)    
        var arr = JSON.parse(JSONresult);
        let date = new Date(),y = date.getFullYear(), m=date.getMonth(),d=date.getDate();
        Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

        let todaySum=0;
        let firstPastSum=0;
        let secondPastSum=0;
        let thirdPastSum=0;
        let fourthPastSum=0;
        let fifthPastSum=0;
        let sixthPastSum=0;

        let todayFirstHour = new Date(y,m,d,0,0).getUnixTime();
        let todayLastHour = new Date(y,m,d,23,59,59).getUnixTime();
        let todayDayName = weekNames[new Date(y,m,d-1).getDay()];
        
        let firstPastFirstHour = new Date(y,m,d-1,0,0).getUnixTime();
        let firstPastLastHour = new Date(y,m,d-1,23,59,59).getUnixTime();
        let firstPastDayName = weekNames[new Date(y,m,d-2).getDay()]
        
        let secondPastFirstHour = new Date(y,m,d-2,0,0).getUnixTime();
        let secondPastLastHour = new Date(y,m,d-2,23,59,59).getUnixTime();
        let secondPastDayName = weekNames[new Date(y,m,d-3).getDay()]
        
        let thirdPastFirstHour = new Date(y,m,d-3,0,0).getUnixTime();
        let thirdPastLastHour = new Date(y,m,d-3,23,59,59).getUnixTime();
        let thirdPastDayName = weekNames[new Date(y,m,d-4).getDay()]

        let fourthPastFirstHour = new Date(y,m,d-4,0,0).getUnixTime();
        let fourthPastLastHour = new Date(y,m,d-4,23,59,59).getUnixTime();
        let fourthPastDayName = weekNames[new Date(y,m,d-5).getDay()]
        
        let fifthPastFirstHour = new Date(y,m,d-5,0,0).getUnixTime();
        let fifthPastLastHour = new Date(y,m,d-5,23,59,59).getUnixTime();
        let fifthPastDayName = weekNames[new Date(y,m,d-6).getDay()]

        let sixthPastFirstHour = new Date(y,m,d-6,0,0).getUnixTime();
        let sixthPastLastHour = new Date(y,m,d-6,23,59,59).getUnixTime();
        let sixthPastDayName = weekNames[new Date(y,m,d-7).getDay()]
        
        console.log(todayFirstHour)
        arr.forEach(function (a) {
            if(a.date>firstPastLastHour ){
                todaySum+=a.amount;
            }
            if(a.date>firstPastFirstHour && a.date <= firstPastLastHour){
                firstPastSum+=a.amount;
            }
            if(a.date>secondPastFirstHour && a.date<= secondPastLastHour){
                secondPastSum+=a.amount;
            }
            if(a.date>thirdPastFirstHour && a.date<= thirdPastLastHour){
                thirdPastSum+=a.amount;
            }
            if(a.date>fourthPastFirstHour && a.date<= fourthPastLastHour){
                fourthPastSum+=a.amount;
            }
            if(a.date>fifthPastFirstHour && a.date<= fifthPastLastHour){ 
                fifthPastSum+=a.amount;
            }
            if(a.date>sixthPastFirstHour && a.date<= sixthPastLastHour){
                sixthPastSum+=a.amount;
            }
            
        }, Object.create(null));
    
        let amounts =[];
        amounts.push(sixthPastSum);
        amounts.push(fifthPastSum);
        amounts.push(fourthPastSum);
        amounts.push(thirdPastSum);
        amounts.push(secondPastSum);
        amounts.push(firstPastSum);
        amounts.push(todaySum);
        
        let monthDayTable =[];
        monthDayTable.push(sixthPastDayName);
        monthDayTable.push(fifthPastDayName);
        monthDayTable.push(fourthPastDayName);
        monthDayTable.push(thirdPastDayName);
        monthDayTable.push(secondPastDayName);
        monthDayTable.push(firstPastDayName);
        monthDayTable.push(todayDayName);
        
        barData.datasets[0].data = amounts;
        barData.labels = monthDayTable;

        this.setState(()=>{
            return{
                barData:barData
            }
        })
        
      }
    render() {
        return (    
            <Grid stackable>
                <Grid.Row centered columns={16}>
                    <Grid.Column width = {7}>
                        <h1>Przychody w obecnym miesiącu:</h1>
                        <Doughnut data={this.state.doughnutPlus} />
                    </Grid.Column>
                    
                    <Grid.Column width = {7}>
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
                <Grid.Row centered columns={16}>
                    <Grid.Column width={7}>
                        <h2>Przychody w ostatnich 3 miesiącach:</h2>
                        <Line data={dataLinePlus}/>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <h2>Wydatki w ostatnich 3 miesiącach:</h2>
                        <Line data={dataLineMinus}/>
                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                <Grid.Row centered columns={16}>
                    <Grid.Column width={14}>
                    <h2>Podsumowanie majątku w ostatnich dniach</h2>
                    <Bar data={barData}/>
                    </Grid.Column >
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