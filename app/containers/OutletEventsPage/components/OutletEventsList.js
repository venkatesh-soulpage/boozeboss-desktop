import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RoleValidator from 'components/RoleValidator';

import { Button } from 'rsuite';
import OutletEventsDetailContainer from './OutletEventsDetailContainer';

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

export default class OutletEventsList extends Component {
  handleAddOutletEventDraft = () => {
    const { addOutletEventDraft, handleSelectCurrentOutletEvent } = this.props;
    addOutletEventDraft();
    handleSelectCurrentOutletEvent(0);
  };

  render() {
    const { outletevents, currentOutletEvent } = this.props;
    const isActiveDraft =
      outletevents &&
      outletevents.length > 0 &&
      outletevents.filter(outletevent => outletevent.isDraft).length > 0;

    return (
      <Column>
        <RoleValidator {...this.props} scopes={['OUTLET']} roles={['MANAGER']}>
          <Button
            color="green"
            onClick={this.handleAddOutletEventDraft}
            disabled={isActiveDraft}
          >
            + Add Event
          </Button>
        </RoleValidator>
        <List>
          {(!outletevents || outletevents.length < 1) && (
            <MessageLabel>No Current Events</MessageLabel>
          )}
          {outletevents &&
            outletevents.length > 0 &&
            outletevents.map((outletevent, index) => (
              <OutletEventsDetailContainer
                {...this.props}
                index={index}
                currentOutletEvent={currentOutletEvent}
                outletevent={outletevent}
              />
            ))}
        </List>
      </Column>
    );
  }
}

OutletEventsList.propTypes = {
  outletevents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
