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

export default class OutletVenuesDetailContainer extends Component {
  handleSelectCurrentOutletVenue = () => {
    const { handleSelectCurrentOutletVenue, index } = this.props;
    handleSelectCurrentOutletVenue(index);
  };

  render() {
    const { outletvenue, currentOutletVenue, index } = this.props;
    return (
      /*
        Events List will be rendered on left side
        */
      <React.Fragment>
        {outletvenue.isDraft ? (
          <StyledPanel
            shaded
            isSelected={currentOutletVenue === index}
            onClick={this.handleSelectCurrentOutletVenue}
          >
            <b>New Venue</b>
            <p>Editing...</p>
          </StyledPanel>
        ) : (
          <StyledPanel
            shaded
            isSelected={currentOutletVenue === index}
            onClick={this.handleSelectCurrentOutletVenue}
          >
            <StyledRow>
              <StyledColumn>
                <b>{outletvenue.name}</b>
              </StyledColumn>
            </StyledRow>
          </StyledPanel>
        )}
      </React.Fragment>
    );
  }
}

OutletVenuesDetailContainer.propTypes = {
  outletvenue: PropTypes.object,
  currentOutletVenue: PropTypes.object,
  handleSelectCurrentOutletVenue: PropTypes.func,
  index: PropTypes.number,
};
