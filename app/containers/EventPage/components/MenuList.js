import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Table } from 'rsuite';
import MenuAddProduct from './MenuAddProduct';

const {Column, HeaderCell, Cell } = Table;

const FieldsRow = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-wrap: wrap;
    ${props => props.isHeader && 'justify-content: space-between;'}
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin ${props => props.margin ? props.margin : '0 0em 0 1em'};
`

const FieldLabel = styled.b`
    
`

const TableContainer = styled.div`
`

export default class MenuList extends Component {

    /* handleResendEmail = (event_guest_id) => {
        this.props.resendEmail(event_guest_id);
    }

    handleDelete = (event_guest_id) => {
        this.props.deleteGuest(event_guest_id);
    } */

    render() {
        const {event} = this.props;
        return (
            <React.Fragment>
                <FieldsRow>
                    {event && event.event && event.event.products && (
                        <FieldContainer margin='0'>
                            <FieldLabel>
                                Menu ({event.event.products.length})
                            </FieldLabel>
                        </FieldContainer>
                    )}
                    <FieldsRow>
                        <FieldContainer />
                        <FieldContainer>
                            <FieldsRow>
                                <FieldContainer />
                                <FieldContainer>
                                    <MenuAddProduct 
                                        {...this.props}
                                    />
                                </FieldContainer>
                            </FieldsRow>
                        </FieldContainer>
                    </FieldsRow>
                </FieldsRow> 
                <TableContainer>
                {event && event.event && event.event.products && 
                        event.event.products.length > 0 ? (
                            <Table
                                data={event.event.products}
                                style={{margin: '1em 0 0 0'}}
                                autoHeight
                            >
                                <Column flexGrow>
                                    <HeaderCell>
                                        Product
                                    </HeaderCell>
                                    <Cell dataKey="product">
                                        {rowData => rowData.product.name}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Size
                                    </HeaderCell>
                                    <Cell dataKey="product">
                                        {rowData => `${rowData.product.metric_amount}${rowData.product.metric}`}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Price
                                    </HeaderCell>
                                    <Cell dataKey="price">
                                        {rowData => rowData.price}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Active
                                    </HeaderCell>
                                    <Cell dataKey="active">
                                        {rowData => rowData.active ? 'YES' : 'NO'}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Actions
                                    </HeaderCell>
                                    <Cell dataKey="actions">
                                        
                                    </Cell>
                                </Column>
                            </Table>
                        ): (
                            <FieldContainer>
                                No Menu
                            </FieldContainer>
                        )}
                    </TableContainer>
            </React.Fragment>
        )
    }
}
