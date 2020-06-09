import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BriefsList from './BriefsList';
import BriefsInfo from './BriefsInfo';
import { Loader } from 'rsuite';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2em 2em 0 2em;
    justify-content: ${props => props.justify || 'flex-start'};
`;

export default class BriefsContainer extends Component {

    state = {
        currentBrief: 0,
        agenciesData: null,
    }

    handleSelectCurrentBrief = currentBrief => {
        this.setState({currentBrief})
    }

    getPickerData = ()  => {
        const {agencies} = this.props;
        if (!agencies) return [];
        const agenciesData = agencies.map(agency => {
            return {
                label: agency.name,
                value: agency.id,
                role: agency.name,
            }
        })
        this.setState({agenciesData});
    }

  render() {
    const {isLoading, briefs} = this.props;
    return (
        <React.Fragment>
            {!briefs && isLoading && (
                <StyledContainer justify="center">
                    <Loader size="md" />
                </StyledContainer>
            )}
            {briefs && (
                <StyledContainer>
                    <BriefsList
                        {...this.props} 
                        {...this.state}
                        handleSelectCurrentBrief={this.handleSelectCurrentBrief}
                        getPickerData={this.getPickerData}
                    />
                    <BriefsInfo 
                        {...this.props} 
                        {...this.state}
                        handleSelectCurrentBrief={this.handleSelectCurrentBrief}
                    /> 
                </StyledContainer>
            )}
            
        </React.Fragment>
        )
    }
}

BriefsContainer.propTypes = {};
