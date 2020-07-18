import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BriefsList from './BriefsList';
import BriefsInfo from './BriefsInfo';
import { Loader, Message } from 'rsuite';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2em 2em 0 2em;
    justify-content: ${props => props.justify || 'flex-start'};
`;

const NoDataContainer = styled.div`
    display: flex; 
    flex-direction: column;
`

export default class BriefsContainer extends Component {

    state = {
        currentBrief: 0,
        agenciesData: null,
    }

    getCurrentBrief = (brief_id) => {
        const {briefs} = this.props;
        const briefs_index = briefs.map(brief => brief.id);
        const currentBrief = briefs_index.indexOf(brief_id);

        if (currentBrief > -1) {
            this.setState({currentBrief});
        }
    }

    componentDidMount = () => {
        const {history, briefs} = this.props;
        const {location} = history;

        if (location.brief_id) {
            if (briefs) {
                this.getCurrentBrief(location.brief_id);
            } else {
                setTimeout(() => {
                    this.getCurrentBrief(location.brief_i);
                }, 500)
            }
        }
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
            {briefs && briefs.length < 1 && (
                <NoDataContainer>
                    <Message type="info" description="You dont have any current briefs. If you are a team collaborator you can start adding it with the button below."/>
                </NoDataContainer>
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
