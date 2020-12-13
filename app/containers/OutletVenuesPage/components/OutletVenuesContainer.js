import React, { Component } from 'react';
import styled from 'styled-components';

import { Loader } from 'rsuite';

import OutletVenuesList from './OutletVenuesList';

import OutletVenuesInfo from './OutletVenuesInfo';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'};
  margin: 2em 2em 0 2em;
  flex: 1;
`;

export default class OutletVenuesContainer extends Component {
  state = {
    currentOutletVenue: 0,
  };

  handleSelectCurrentOutletVenue = currentOutletVenue => {
    this.setState({ currentOutletVenue });
  };

  render() {
    const { isLoading, outletvenues } = this.props;
    const renderLoader = (
      <StyledContainer justify="center">
        <Loader size="md" vertical />
      </StyledContainer>
    );
    return (
      <React.Fragment>
        {isLoading && !outletvenues && renderLoader}
        {outletvenues && (
          <StyledContainer>
            <OutletVenuesList
              {...this.props}
              {...this.state}
              handleSelectCurrentOutletVenue={
                this.handleSelectCurrentOutletVenue
              }
            />
            <OutletVenuesInfo {...this.props} {...this.state} />
          </StyledContainer>
        )}
      </React.Fragment>
    );
  }
}

OutletVenuesContainer.propTypes = {};
