import React, { Component } from 'react';
import styled from 'styled-components';

import OutletVenuesForm from './OutletVenuesForm';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  margin: 0 2em 2em 2em;
`;

const ClientsLabel = styled.p`
  font-size: 1.25em;
`;

export default class OutletVenuesInfo extends Component {
  state = {};

  render() {
    const { outletvenues } = this.props;
    let renderData;
    if (outletvenues && outletvenues.length > 0)
      renderData = (
        <React.Fragment>
          <OutletVenuesForm {...this.props} />
        </React.Fragment>
      );

    return (
      <InfoContainer>
        {(!outletvenues || outletvenues.length < 1) && (
          <ClientsLabel>No Venues</ClientsLabel>
        )}
        {outletvenues && outletvenues.length > 0 && renderData}
      </InfoContainer>
    );
  }
}

OutletVenuesInfo.propTypes = {};
