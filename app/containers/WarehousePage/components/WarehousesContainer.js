import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, Icon } from 'rsuite';
import WarehousesList from './WarehousesList';
import WarehousesInfo from './WarehousesInfo';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2em 2em 0 2em;
`;

const NoDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 2em 0 0 0;
`

export default class WarehousesContainer extends Component {

    state = {
        currentWarehouse: 0,
    }

    handleSelectCurrentWarehouse = currentWarehouse => {
        this.setState({currentWarehouse})
    }

  render() {
    const {currentWarehouse, warehouses} = this.props;
    return (
        <React.Fragment>
            {warehouses && warehouses.length < 1 && (
                <Message type="info" description="You don't have any warehouses on this location. To start adding them go to your team page." />
            )}
            {warehouses && warehouses.length < 1 && (
                <NoDataContainer>
                    <Icon icon="truck" size="3x"/>
                    <h4>No Warehouses</h4>
                </NoDataContainer>
            )}

            {warehouses && warehouses.length > 0 && (
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
            )}
            
        </React.Fragment>
        )
    }
}

WarehousesContainer.propTypes = {};
