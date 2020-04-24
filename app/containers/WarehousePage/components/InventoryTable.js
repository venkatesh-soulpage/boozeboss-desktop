import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Table } from 'rsuite';
import ProductTransactions from './ProductTransactions';
import WarehouseRemoveStock from './WarehouseRemoveStock';

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
                    <Table
                        data={warehouses[currentWarehouse].stocks}
                    >
                        <Column resizable width={150}>
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
                                {rowData => <ProductTransactions warehouses={warehouses} currentWarehouse={currentWarehouse} transactions={rowData.transactions} product={rowData.product}/>}
                            </Cell>
                        </Column>
                        <Column resizable width={150}>
                            <HeaderCell>
                                Actions
                            </HeaderCell>
                            <Cell dataKey="quantity">
                                {rowData => <WarehouseRemoveStock {...this.props} product={rowData.product}/>}
                            </Cell>
                        </Column>
                    </Table>
                ) : (
                    <p>No Stock</p>
                )}
            </FieldContainer>
        )
    }
}

InventoryTable.prototypes = {

}
