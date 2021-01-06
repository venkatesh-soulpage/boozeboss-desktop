import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Button, SelectPicker } from 'rsuite';
import RoleValidator from 'components/RoleValidator';

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start; 
  position: sticky;
  top: 1em;
`;

const AddSection = styled.div`
  display: flex;
  flex: 1;
  max-height: 100px;
  flex-direction: column;
  position: sticky;
  top: 0;
  margin: 0 0.5em 0.5em;
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0.5em 0.5em 0.5em;
`;
const MessageLabel = styled.p`
  font-family: Roboto;
  font-size: 1.25em;
  margin: 1em;
`;

const StyledPanel = styled(Panel)`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0.5em 0 0.5em 0;

  ${props => props.isSelected && 'background-color: #E8E8E8;'} &:hover {
    cursor: pointer;
    opacity: 0.75;
  }
`;

class AgencyContainer extends Component {


  handleSelectCurrentAgency = () => {
    const { handleSelectCurrentAgency, index } = this.props;
    handleSelectCurrentAgency(index);
  };

  render() {
    const { agency, currentAgency, index } = this.props;
    return (
      <React.Fragment>
        {agency.isDraft ? (
          <StyledPanel
            shaded
            isSelected={currentAgency === index}
            onClick={this.handleSelectCurrentAgency}
          >
            <b>New Agency</b>
            <p>Editing...</p>
          </StyledPanel>
        ) : (
          <StyledPanel
            shaded
            isSelected={currentAgency === index}
            onClick={this.handleSelectCurrentAgency}
          >
            <b>{agency.name}</b>
            {/*agency.owner_id ? <p>Verified</p> : <p>(Waiting for signup)</p>*/}
          </StyledPanel>
        )}
      </React.Fragment>
    );
  }
}

export default class AgencyList extends Component {

  state = {
    client_id: null,
  }

  getClientFilter = () => {
    const {clients} = this.props;
    if (!clients) return [];
    
    return clients.map(client => {
      return {
        label: client.name,
        value: client.id
      }
    })
  }
 
  handleAddAgencyDraft = () => {
    const { addAgencyDraft } = this.props;
    addAgencyDraft();
  };

  handleClientFilter = (value) => {
    this.setState({ client_id: value })
  }

  render() {
    const { agencies, currentAgency } = this.props;
    const { client_id } = this.state;
    const isActiveDraft =
      agencies &&
      agencies.length > 0 &&
      agencies.filter(agency => agency.isDraft).length > 0;
    return (
      <Column>
        <AddSection>
          <RoleValidator
            {...this.props}
            scopes={['ADMIN', 'BRAND']}
            roles={['ADMIN', 'OWNER']}
          >
            <Button
              style={{margin: '0 0 1em 0'}}
              color="green"
              onClick={this.handleAddAgencyDraft}
              disabled={isActiveDraft}
            >
              + Add Agency
            </Button>
          </RoleValidator>
          <RoleValidator
            {...this.props}
            scopes={['ADMIN', 'REGION']}
            roles={['ADMIN', 'OWNER', 'MANAGER']}
          >
            <SelectPicker 
              placeholder="Filter by Team"
              value={client_id}
              data={this.getClientFilter()}
              onChange={(e) => this.handleClientFilter(e)}
            />
          </RoleValidator>
        </AddSection>
        <List>
          {(!agencies || agencies.length < 1) && (
            <MessageLabel>No Agencies registered</MessageLabel>
          )}
          {agencies &&
            agencies.length > 0 &&
            agencies
              .filter(agency => client_id ? agency.invited_by === client_id : true)
              .map((agency, index) => (
              <AgencyContainer
                {...this.props}
                index={index}
                currentAgency={currentAgency}
                agency={agency}
              />
            ))}
        </List>
      </Column>
    );
  }
}

AgencyList.propTypes = {
  agencies: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
