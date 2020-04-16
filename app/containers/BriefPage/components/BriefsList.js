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

class BriefContainer extends Component {
  handleSelectCurrentBrief = () => {
    const { handleSelectCurrentBrief, index } = this.props;
    handleSelectCurrentBrief(index);
  };

  render() {
    const { brief, currentBrief, index } = this.props;
    return (
      <React.Fragment>
        {brief.isDraft ? (
          <StyledPanel
            shaded
            isSelected={currentBrief === index}
            onClick={this.handleSelectCurrentBrief}
          >
            <b>New Brief</b>
            <p>(Draft)</p>
          </StyledPanel>
        ) : (
          <StyledPanel
            shaded
            isSelected={currentBrief === index}
            onClick={this.handleSelectCurrentBrief}
          >
            <b>{brief.name}</b>
            <p>{brief.created_at && moment(brief.created_at).format('DD/MM/YYYY')}</p>
            <p>{brief.status}</p>
          </StyledPanel>
        )}
      </React.Fragment>
    );
  }
}

export default class BriefsList extends Component {

  handleAddBriefDraft = () => {
    const { addBriefDraft } = this.props;
    addBriefDraft();
  };

  render() {
    const { briefs, currentBrief} = this.props;
    const isActiveDraft =
      briefs &&
      briefs.length > 0 &&
      briefs.filter(brief => brief.isDraft).length > 0;
    return (
      <Column>
        <RoleValidator
          {...this.props}
          scopes={['BRAND']}
          roles={['OWNER', 'MANAGER']}
        >
          <Button
            color="green"
            onClick={this.handleAddBriefDraft}
            disabled={isActiveDraft}
          >
            + New Brief
          </Button>
        </RoleValidator>
        <List>
          {(!briefs || briefs.length < 1) && (
            <MessageLabel>No Briefs registered</MessageLabel>
          )}
          {briefs &&
            briefs.length > 0 &&
            briefs.map((brief, index) => (
              <BriefContainer
                {...this.props}
                index={index}
                currentBrief={currentBrief}
                brief={brief}
              />
            ))}
        </List>
      </Column>
    );
  }
}

BriefsList.propTypes = {
  clients: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
