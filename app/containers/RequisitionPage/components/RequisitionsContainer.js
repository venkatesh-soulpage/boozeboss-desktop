import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RequisitionsList from './RequisitionsList';
import RequisitionInfo from './RequisitionInfo';
import moment from 'moment';
import { Loader, Message } from 'rsuite';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2em 2em 0 2em;
    justify-content: ${props => props.justify || 'flex-start'};
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
    const {isLoading, requisitions} = this.props;
    return (
        <React.Fragment>
            {!requisitions && isLoading && (
                <StyledContainer justify="center">
                    <Loader size="md" />
                </StyledContainer>
            )}
            {requisitions && requisitions.length < 1 && (
                <Message type="info" description="You dont have any current requisitions. If you are an agency collaborator you can start creating them by doing click on 'Create Requisition' on a SUBMITTED Brief. " />
            )}
            { requisitions && (
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
            )}
            
        </React.Fragment>
            
        )
    }
}

RequisitionsContainer.propTypes = {};
