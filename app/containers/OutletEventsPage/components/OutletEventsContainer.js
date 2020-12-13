import React, { Component } from 'react';
import styled from 'styled-components';

import { Loader } from 'rsuite';

import OutletEventsList from './OutletEventsList';

import OutletEventsInfo from './OutletEventsInfo';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'};
  margin: 2em 2em 0 2em;
  flex: 1;
`;

export default class OutletEventsContainer extends Component {
  state = {
    currentOutletEvent: 0,
  };

  handleSelectCurrentOutletEvent = currentOutletEvent => {
    this.setState({ currentOutletEvent });
  };

  render() {
    const { isLoading, outletevents } = this.props;
    const renderLoader = (
      <StyledContainer justify="center">
        <Loader size="md" vertical />
      </StyledContainer>
    );
    return (
      <React.Fragment>
        {isLoading && !outletevents && renderLoader}
        {outletevents && (
          <StyledContainer>
            <OutletEventsList
              {...this.props}
              {...this.state}
              handleSelectCurrentOutletEvent={
                this.handleSelectCurrentOutletEvent
              }
            />
            <OutletEventsInfo {...this.props} {...this.state} />
          </StyledContainer>
        )}
      </React.Fragment>
    );
  }
}

OutletEventsContainer.propTypes = {};
