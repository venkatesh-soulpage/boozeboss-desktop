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

  render() {
    const { isLoading, clients } = this.props;
    return (
        <React.Fragment>
            {isLoading && !clients && <StyledContainer justify="center"><Loader size="md" vertical /></StyledContainer>}
            {clients && (
                <StyledContainer>
                    <ClientList
                        {...this.props} 
                        {...this.state}
                        handleSelectCurrentClient={this.handleSelectCurrentClient}
                    />
                    <ClientInfo 
                        {...this.props} 
                        {...this.state}
                    />
                </StyledContainer>
            )}
        </React.Fragment>       
        )
    }
}

ClientsContainer.propTypes = {};
