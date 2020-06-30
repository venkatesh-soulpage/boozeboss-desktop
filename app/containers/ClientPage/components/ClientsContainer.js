import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ClientList from './ClientList';
import ClientInfo from './ClientInfo';
import {Loader} from 'rsuite';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justify || 'flex-start'};
    margin: 2em 2em 0 2em;
    flex: 1;
`;

export default class ClientsContainer extends Component {

    state = {
        currentClient: 0,
    }

  handleSelectCurrentClient = currentClient => {
        this.setState({currentClient})
    }

    getFilteredClients = () => {
        const {clients, organizationFilter} = this.props;
        if (!clients) return [];

        if (!organizationFilter) return clients;

        if (organizationFilter === 'NO_ORG') {
            return clients.filter(client => !client.regional_organization_id);
        } 
        if (organizationFilter > 0) {
            return clients.filter(client => client.regional_organization_id === organizationFilter);
        }

        return clients;
    } 

  render() {
    const { isLoading, clients } = this.props;
    const filtered_clients = this.getFilteredClients();
    return (
        <React.Fragment>
            {isLoading && !clients && <StyledContainer justify="center"><Loader size="md" vertical /></StyledContainer>}
            {clients && (
                <StyledContainer>
                    <ClientList
                        {...this.props} 
                        {...this.state}
                        clients={filtered_clients}
                        handleSelectCurrentClient={this.handleSelectCurrentClient}
                    />
                    <ClientInfo 
                        {...this.props} 
                        {...this.state}
                        clients={filtered_clients}
                    />
                </StyledContainer>
            )}
        </React.Fragment>       
        )
    }
}

ClientsContainer.propTypes = {};
