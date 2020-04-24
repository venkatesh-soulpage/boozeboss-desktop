import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel } from 'rsuite';
import moment from 'moment';
import RoleValidator from 'components/RoleValidator';

import { Button } from 'rsuite';

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start; 
  position: sticky;
  top: 0;
  bottom: 0;
  height: 85vh;
  overflow-y: auto;
`;

const AddSection = styled.div`
  display: flex;
  flex: 1;
  max-height: 45px;
  flex-direction: column;
  position: sticky;
  top: 0;
  margin: 0 0.5em 0.5em;
  z-index: 99;
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0.5em 0.5em 0.5em;
`;

const MessageLabel = styled.p`
  font-family: Roboto;
  font-size: 1.25em;
  margin: 1em;
`;

const StyledPanel = styled(Panel)`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0.5em 0 0.5em 0;

  ${props => props.isSelected && 'background-color: #E8E8E8;'} &:hover {
    cursor: pointer;
    opacity: 0.75;
  }
`;

const PanelColumn = styled.div`
  display: flex;
  flex-direction: column;
`

class WarehouseContainer extends Component {
  handleSelectCurrentWarehouse = () => {
    const { handleSelectCurrentWarehouse, index } = this.props;
    handleSelectCurrentWarehouse(index);
  };

  render() {
    const { warehouse, currentWarehouse, index } = this.props;
    return (
      <StyledPanel
        shaded
        isSelected={currentWarehouse === index}
        onClick={this.handleSelectCurrentWarehouse}
      >
        <PanelColumn>
          <b>{warehouse.name}</b>
          <p>{warehouse.location.name}</p>
        </PanelColumn>
      </StyledPanel>
    );
  }
}

export default class WarehousesList extends Component {

  render() {
    const { warehouses, currentWarehouse} = this.props;
    return (
      <Column>
        <List>
          {(!warehouses || warehouses.length < 1) && (
            <MessageLabel>No warehouses registered</MessageLabel>
          )}
          {warehouses &&
            warehouses.length > 0 &&
            warehouses.map((warehouse, index) => (
              <WarehouseContainer
                {...this.props}
                index={index}
                currentWarehouse={currentWarehouse}
                warehouse={warehouse}
              />
            ))}
        </List>
      </Column>
    );
  }
}

WarehousesList.propTypes = {
  warehouses: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
