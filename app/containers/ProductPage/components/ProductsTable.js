import React, { Component } from 'react'
import styled from 'styled-components';
import {Table} from 'rsuite';

const { Column, HeaderCell, Cell} = Table;

const StyledTableSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
`


export default class ProductsTable extends Component {
    render() {
        const {products} = this.props;
        return (
            <StyledTableSection>
                {products && products.length > 0 ? (
                    <Table
                        data={products}
                        autoHeight
                    >
                        <Column width={150} resizable>
                            <HeaderCell>
                                Type
                            </HeaderCell>
                            <Cell dataKey="type">
                                {rowData => rowData.is_cocktail ? 'Cocktail' : 'Product'}
                            </Cell>
                        </Column>
                        <Column width={150} resizable>
                            <HeaderCell>
                                Name
                            </HeaderCell>
                            <Cell dataKey="name">
                                {rowData => <b>{rowData.name}</b>}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                Brand
                            </HeaderCell>
                            <Cell dataKey="name">
                                {rowData => <a>{rowData.brand ? rowData.brand.name : 'N/A'}</a>}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                Description
                            </HeaderCell>
                            <Cell dataKey="description">
                                {rowData => rowData.description}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                Amount
                            </HeaderCell>
                            <Cell dataKey="metric_amount">
                                {rowData => rowData.metric_amount}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                Metric
                            </HeaderCell>
                            <Cell dataKey="metric">
                                {rowData => rowData.metric}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                SKU
                            </HeaderCell>
                            <Cell dataKey="sku">
                                {rowData => rowData.sku}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                Base Price
                            </HeaderCell>
                            <Cell dataKey="base_price">
                                {rowData => rowData.base_price}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                Actions
                            </HeaderCell>
                            <Cell dataKey="base_price">
                                <p>Edit | Delete</p>
                            </Cell>
                        </Column>
                    </Table>
                ) : (
                    <p>No products</p>
                )}
            </StyledTableSection>
        )
    }
}
