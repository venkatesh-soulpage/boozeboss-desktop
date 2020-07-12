import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AgencyList from './AgencyList';
import AgencyInfo from './AgencyInfo';
import {Loader} from 'rsuite';


const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2em 2em 0 2em;
    justify-content: ${props => props.justify || 'flex-start'};
`;

export default class AgenciesContainer extends Component {

    state = {
        currentAgency: 0,
    }

    handleSelectCurrentAgency = currentAgency => {
        this.setState({currentAgency})
    }

  render() {
    const {isLoading, agencies} = this.props;
    return (
        <React.Fragment>
            {isLoading && !agencies && <StyledContainer justify="center"><Loader size="md" /></StyledContainer>}
            {agencies && (
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
            )}
        </React.Fragment>
        )
    }
}

AgenciesContainer.propTypes = {};
