import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Table } from 'rsuite';
import EventInviteGuest from './EventInviteGuest';

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
`

const FieldLabel = styled.b`
    
`

export default class GuestList extends Component {
    render() {
        const {event} = this.props;
        console.log(event);
        return (
            <React.Fragment>
                <FieldsRow>
                    <FieldContainer>
                        <FieldLabel>
                            Guests ({event.event.guests.length})
                        </FieldLabel>
                    </FieldContainer>
                    <FieldContainer>
                        <EventInviteGuest 
                            {...this.props}
                        />
                    </FieldContainer>
                </FieldsRow>
                {event.event.guests && 
                        event.event.guests.length > 0 ? (
                            <Table
                                data={event.event.guests}
                                style={{margin: '1em 0 0 0'}}
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
                                <Column flexGrow>
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
                                        Signup Code
                                    </HeaderCell>
                                    <Cell dataKey="code">
                                        {rowData => <b>{rowData.code}</b>}
                                    </Cell>
                                </Column>
                            </Table>
                        ): (
                            <p>No guests</p>
                        )}
            </React.Fragment>
        )
    }
}
