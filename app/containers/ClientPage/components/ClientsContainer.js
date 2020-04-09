import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ClientList from './ClientList';
import ClientInfo from './ClientInfo';

const StyledContainer = styled.div`
  display: flex;
    flex-direction: row;
  margin: 2em 2em 0 2em;
`;

export default class ClientsContainer extends Component {

    state = {
        currentClient: 0,
    }

  handleSelectCurrentClient = currentClient => {
        this.setState({currentClient})
    }

  render() {
    return (
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
        )
    }
}

ClientsContainer.propTypes = {};
