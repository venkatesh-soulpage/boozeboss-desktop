import React, { Component } from 'react'
import RoleValidator from 'components/RoleValidator';
import styled from 'styled-components';
import {Table, Icon} from 'rsuite';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import InviteCollaborator from './InviteCollaborator';
import OrganizationAddCollaboratorsTable from './OrganizationAddCollaboratorCredits';

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

const StyledAction = styled.a`
    margin: 0 5px 0 0;
`

export default class OrganizationCollaboratorsTable extends Component {

    mergeCollaborators = () => {
        const {organizations, currentOrganization} = this.props;

        if (!organizations) return [];

        const organization = organizations[currentOrganization];

        if (!organization) return [];

        const collaborators = [];

        organization.collaborators.map(collaborator => {
            collaborators.push(collaborator);
        })

        organization.collaborator_invitations &&
        organization.collaborator_invitations
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
                    is_expired: new Date(collaborator.expiration_date).getTime() <= new Date().getTime()
                })
            })

        return collaborators;
    }

    handleRevokeCollaboratorInvitation = (collaborator_invitation_id) => {
        const {revokeCollaboratorInvitation} = this.props;  
        const collaborators = this.mergeCollaborators();

        if (collaborators.length < 2) return alert("Please assign a new colaborator to this organization before deleting this.")

        revokeCollaboratorInvitation(collaborator_invitation_id);
    }

    handleResendCollaboratorInvitation = (collaborator_invitation_id) => {
        const {resendInviteCollaborator} = this.props;
        resendInviteCollaborator(collaborator_invitation_id);
    }
    
    render() {
        const {organizations, currentOrganization} = this.props;
        const collaborators = this.mergeCollaborators();
        return (
            <React.Fragment>
                <FieldContainer>
                    <FieldLabelContainer> 
                        <FieldLabel>Collaborators </FieldLabel>
                    </FieldLabelContainer>
                    {collaborators && 
                        collaborators.length > 0 ? (
                        <Table
                            data={collaborators}
                        >
                            <Column >
                                <HeaderCell resizable>
                                    First Name
                                </HeaderCell>
                                <Cell dataKey="first_name">
                                    {rowData => rowData.account.first_name}
                                </Cell>
                            </Column>
                            <Column resizable >
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
                            <Column width={150}>
                                <HeaderCell>
                                    Phone #
                                </HeaderCell>
                                <Cell dataKey="phone_number">
                                    {rowData => rowData.account.phone_number && parsePhoneNumberFromString(`+${rowData.account.phone_number}`).formatInternational()}
                                </Cell>
                            </Column>
                            <Column width={100}>
                                <HeaderCell>
                                    Scope
                                </HeaderCell>
                                <Cell dataKey="scope">
                                    {rowData => rowData.role.scope}
                                </Cell>
                            </Column>
                            <Column width={100}>
                                <HeaderCell>
                                    Role
                                </HeaderCell>
                                <Cell dataKey="role">
                                    {rowData => rowData.role.name}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Balance
                                </HeaderCell>
                                <Cell dataKey="balance">
                                    {rowData => (
                                        <span>
                                            {rowData.account.wallet ? rowData.account.wallet.balance : '-'}
                                            <Icon icon="circle" style={{color: '#c2b90a', margin: '0 0.5em 0 0.5em'}}/>
                                            {rowData.account.wallet && (
                                                <RoleValidator
                                                        {...this.props}
                                                        scopes={['ADMIN']}
                                                        roles={['ADMIN']}
                                                    >
                                                        <OrganizationAddCollaboratorsTable collaborator={rowData} {...this.props} />
                                                </RoleValidator>
                                            )}
                                        </span>
                                    )}
                                </Cell>
                            </Column>
                            <Column flexGrow>
                                <HeaderCell>
                                    Actions
                                </HeaderCell>
                                <Cell dataKey="actions">
                                        {rowData => {
                                            if (rowData && rowData.status === 'PENDING') {
                                                return (
                                                    <RoleValidator
                                                        {...this.props}
                                                        scopes={['REGION']}
                                                        roles={['OWNER']}
                                                    >
                                                        <React.Fragment>
                                                            {rowData.is_expired && <StyledAction onClick={() => this.handleResendCollaboratorInvitation(rowData.collaborator_invitation_id)}>Resend</StyledAction>}
                                                            {rowData.is_expired && <StyledAction>|</StyledAction>}
                                                            <StyledAction onClick={() => this.handleRevokeCollaboratorInvitation(rowData.collaborator_invitation_id)}>Revoke</StyledAction>
                                                        </React.Fragment>
                                                    </RoleValidator>
                                                    
                                                )
                                            } else {
                                                return '-'
                                            }
                                        }}
                                    </Cell>
                                
                            </Column> 
                        </Table>
                    ) : (
                        <p>No Collaborators</p>
                    )}
                </FieldContainer>
                <RoleValidator
                    {...this.props}
                    scopes={['REGION']}
                    roles={['OWNER']}
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
