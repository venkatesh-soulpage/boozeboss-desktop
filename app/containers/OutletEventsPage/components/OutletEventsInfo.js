import React, { Component } from 'react';
import styled from 'styled-components';

import OutletEventsForm from './OutletEventsForm';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  margin: 0 2em 2em 2em;
`;

const ClientsLabel = styled.p`
  font-size: 1.25em;
`;

export default class OutletEventsInfo extends Component {
  state = {};

  render() {
    const { outletevents } = this.props;
    let renderData;
    if (outletevents && outletevents.length > 0)
      renderData = (
        <React.Fragment>
          <OutletEventsForm {...this.props} />
        </React.Fragment>
      );

    return (
      <InfoContainer>
        {(!outletevents || outletevents.length < 1) && (
          <ClientsLabel>No Events</ClientsLabel>
        )}
        {outletevents && outletevents.length > 0 && renderData}
      </InfoContainer>
    );
  }
}

OutletEventsInfo.propTypes = {};
