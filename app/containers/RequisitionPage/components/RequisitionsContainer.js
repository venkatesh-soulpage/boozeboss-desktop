import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RequisitionsList from './RequisitionsList';
import RequisitionInfo from './RequisitionInfo';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2em 2em 0 2em;
`;

export default class RequisitionsContainer extends Component {

    state = {
        currentRequisition: 0,
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
    return (
            <StyledContainer>
                <RequisitionsList
                    {...this.props} 
                    {...this.state}
                    handleSelectCurrentBrief={this.handleSelectCurrentBrief}
                    getPickerData={this.getPickerData}
                />
                <RequisitionInfo 
                    {...this.props} 
                    {...this.state}
                    handleSelectCurrentBrief={this.handleSelectCurrentBrief}
                /> 
            </StyledContainer>
        )
    }
}

RequisitionsContainer.propTypes = {};
