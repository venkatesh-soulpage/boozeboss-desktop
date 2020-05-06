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
  top: 0;
  bottom: 0;
  height: 85vh;
  overflow-y: auto;
`;

const AddSection = styled.div`
  display: flex;
  flex: 1;
  max-height: 45px;
  flex-direction: column;
  position: sticky;
  top: 0;
  margin: 0 0.5em 0.5em;
  z-index: 99;
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

const PanelColumn = styled.div`
  display: flex;
  flex-direction: column;
`

class RequisitionCard extends Component {
  handleSelectCurrentRequisition = () => {
    const { handleSelectCurrentRequisition, index } = this.props;
    handleSelectCurrentRequisition(index);
  };

  render() {
    const { requisition, currentRequisition, index } = this.props;
    return (
        <StyledPanel
            shaded
            isSelected={currentRequisition === index}
            onClick={this.handleSelectCurrentRequisition}
        >
            <PanelColumn>
                <b>#{requisition.serial_number} - {requisition.brief.name}</b>
                <p>{requisition.status}</p>
            </PanelColumn>
        </StyledPanel>
    );
  }
}

export default class RequisitionsList extends Component {

  handleAddBriefDraft = () => {
    const { addBriefDraft, getPickerData } = this.props;
    getPickerData();
    addBriefDraft();
  };

  render() {
    const { requisitions, currentRequisition} = this.props;
    return (
      <Column>
        <List>
          {(!requisitions || requisitions.length < 1) && (
            <MessageLabel>No Requisitions</MessageLabel>
          )}
          {requisitions &&
            requisitions.length > 0 &&
            requisitions.map((requisition, index) => (
              <RequisitionCard
                {...this.props}
                index={index}
                currentRequisition={currentRequisition}
                requisition={requisition}
              />
            ))}
        </List>
      </Column>
    );
  }
}

RequisitionsList.propTypes = {
  clients: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
