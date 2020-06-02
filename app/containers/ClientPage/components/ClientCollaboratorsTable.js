import React, { Component } from 'react'
import RoleValidator from 'components/RoleValidator';
import styled from 'styled-components';
import {Table} from 'rsuite';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import InviteCollaborator from './InviteCollaborator';

const { Column, HeaderCell, Cell } = Table;

const InfoContainer = styled.div`
  display: flex;
    flex-direction: column;
    flex: 3;
    margin: 0 2em 2em 2em;
`;

const ClientsLabel = styled.p`
  font-size: 1.25em;
`;
const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

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

const ActionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Countries = styled.ul`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 0;
`

const Country = styled.li`
    font-weight: bold;
`

const HeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`


export default class ClientCollaboratorsTable extends Component {

    mergeCollaborators = () => {
        const {clients, currentClient} = this.props;
        const client = clients[currentClient];

        if (!client) return [];

        const collaborators = [];

        client.client_collaborators.map(collaborator => {
            collaborators.push(collaborator);
        })

        client.collaborator_invitations
            .filter(collaborator => collaborator.status === 'PENDING')
            .map(collaborator => {
                collaborators.push({
                    account: {
                        first_name: '(Waiting for signup)',
                        last_name: '(Waiting for signup)',
                        email: collaborator.email,
                    },
                    role: collaborator.role,
                    status: collaborator.status,
                })
            })

        return collaborators;
    }
    
    render() {
        const {clients, currentClient} = this.props;
        const collaborators = this.mergeCollaborators();
        return (
            <React.Fragment>
                <FieldContainer>
                    <FieldLabelContainer> 
                        <FieldLabel>Collaborators </FieldLabel>
                        <p>{`( ${clients[currentClient].client_collaborators && clients[currentClient].client_collaborators.length} / ${clients[currentClient].collaborator_limit} ) `}</p>
                    </FieldLabelContainer>
                    {collaborators && 
                        collaborators.length > 0 ? (
                        <Table
                            data={collaborators}
                        >
                            <Column flexGrow>
                                <HeaderCell>
                                    First Name
                                </HeaderCell>
                                <Cell dataKey="first_name">
                                    {rowData => rowData.account.first_name}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Last Name
                                </HeaderCell>
                                <Cell dataKey="last_name">
                                    {rowData => rowData.account.last_name}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Email
                                </HeaderCell>
                                <Cell dataKey="email">
                                    {rowData => rowData.account.email}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Phone #
                                </HeaderCell>
                                <Cell dataKey="phone_number">
                                    {rowData => rowData.account.phone_number && parsePhoneNumberFromString(`+${rowData.account.phone_number}`).formatInternational()}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Scope
                                </HeaderCell>
                                <Cell dataKey="scope">
                                    {rowData => rowData.role.scope}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Role
                                </HeaderCell>
                                <Cell dataKey="role">
                                    {rowData => rowData.role.name}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Actions
                                </HeaderCell>
                                <Cell dataKey="actions">
                                    {rowData => rowData.status === 'PENDING' ? 'Revoke' : 'Edit | Delete'}
                                </Cell>
                            </Column>
                        </Table>
                    ) : (
                        <p>No Collaborators</p>
                    )}
                </FieldContainer>
                <FieldContainer>
                    <InviteCollaborator 
                        {...this.props}
                    />
                </FieldContainer>
            </React.Fragment>
        )
    }
}
