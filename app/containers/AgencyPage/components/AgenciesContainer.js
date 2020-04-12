import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AgencyList from './AgencyList';
import AgencyInfo from './AgencyInfo';


const StyledContainer = styled.div`
  display: flex;
    flex-direction: row;
  margin: 2em 2em 0 2em;
`;

export default class AgenciesContainer extends Component {

    state = {
        currentAgency: 0,
    }

    handleSelectCurrentAgency = currentAgency => {
        this.setState({currentAgency})
    }

  render() {
    return (
            <StyledContainer>
                <AgencyList
                    {...this.props} 
                    {...this.state}
                    handleSelectCurrentAgency={this.handleSelectCurrentAgency}
                />
                <AgencyInfo 
                    {...this.props} 
                    {...this.state}
                />
            </StyledContainer>
        )
    }
}

AgenciesContainer.propTypes = {};
