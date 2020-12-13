import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RoleValidator from 'components/RoleValidator';

import { Button } from 'rsuite';
import OutletVenuesDetailContainer from './OutletVenuesDetailContainer';

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

export default class OutletVenuesList extends Component {
  handleAddOutletVenueDraft = () => {
    const { addOutletVenueDraft, handleSelectCurrentOutletVenue } = this.props;
    addOutletVenueDraft();
    handleSelectCurrentOutletVenue(0);
  };

  render() {
    const { outletvenues, currentOutletVenue } = this.props;
    const isActiveDraft =
      outletvenues &&
      outletvenues.length > 0 &&
      outletvenues.filter(outletvenue => outletvenue.isDraft).length > 0;

    return (
      <Column>
        <RoleValidator {...this.props} scopes={['OUTLET']} roles={['MANAGER']}>
          <Button
            color="green"
            onClick={this.handleAddOutletVenueDraft}
            disabled={isActiveDraft}
          >
            + Add Venue
          </Button>
        </RoleValidator>
        <List>
          {(!outletvenues || outletvenues.length < 1) && (
            <MessageLabel>No Current Venues</MessageLabel>
          )}
          {outletvenues &&
            outletvenues.length > 0 &&
            outletvenues.map((outletvenue, index) => (
              <OutletVenuesDetailContainer
                {...this.props}
                index={index}
                currentOutletVenue={currentOutletVenue}
                outletvenue={outletvenue}
              />
            ))}
        </List>
      </Column>
    );
  }
}

OutletVenuesList.propTypes = {
  outletvenues: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
