import React, { Component } from 'react';
import { Container, Header, Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

let nameInput = React.createRef()

const CreateSubaccount = ({ addSubaccount }) => {
    return (
        <Container textAlign="center" fluid>
            <Input
                placeholder='Nazwa subkonta'
                focus
                ref={nameInput}
            >
                <input />
                <Button onClick={() => {
                    addSubaccount(nameInput.current.inputRef.value)
                }}>Utwórz subkonto</Button>
            </Input>
        </Container>
    )
}

export default CreateSubaccount