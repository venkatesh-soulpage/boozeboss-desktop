import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WarehousesList from './WarehousesList';
import WarehousesInfo from './WarehousesInfo';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2em 2em 0 2em;
`;

export default class WarehousesContainer extends Component {

    state = {
        currentWarehouse: 0,
    }

    handleSelectCurrentWarehouse = currentWarehouse => {
        this.setState({currentWarehouse})
    }

  render() {
    return (
            <StyledContainer>
                <WarehousesList
                    {...this.props} 
                    {...this.state}
                    handleSelectCurrentWarehouse={this.handleSelectCurrentWarehouse}
                />
                <WarehousesInfo 
                    {...this.props} 
                    {...this.state}
                    handleSelectCurrentBrief={this.handleSelectCurrentBrief}
                />
            </StyledContainer>
        )
    }
}

WarehousesContainer.propTypes = {};
