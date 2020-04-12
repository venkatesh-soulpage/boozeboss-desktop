import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel } from 'rsuite';

import { Button } from 'rsuite';

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
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
  handleAddAgencyDraft = () => {
    const { addAgencyDraft } = this.props;
    addAgencyDraft();
  };

  render() {
    const { agencies, currentAgency } = this.props;
    const isActiveDraft =
      agencies &&
      agencies.length > 0 &&
      agencies.filter(agency => agency.isDraft).length > 0;
    return (
      <Column>
        <Button
          color="green"
          onClick={this.handleAddAgencyDraft}
          disabled={isActiveDraft}
        >
          + Add Agency
        </Button>
        <List>
          {(!agencies || agencies.length < 1) && (
            <MessageLabel>No Agencies registered</MessageLabel>
          )}
          {agencies &&
            agencies.length > 0 &&
            agencies.map((agency, index) => (
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
