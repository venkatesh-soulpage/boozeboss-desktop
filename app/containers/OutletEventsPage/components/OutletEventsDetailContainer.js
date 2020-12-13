import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Panel } from 'rsuite';

const StyledPanel = styled(Panel)`
  width: 100%;
  margin: 0.5em 0 0 0.5em;

  ${props => props.isSelected && 'background-color: #E8E8E8;'} &:hover {
    cursor: pointer;
    opacity: 0.75;
  }
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'};
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-content: ${props => props.align || 'flex-start'};
`;

export default class OutletEventsDetailContainer extends Component {
  handleSelectCurrentOutletEvent = () => {
    const { handleSelectCurrentOutletEvent, index } = this.props;
    handleSelectCurrentOutletEvent(index);
  };

  render() {
    const { outletevent, currentOutletEvent, index } = this.props;
    return (
      /*
        Events List will be rendered on left side
        */
      <React.Fragment>
        {outletevent.isDraft ? (
          <StyledPanel
            shaded
            isSelected={currentOutletEvent === index}
            onClick={this.handleSelectCurrentOutletEvent}
          >
            <b>New Event</b>
            <p>Editing...</p>
          </StyledPanel>
        ) : (
          <StyledPanel
            shaded
            isSelected={currentOutletEvent === index}
            onClick={this.handleSelectCurrentOutletEvent}
          >
            <StyledRow>
              <StyledColumn>
                <b>{outletevent.name}</b>
              </StyledColumn>
            </StyledRow>
          </StyledPanel>
        )}
      </React.Fragment>
    );
  }
}

OutletEventsDetailContainer.propTypes = {
  outletevent: PropTypes.object,
  currentOutletEvent: PropTypes.object,
  handleSelectCurrentOutletEvent: PropTypes.func,
  index: PropTypes.number,
};
