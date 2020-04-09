import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Panel } from 'rsuite';

import { Button } from 'rsuite';

const Column = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const List = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
`

const MessageLabel = styled.p`
    font-family: Roboto;
    font-size: 1.25em;
    margin: 1em;
`

const StyledPanel = styled(Panel)`
    width: 100%;
    margin: 0.5em 0 0 0.5em;

    ${props => props.isSelected && 'background-color: #E8E8E8;'}

    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
`

class ClientContainer extends Component {

    handleSelectCurrentClient = () => {
        const {handleSelectCurrentClient, index} = this.props;
        handleSelectCurrentClient(index);
    }

    render() {
        const {client, currentClient, index} = this.props;
        return (
            <React.Fragment>
                {client.isDraft ? (
                    <StyledPanel 
                        shaded
                        isSelected={currentClient === index}
                        onClick={this.handleSelectCurrentClient}
                    >
                        <b>New Brand Owner</b>
                        <p>Editing...</p>
                    </StyledPanel>
                ) : (
                    <StyledPanel 
                        shaded
                        isSelected={currentClient === index}
                        onClick={this.handleSelectCurrentClient}
                    >
                        <b>{client.name}</b>
                        {client.owner_id ? (
                            <p>Verified</p>
                        ) : (
                            <p>(Waiting for signup)</p>
                        )}
                    </StyledPanel>
                )}
            </React.Fragment>
            
        )
    }
}

export default class ClientList extends Component {

    handleAddClientDraft = () => {
        const {addClientDraft} = this.props;
        addClientDraft();
    }

    render() {
        const {clients, currentClient} = this.props;
        const isActiveDraft = clients && clients.length > 0 && clients.filter(client => client.isDraft).length > 0;
        return (
            <Column>
                <Button
                    color="green"
                    onClick={this.handleAddClientDraft}
                    disabled={isActiveDraft}
                >
                    + Add Brand Owner
                </Button>
                <List>
                    {(!clients || clients.length < 1) && <MessageLabel>No Brand Owners registered</MessageLabel> }
                    {clients && clients.length > 0 && clients.map((client, index) => {
                        return (
                            <ClientContainer 
                                {...this.props}
                                index={index}
                                currentClient={currentClient}
                                client={client}
                            />
                        )
                    })}
                </List>
            </Column>
        )
    }
}

ClientList.propTypes = {
    clients: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
