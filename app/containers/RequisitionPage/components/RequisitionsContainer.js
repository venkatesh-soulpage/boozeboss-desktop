import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RequisitionsList from './RequisitionsList';
import RequisitionInfo from './RequisitionInfo';
import moment from 'moment';

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

    getCurrentRequisition = (requisition_id) => {
        const {requisitions} = this.props;
        const requisitions_index = requisitions.map(req => req.id);
        const currentRequisition = requisitions_index.indexOf(requisition_id);

        if (currentRequisition > -1) {
            this.setState({currentRequisition});
        }
    }

    componentDidMount = () => {
        const {history, requistions} = this.props;
        const {location} = history;

        if (location.requisition_id) {
            if (requistions) {
                this.getCurrentRequisition(location.requisition_id);
            } else {
                setTimeout(() => {
                    this.getCurrentRequisition(location.requisition_id);
                }, 500)
            }
        }
    }

    handleSelectCurrentRequisition = currentRequisition => {
        this.setState({currentRequisition})
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
                    handleSelectCurrentRequisition={this.handleSelectCurrentRequisition}
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
