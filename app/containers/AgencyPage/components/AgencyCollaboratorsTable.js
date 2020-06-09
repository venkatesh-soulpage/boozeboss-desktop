import React, { Component } from 'react'
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message } from 'rsuite';
import InviteCollaborator from './InviteCollaborator';
import RoleValidator from 'components/RoleValidator';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const { Column, HeaderCell, Cell } = Table

const InfoContainer = styled.div`
  display: flex;
    flex-direction: column;
    flex: 3;
    margin: 0 2em 0 2em;
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
    margin: 1em 0 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`

export default class AgencyCollaboratorsTable extends Component {


    mergeCollaborators = () => {
        const {agencies, currentAgency} = this.props;
        const agency = agencies[currentAgency];

        if (!agency) return [];

        const collaborators = [];

        agency.agency_collaborators.map(collaborator => {
            collaborators.push(collaborator);
        })

        agency.collaborator_invitations
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
                    collaborator_invitation_id: collaborator.id,
                })
            })

        return collaborators;
    }

    handleRevoke = (collaborator_invitation_id) => {
        const { revokeCollaboratorInvitation } = this.props;
        revokeCollaboratorInvitation(collaborator_invitation_id);
    }


    render() {
        const collaborators = this.mergeCollaborators();
        return (
            <React.Fragment>
                <FieldContainer>
                    <FieldLabel>Collaborators</FieldLabel>
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
                            <Column resizable>
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
                                <Cell dataKey="email">
                                    {rowData => rowData.phone_number && parsePhoneNumberFromString(`+${rowData.account.phone_number}`).formatInternational()}
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
                                    {rowData => rowData.status === 'PENDING' ? <a onClick={() => this.handleRevoke(rowData.collaborator_invitation_id)} >Revoke</a> : 'Edit | Remove'}
                                </Cell>
                            </Column>
                        </Table>
                    ) : (
                        <p>No Collaborators</p>
                    )}
                </FieldContainer>
                <RoleValidator
                    {...this.props}
                    scopes={['ADMIN', 'AGENCY']}
                    roles={['ADMIN', 'OWNER', 'MANAGER']}
                >
                    <FieldContainer>
                        <InviteCollaborator 
                            {...this.props}
                        />
                    </FieldContainer>
                </RoleValidator>
            </React.Fragment>
        )
    }
}
