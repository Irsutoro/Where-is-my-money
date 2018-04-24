import React, { Component } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

import logo from '../../resources/images/logo.svg'

export default class NotFound extends Component {
    render() {
        return (
            <Grid stackable columns={3} className='error-grid'>
            <Grid.Column width={6}>
            </Grid.Column>
                <Grid.Column centered width={3} textAlign='centered'>
                    <Header as='h1' color='brown' >Błąd 404</Header>
                    <br/>
                    <Image src={logo} size='medium'/>
                    <br/>
                    <Header as='h1' color='brown'>Nie znaleziono strony?!</Header>
                </Grid.Column>
            <Grid.Column width={6}>
            </Grid.Column>    
            </Grid>
        );
    }
}
