import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Table, Icon, Panel } from 'rsuite';
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
    margin ${props => props.margin ? props.margin : '0 0em 0 0em'};
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

    handleRemove = (event_product_id) => {
        const {removeEventProduct, event} = this.props;
        removeEventProduct(event.event.id, event_product_id);
    }

    handleSelectAsFree = (event_product_id) => {
        const {selectAsFree, event} = this.props;
        selectAsFree(event.event.id, event_product_id);
    }

    render() {
        const {event, user} = this.props;
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
                    {event && event.event.started_at && event.event.started_at && new Date(event.event.started_at).getTime() >= new Date().getTime() && (
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
                    )}
                </FieldsRow> 
                <TableContainer>
                {event && event.event && event.event.products && 
                        event.event.products.length > 0 ? (
                            <Panel shaded style={{backgroundColor: 'white', margin: '1em 0 0 0'}}>
                            <Table
                                data={event.event.products.sort((a,b) => a.id - b.id)}
                                style={{margin: '1em 0 0 0'}}
                                autoHeight
                            >
                                <Column resizable width={300}>
                                    <HeaderCell>
                                        Product
                                    </HeaderCell>
                                    <Cell dataKey="product">
                                        {rowData => rowData.product.name}
                                    </Cell>
                                </Column>
                                <Column width={60}>
                                    <HeaderCell>
                                        Size
                                    </HeaderCell>
                                    <Cell dataKey="product">
                                        {rowData => `${rowData.product.metric_amount}${rowData.product.metric}`}
                                    </Cell>
                                </Column>
                                <Column width={100}>
                                    <HeaderCell>
                                        Price {user.location.currency}
                                    </HeaderCell>
                                    <Cell dataKey="price">
                                        {rowData => `${rowData.price} ${user.location.currency}`}
                                    </Cell>
                                </Column>
                                <Column width={100}>
                                    <HeaderCell>
                                        Coin Price
                                    </HeaderCell>
                                    <Cell dataKey="base">
                                        {rowData => <span>{Math.round(user.location.currency_conversion * rowData.price * 100) / 100}<Icon icon="circle" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/></span>}
                                    </Cell>
                                </Column>
                                {/* <Column width={60}>
                                    <HeaderCell>
                                        Active
                                    </HeaderCell>
                                    <Cell dataKey="active">
                                        {rowData => rowData.active ? 'YES' : 'NO'}
                                    </Cell>
                                </Column> */}
                                {event.free_drinks_enabled && (
                                    <Column width={150}>
                                        <HeaderCell>
                                            Free Drink
                                        </HeaderCell>
                                        <Cell dataKey="actions">
                                            {rowData => {
                                                if (new Date(event.event.started_at).getTime() >= new Date().getTime()) {
                                                    if (rowData.is_free_drink) {
                                                        return 'Redeemable Drink';
                                                    } else {
                                                        return <a onClick={() => this.handleSelectAsFree(rowData.id)} >Select as Free</a>
                                                    }
                                                } else {
                                                    return 'Only Menu';
                                                }
                                            }}
                                        </Cell>
                                    </Column>
                                )}
                                {event && event.event.started_at && event.event.started_at && new Date(event.event.started_at).getTime() >= new Date().getTime() && (
                                    <Column flexGrow>
                                        <HeaderCell>
                                            Actions
                                        </HeaderCell>
                                        <Cell dataKey="actions">
                                            {rowData => <a onClick={() => this.handleRemove(rowData.id)} >Remove</a>}
                                        </Cell>
                                    </Column>
                                )}
                            </Table>
                            </Panel>
                        ): (
                            <FieldContainer>
                                <p>No Menu</p>
                            </FieldContainer>
                        )}
                    </TableContainer>
            </React.Fragment>
        )
    }
}
