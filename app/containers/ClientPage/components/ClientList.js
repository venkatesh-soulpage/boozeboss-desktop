import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel } from 'rsuite';
import moment from 'moment';
import RoleValidator from 'components/RoleValidator';
import ClientFilter from './ClientFilter';

import { Button } from 'rsuite';

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start; 
  position: sticky;
  top: 1em;
  max-height: 90vh;
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const MessageLabel = styled.p`
  font-family: Roboto;
  font-size: 1.25em;
  margin: 1em;
`;

const StyledPanel = styled(Panel)`
  width: 100%;
  margin: 0.5em 0 0 0.5em;

  ${props => props.isSelected && 'background-color: #E8E8E8;'} &:hover {
    cursor: pointer;
    opacity: 0.75;
  }
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'};
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-content: ${props => props.align || 'flex-start'};
`

class ClientContainer extends Component {
  handleSelectCurrentClient = () => {
    const { handleSelectCurrentClient, index } = this.props;
    handleSelectCurrentClient(index);
  };

  render() {
    const { client, currentClient, index } = this.props;
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
            <StyledRow>
              <StyledColumn>
                <b>{client.name}</b>
                {client && client.collaborators && client.collaborators.length > 0 && <p>(Waiting for signup)</p>}
              </StyledColumn>
              <StyledColumn align="flex-end">
                <StyledRow justify="flex-end">
                    <p style={{margin: '0 5px 0 5px'}}>Created: </p>
                    <b>{moment(client.created_at).format('DD/MM/YYYY')}</b>
                </StyledRow>
                <StyledRow justify="flex-end">
                    <p style={{margin: '0 5px 0 5px'}}>Expiration: </p>
                    <b>{moment(client.expiration_date).format('DD/MM/YYYY')}</b>
                </StyledRow>
                
              </StyledColumn>
            </StyledRow> 
          </StyledPanel>
        )}
      </React.Fragment>
    );
  }
}

export default class ClientList extends Component {
  handleAddClientDraft = () => {
    const { addClientDraft } = this.props;
    addClientDraft();
  };

  render() {
    const { clients, currentClient} = this.props;
    const isActiveDraft =
      clients &&
      clients.length > 0 &&
      clients.filter(client => client.isDraft).length > 0;
    return (
      <Column>
        <RoleValidator
          {...this.props}
          scopes={['ADMIN', 'REGION']}
          roles={['ADMIN', 'OWNER']}
        >
          <Button
            color="green"
            onClick={this.handleAddClientDraft}
            disabled={isActiveDraft}
            style={{minHeight: '40px'}}
          >
            + Add Team
          </Button>
        </RoleValidator>
        <RoleValidator
          {...this.props}
          scopes={['ADMIN']}
          roles={['ADMIN']}
        >
          <ClientFilter 
            {...this.props}
          />
        </RoleValidator>
        <List>
          {clients &&
            clients.length > 0 &&
            clients.map((client, index) => (
              <ClientContainer
                {...this.props}
                index={index}
                currentClient={currentClient}
                client={client}
              />
            ))}
        </List>
      </Column>
    );
  }
}

ClientList.propTypes = {
  clients: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  
};
