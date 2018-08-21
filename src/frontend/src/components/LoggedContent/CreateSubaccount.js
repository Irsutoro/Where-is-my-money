import React, { Component } from 'react';
import { Container, Header, Button, Input, Dropdown,Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

let nameInput = React.createRef()
let currencyId = React.createRef();

const CreateSubaccount = ({ addSubaccount, currencies }) => {
    
    return (
        <Grid stackable>
                <Grid.Row centered columns={16}>
                    <h4>Podaj nazwę subkonta</h4>
                    <Input
                        placeholder='Nazwa'
                        focus
                        ref={nameInput}
                    >
                    <input />
                    </Input>
                </Grid.Row>
                <Grid.Row centered columns={8}>
                <Grid.Column width={2}>
                </Grid.Column>
                <Grid.Column width={4}>
                    <h4>Wybierz walutę subkonta</h4>
                        <Dropdown fluid selection  options={currencies.map(currency => {
                            return {
                            text: currency.code,
                            value: currency.id
                            }
                        })}
                            ref={currencyId}
                        />
                </Grid.Column >
                <Grid.Column width={2}>
                </Grid.Column>
                   
                </Grid.Row>
                <Grid.Row centered columns={16}>
                    <Button onClick={() => {
                        addSubaccount(nameInput.current.inputRef.value,currencyId.current.state.value)
                    }}>Utwórz subkonto</Button>
                </Grid.Row>
            </Grid>
    )
}

export default CreateSubaccount