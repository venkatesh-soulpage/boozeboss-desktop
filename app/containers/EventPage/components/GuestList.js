import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Table, Panel } from 'rsuite';
import EventInviteGuest from './EventInviteGuest';
import ImportGuestList from './ImportGuestList';

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
    align-items: ${props => props.align || 'flex-start'};
`

const FieldLabel = styled.b`
    
`

const TableContainer = styled.div`
`

export default class GuestList extends Component {

    handleResendEmail = (event_guest_id) => {
        this.props.resendEmail(event_guest_id);
    }

    handleDelete = (event_guest_id) => {
        this.props.deleteGuest(event_guest_id);
    }

    render() {
        const {event} = this.props;
        return (
            <React.Fragment>
                <FieldsRow>
                    {event && event.event && event.event.guest && (
                        <FieldContainer margin='0'>
                            <FieldLabel>
                                Guests ({event.event.guests.length})
                            </FieldLabel>
                        </FieldContainer>
                    )}
                    <FieldsRow>
                        <FieldContainer>
                            {event.event && event.event.is_master_code_enabled && (
                                <p>Master Code: <b>{event.event.master_code}</b></p>
                            )}
                        </FieldContainer>
                        <FieldContainer align="flex-end">
                            <FieldsRow>
                                <FieldContainer>
                                    <ImportGuestList 
                                        {...this.props}
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <EventInviteGuest 
                                        {...this.props}
                                    />
                                </FieldContainer>
                            </FieldsRow>
                        </FieldContainer>
                    </FieldsRow>
                </FieldsRow>
                <TableContainer>
                {event && event.event && event.event.guests && 
                        event.event.guests.length > 0 ? (
                            <Panel shaded style={{backgroundColor: 'white', margin: '1em 0 0 0'}}>
                            <Table
                                data={event.event.guests}
                                style={{margin: '1em 0 0 0'}}
                                autoHeight
                            >
                                <Column flexGrow>
                                    <HeaderCell>
                                        BoozeBoss Member?
                                    </HeaderCell>
                                    <Cell dataKey="is_member">
                                        {rowData => rowData.account_id ? 'Yes' : 'No'}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        First Name
                                    </HeaderCell>
                                    <Cell dataKey="first_name">
                                        {rowData => rowData.first_name}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Last Name
                                    </HeaderCell>
                                    <Cell dataKey="last_name">
                                        {rowData => rowData.last_name}
                                    </Cell>
                                </Column>
                                <Column resizable>
                                    <HeaderCell>
                                        Email
                                    </HeaderCell>
                                    <Cell dataKey="email">
                                        {rowData => rowData.email}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Phone Number
                                    </HeaderCell>
                                    <Cell dataKey="phone_number">
                                        {rowData => rowData.phone_number}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Guest Type
                                    </HeaderCell>
                                    <Cell dataKey="phone_number">
                                        {rowData => rowData.role.name}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Signup Code
                                    </HeaderCell>
                                    <Cell dataKey="code">
                                        {rowData => <b>{rowData.account_id ? '-' : rowData.code}</b>}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Actions
                                    </HeaderCell>
                                    <Cell dataKey="code">
                                        { rowData => (
                                            <div>
                                                {rowData.email && !rowData.account_id && <a onClick={() => this.handleResendEmail(rowData.id)}>Send email</a>}
                                                {rowData.email && !rowData.account_id  && ` | `} 
                                                <a onClick={() => this.handleDelete(rowData.id)}>Revoke</a>
                                            </div>
                                        )}
                                    </Cell>
                                </Column>
                            </Table>
                            </Panel>
                        ): (
                            <FieldContainer>
                                No guests
                            </FieldContainer>
                        )}
                    </TableContainer>
            </React.Fragment>
        )
    }
}
