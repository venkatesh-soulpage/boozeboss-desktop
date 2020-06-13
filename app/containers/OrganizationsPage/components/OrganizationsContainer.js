import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OrganizationsList from './OrganizationsList';
import OrganizationsInfo from './OrganizationInfo';
import {Loader} from 'rsuite';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justify || 'flex-start'};
    margin: 2em 2em 0 2em;
    flex: 1;
`;

export default class OrganizationsContainer extends Component {

    state = {
        currentOrganization: 0,
    }

  handleSelectCurrentOrganization = currentOrganization => {
        this.setState({currentOrganization})
    }

  render() {
    const { isLoading, organizations } = this.props;
    return (
        <React.Fragment>
            {isLoading && !organizations && <StyledContainer justify="center"><Loader size="md" vertical /></StyledContainer>}
            {organizations && (
                <StyledContainer>
                    <OrganizationsList
                        {...this.props} 
                        {...this.state}
                        handleSelectCurrentOrganization={this.handleSelectCurrentOrganization}
                    />
                    <OrganizationsInfo 
                        {...this.props} 
                        {...this.state}
                    />
                </StyledContainer>
            )}
        </React.Fragment>       
        )
    }
}

OrganizationsContainer.propTypes = {};
