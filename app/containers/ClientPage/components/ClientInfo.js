import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Panel, Input, Button } from 'rsuite';

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    margin: 0 2em 0 2em;
`

const ClientsLabel = styled.p`
    font-size: 1.25em;
`
const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 0;
`

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`

export default class ClientInfo extends Component {

    state = {
        name: null,
        description: null,
    }

    render() {
        const {clients, currentClient} = this.props;
        return (
            <InfoContainer>
                {(!clients || clients.length < 1) && <ClientsLabel>No Clients</ClientsLabel> }
                {clients && clients.length > 0 && (
                    <Panel bordered>
                        <DataContainer>
                            <FieldContainer>
                                <FieldLabel>Name</FieldLabel>
                                <Input />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldLabel>Description</FieldLabel>
                                <Input componentClass="textarea" rows={3} />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldLabel>Owner Email</FieldLabel>
                                <Input />
                            </FieldContainer>
                            <FieldContainer>
                                <Button>Create Brand</Button>
                            </FieldContainer>
                        </DataContainer>
                        

                    </Panel>
                )}
            </InfoContainer>
        )
    }
}

ClientInfo.propTypes = {

}