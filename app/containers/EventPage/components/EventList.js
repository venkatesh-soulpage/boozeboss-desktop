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
  height: calc(100vh - 45px);
  overflow-y: auto;
`;

const AddSection = styled.div`
  display: flex;
  flex: 1;
  max-height: 15px;
  flex-direction: column;
  position: sticky;
  top: 0;
  margin: 1em 0.5em 0.5em;
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

class EventContainer extends Component {
  handleSelectCurrentEvent = () => {
    const { handleSelectCurrentEvent, index } = this.props;
    handleSelectCurrentEvent(index);
  };

  render() {
    const { event, currentEvent, index } = this.props;
    return (
      <React.Fragment>
        <StyledPanel
            shaded
            isSelected={currentEvent === index}
            onClick={this.handleSelectCurrentEvent}
          >
            <PanelColumn>
              <b>{event.name}</b>
              <p>{event.created_at && moment(event.start_time).format('DD/MM/YYYY LT')}</p>
            </PanelColumn>
          </StyledPanel>
      </React.Fragment>
    );
  }
}

export default class EventList extends Component {

  /* handleAddBriefDraft = () => {
    const { addBriefDraft, getPickerData } = this.props;
    getPickerData();
    addBriefDraft();
  }; */

  render() {
    const { events, currentEvent} = this.props;
    return (
      <Column>
        <AddSection>
            <b>Upcoming Events</b>
        </AddSection>
        <List>
          {(!events || events.length < 1) && (
            <MessageLabel>No Upcoming events</MessageLabel>
          )}
          {events &&
            events.length > 0 &&
            events.map((event, index) => (
              <EventContainer
                {...this.props}
                index={index}
                currentEvent={currentEvent}
                event={event}
              />
            ))}
        </List>
      </Column>
    );
  }
}

EventList.propTypes = {
  // clients: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
