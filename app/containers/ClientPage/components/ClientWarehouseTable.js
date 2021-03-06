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


export default class ClientWarehouseTable extends Component {

    render() {
        const {warehouses} = this.props;
        return (
            <FieldContainer>
                <FieldLabelContainer> 
                    <FieldLabel>Warehouses</FieldLabel>
                </FieldLabelContainer>
                {warehouses && 
                    warehouses.length > 0 ? (
                    <Panel shaded style={{backgroundColor: 'white'}}>
                        <Table
                            data={warehouses}
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
                                    Address
                                </HeaderCell>
                                <Cell dataKey="address">
                                    {rowData => rowData.address}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Location
                                </HeaderCell>
                                <Cell dataKey="address">
                                    {rowData => rowData.location.name}
                                </Cell>
                            </Column>
                        </Table>
                    </Panel>
                ) : (
                    <p>No Warehouses</p>
                )}
            </FieldContainer>
        )
    }
}

ClientWarehouseTable.prototypes = {

}
