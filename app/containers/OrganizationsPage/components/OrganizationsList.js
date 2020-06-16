import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel } from 'rsuite';
import moment from 'moment';
import RoleValidator from 'components/RoleValidator';

import { Button } from 'rsuite';

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start; 
  position: sticky;
  top: 1em;
  z-index: 99;
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

class OrganizationsContainer extends Component {
  handleSelectCurrentOrganization = () => {
    const { handleSelectCurrentOrganization, index } = this.props;
    handleSelectCurrentOrganization(index);
  };

  render() {
    const { organization, currentOrganization, index } = this.props;
    return (
      <React.Fragment>
        {organization.isDraft ? (
          <StyledPanel
            shaded
            isSelected={currentOrganization === index}
            onClick={this.handleSelectCurrentOrganization}
          >
            <b>New Organization</b>
            <p>Editing...</p>
          </StyledPanel>
        ) : (
          <StyledPanel
            shaded
            isSelected={currentOrganization === index}
            onClick={this.handleSelectCurrentOrganization}
          >
            <StyledRow>
              <StyledColumn>
                <b>{organization.name}</b>
                {organization && organization.collaborators.lenght > 0 && <p>(Waiting for signup)</p>}
              </StyledColumn>
              <StyledColumn align="flex-end">
                <StyledRow justify="flex-end">
                    <p style={{margin: '0 5px 0 5px'}}>Created: </p>
                    <b>{moment(organization.created_at).format('DD/MM/YYYY')}</b>
                </StyledRow>
                <StyledRow justify="flex-end">
                    <p style={{margin: '0 5px 0 5px'}}>Expiration: </p>
                    <b>{moment(organization.expiration_date).format('DD/MM/YYYY')}</b>
                </StyledRow>
                
              </StyledColumn>
            </StyledRow> 
          </StyledPanel>
        )}
      </React.Fragment>
    );
  }
}

export default class OrganizationsList extends Component {
  handleAddOrganizationDraft = () => {
    const { addOrganizationDraft } = this.props;
    addOrganizationDraft();
  };

  render() {
    const { organizations, currentOrganization} = this.props;
    const isActiveDraft =
      organizations &&
      organizations.length > 0 &&
      organizations.filter(organization => organization.isDraft).length > 0;
    return (
      <Column>
        <RoleValidator
          {...this.props}
          scopes={['ADMIN']}
          roles={['ADMIN']}
        >
          <Button
            color="green"
            onClick={this.handleAddOrganizationDraft}
            disabled={isActiveDraft}
          >
            + Add Organization
          </Button>
        </RoleValidator>
        <List>
          {(!organizations || organizations.length < 1) && (
            <MessageLabel>No Current Organizations</MessageLabel>
          )}
          {organizations &&
            organizations.length > 0 &&
            organizations.map((organization, index) => (
              <OrganizationsContainer
                {...this.props}
                index={index}
                currentOrganization={currentOrganization}
                organization={organization}
              />
            ))}
        </List>
      </Column>
    );
  }
}

OrganizationsList.propTypes = {
  organizations: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
