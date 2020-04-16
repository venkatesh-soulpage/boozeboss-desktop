import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BriefsList from './BriefsList';
import BriefsInfo from './BriefsInfo';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2em 2em 0 2em;
`;

export default class BriefsContainer extends Component {

    state = {
        currentBrief: 0,
    }

  handleSelectCurrentBrief = currentBrief => {
        this.setState({currentBrief})
    }

  render() {
    return (
            <StyledContainer>
                <BriefsList
                    {...this.props} 
                    {...this.state}
                    handleSelectCurrentBrief={this.handleSelectCurrentBrief}
                />
                <BriefsInfo 
                    {...this.props} 
                    {...this.state}
                /> 
            </StyledContainer>
        )
    }
}

BriefsContainer.propTypes = {};
