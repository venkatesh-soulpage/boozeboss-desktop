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
    render() {
        const {client, currentClient, index} = this.props;
        return (
            <React.Fragment>
                {client.isDraft ? (
                    <StyledPanel 
                        shaded
                        isSelected={currentClient === index}
                    >
                        <b>New Brand Owner</b>
                        <p>Editing...</p>
                    </StyledPanel>
                ) : (
                    <StyledPanel header="Client">
                        <p>...</p>
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
        return (
            <Column>
                <Button
                    color="green"
                    onClick={this.handleAddClientDraft}
                >
                    + Add Brand Owner
                </Button>
                <List>
                    {(!clients || clients.length < 1) && <MessageLabel>No Brand Owners registered</MessageLabel> }
                    {clients && clients.length > 0 && clients.map((client, index) => {
                        return (
                            <ClientContainer 
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
