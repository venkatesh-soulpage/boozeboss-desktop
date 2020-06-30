import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider,IconButton, Icon, SelectPicker } from 'rsuite';
import moment from 'moment';
import InventoryTable from './InventoryTable';
import WarehouseAddStock from './WarehouseAddStock';

const { Column, HeaderCell, Cell } = Table;

const InfoContainer = styled.div`
  display: flex;
    flex-direction: column;
    flex: 3;
    margin: 0 2em 2em 2em;
`;

const ClientsLabel = styled.p`
  font-size: 1.25em;
`;
const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldsRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const FieldLabelContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const StyledMessage = styled(Message)`
    margin: 0 0 1em 0;
`

const ActionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export default class WarehousesInfo extends Component {

    handleDelete = async () => {
        const {deleteBrief, briefs, currentBrief, handleSelectCurrentBrief} = this.props;
        // If is the last on the list
        const isLast = briefs.length === 1;
        if (((currentBrief + 1) >= briefs.length) && !isLast) {
            await handleSelectCurrentBrief(currentBrief - 1);
        }
        await deleteBrief(briefs[currentBrief].id);
    }

  render() {
    const { warehouses, currentWarehouse, error, success, dismiss } = this.props;
        return (
            <InfoContainer>
                {/* {error && <StyledMessage showIcon closable type="error" description={error} onClose={() => dismiss('error')}/>}
                {success && <StyledMessage showIcon closable type="success" description={success} onClose={() => dismiss('success')} />} */}
                {(!warehouses || warehouses.length < 1) && <ClientsLabel>No Warehouses</ClientsLabel> }
                {warehouses &&
                    warehouses.length > 0 && (
                        <Panel bordered>
                            <DataContainer>
                                <FieldContainer>
                                    <FieldsRow>
                                        <FieldLabel>Inventory</FieldLabel>
                                        <WarehouseAddStock 
                                            {...this.props}
                                            currentWarehouse={currentWarehouse}
                                        />
                                    </FieldsRow>
                                    <Divider />
                                    <InventoryTable 
                                        {...this.props}
                                        currentWarehouse={currentWarehouse}
                                    />
                                </FieldContainer>
                            </ DataContainer>
                        </Panel>
                )}
            </InfoContainer>
    );
  }
}

WarehousesInfo.propTypes = {
};
