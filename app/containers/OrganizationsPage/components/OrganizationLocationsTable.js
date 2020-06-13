import React, { Component } from 'react'
import {Table} from 'rsuite'; 
import styled from 'styled-components';
import RoleValidator from 'components/RoleValidator';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;


const Countries = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 0;
    width: 100%;
`

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;


const {Column, HeaderCell, Cell} = Table;

export default class OrganizationLocationsTable extends Component {
    render() {
        const {organizations, currentOrganization} = this.props;
        return (
            <FieldContainer>
                <FieldLabel>Locations ({organizations[currentOrganization].locations.length} / {organizations[currentOrganization].locations_limit})</FieldLabel>
                {organizations[currentOrganization].locations 
                    && organizations[currentOrganization].locations.length > 0 ? (
                        <Countries >
                            <Table
                                data={organizations[currentOrganization].locations}
                                width='100%'
                            >
                                <Column flexGrow>
                                    <HeaderCell>
                                        Name
                                    </HeaderCell>
                                    <Cell dataKey="name">
                                        {rowData => rowData.location.name}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        States Available
                                    </HeaderCell>
                                    <Cell dataKey="childrens">
                                        {rowData => rowData.location.childrens.length}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Currency
                                    </HeaderCell>
                                    <Cell dataKey="currency">
                                        {rowData => rowData.location.currency}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Passport Available
                                    </HeaderCell>
                                    <Cell dataKey="passport_available">
                                        {rowData => rowData.location.passport_available ? 'Yes' : 'No' }
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        ID Available
                                    </HeaderCell>
                                    <Cell dataKey="id_card_available">
                                        {rowData => rowData.location.id_card_available ? 'Yes' : 'No'}
                                    </Cell>
                                </Column>
                            </Table>
                        </Countries>
                    ) : (
                        <p>No locations defined</p>
                    )}
                <RoleValidator
                    {...this.props}
                    scopes={['ADMIN']}
                    roles={['ADMIN']}
                >
                    {/* <ClientAddLocation 
                        {...this.props}
                        client={clients[currentClient]}
                    /> */}
                </RoleValidator>
            </FieldContainer>
        )
    }
}
