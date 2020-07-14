import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Table, Panel } from 'rsuite';
import ProductTransactions from './ProductTransactions';
import WarehouseRemoveStock from './WarehouseRemoveStock';
import RoleValidator from 'components/RoleValidator';

const {Column, HeaderCell, Cell } = Table;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldsRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1em 0 1em 0;
`;

const FieldLabelContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;


export default class InventoryTable extends Component {

    render() {
        const {warehouses, currentWarehouse} = this.props;
        return (
            <FieldContainer>
                { warehouses && warehouses[currentWarehouse].stocks && 
                    warehouses[currentWarehouse].stocks.length > 0 ? (
                    <Panel shaded style={{backgroundColor: 'white'}}>
                    <Table
                        data={warehouses[currentWarehouse].stocks}
                        autoHeight
                    >
                        <Column resizable width={300}>
                            <HeaderCell>
                                Product
                            </HeaderCell>
                            <Cell dataKey="name">
                                {rowData => rowData.product.name}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                Model
                            </HeaderCell>
                            <Cell dataKey="name">
                                {rowData => `${rowData.product.metric_amount}${rowData.product.metric}`}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                Quantity
                            </HeaderCell>
                            <Cell dataKey="quantity">
                                {rowData => rowData.quantity}
                            </Cell>
                        </Column>
                        <Column resizable width={150}>
                            <HeaderCell>
                                Transactions
                            </HeaderCell>
                            <Cell dataKey="quantity">
                                {rowData => <ProductTransactions {...this.props} warehouses={warehouses} currentWarehouse={currentWarehouse} transactions={rowData.transactions} quantity={rowData.quantity} product={rowData.product}/>}
                            </Cell>
                        </Column>
                        <Column resizable width={150}>
                            <HeaderCell>
                                Actions
                            </HeaderCell>
                            <Cell dataKey="quantity">
                                {rowData => (
                                    <React.Fragment>
                                        <RoleValidator
                                            {...this.props}
                                            scopes={['BRAND']}
                                            roles={['OWNER', 'WAREHOUSE_MANAGER']}
                                        >
                                            <WarehouseRemoveStock {...this.props} product={rowData.product}/>
                                        </RoleValidator>
                                    </React.Fragment>
                                )}
                            </Cell>
                        </Column>
                    </Table>
                    </Panel>
                ) : (
                    <p>No Stock</p>
                )}
            </FieldContainer>
        )
    }
}

InventoryTable.prototypes = {

}
