import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Table, Panel } from 'rsuite';

const {Column, HeaderCell, Cell } = Table;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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


export default class ClientBrandsTable extends Component {

    render() {
        const {brands} = this.props;
        return (
            <FieldContainer>
                <FieldLabelContainer> 
                    <FieldLabel>Brands</FieldLabel>
                </FieldLabelContainer>
                {brands && 
                    brands.length > 0 ? (
                    <Panel shaded style={{backgroundColor: 'white'}}>
                        <Table
                            data={brands}
                        >
                            <Column flexGrow>
                                <HeaderCell>
                                    Name
                                </HeaderCell>
                                <Cell dataKey="name">
                                    {rowData => rowData.name}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Category
                                </HeaderCell>
                                <Cell dataKey="product_type">
                                    {rowData => rowData.product_type}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Sub-Category
                                </HeaderCell>
                                <Cell dataKey="product_type">
                                    {rowData => rowData.product_subtype}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Description
                                </HeaderCell>
                                <Cell dataKey="description">
                                    {rowData => rowData.description}
                                </Cell>
                            </Column>
                        </Table>
                    </Panel>
                ) : (
                    <p>No Brands</p>
                )}
            </FieldContainer>
        )
    }
}

ClientBrandsTable.prototypes = {

}
