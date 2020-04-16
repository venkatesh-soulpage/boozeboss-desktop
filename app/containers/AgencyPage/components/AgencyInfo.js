import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table } from 'rsuite';
import InviteCollaborator from './InviteCollaborator';
import RoleValidator from 'components/RoleValidator';

const { Column, HeaderCell, Cell } = Table;

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
    margin: 1em 0 1em 0;
`;

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

class AgencyForm extends Component {

    state = {
        name: null,
        description: null,
        owner_email: null,
    };

    handleChange = (value, name) => {
            this.setState({[name]: value});
    };

    submitAgency = () => {
        const { inviteAgency } = this.props;
        const {name, description, owner_email} = this.state;
        inviteAgency({ name, description, owner_email });
    };

    render() {
        const {name, description, owner_email} = this.props;
        return (
            <Panel bordered>
                <DataContainer>
                    <FieldContainer>
                        <FieldLabel>Name</FieldLabel>
                        <Input 
                            value={name}
                            onChange={(value) => this.handleChange(value, 'name')}
            />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Description</FieldLabel>
                        <Input
                            componentClass="textarea" 
                            rows={3} 
                            value={description}
                            onChange={(value) => this.handleChange(value, 'description')}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Owner Email</FieldLabel>
                        <p>(We will send an invite to this email)</p>
                        <Input 
                            value={owner_email}
                            onChange={(value) => this.handleChange(value, 'owner_email')}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Button onClick={this.submitAgency}>Create Agency</Button>
                    </FieldContainer>
                </DataContainer>
            </Panel>
    );
  }
}

export default class AgencyInfo extends Component {

  render() {
    const { agencies, scope, role, currentAgency } = this.props;
        return (
            <InfoContainer>
                {(!agencies || agencies.length < 1) && <ClientsLabel>No Agencies</ClientsLabel> }
                {agencies &&
                agencies.length > 0 && (
                    <React.Fragment>
                                {agencies[currentAgency].isDraft ? (
                        <AgencyForm {...this.props} />
                    ) : (
                        <Panel bordered>
                            <DataContainer>
                                <FieldContainer>
                                    <FieldLabel>Name</FieldLabel>
                                    <p>{agencies[currentAgency].name}</p>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Description</FieldLabel>
                                    <p>{agencies[currentAgency].description}</p>
                                </FieldContainer>
                                {scope === 'ADMIN' && role === 'ADMIN' && (
                                    <FieldContainer>
                                        <FieldLabel>Invited By</FieldLabel>
                                        <p>{agencies[currentAgency].client.name}</p>
                                    </FieldContainer>
                                )}
                                
                                <FieldContainer>
                                    <FieldLabel>Contact</FieldLabel>
                                    <p>{agencies[currentAgency].contact_email}</p>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Collaborators</FieldLabel>
                                    {agencies[currentAgency].agency_collaborators &&
                                        agencies[currentAgency].agency_collaborators.length > 0 ? (
                                        <Table
                                            data={agencies[currentAgency].agency_collaborators}
                                        >
                                            <Column>
                                                <HeaderCell>
                                                    First Name
                                                </HeaderCell>
                                                <Cell dataKey="first_name">
                                                    {rowData => rowData.account.first_name}
                                                </Cell>
                                            </Column>
                                            <Column>
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
                                            <Column>
                                                <HeaderCell>
                                                    Scope
                                                </HeaderCell>
                                                <Cell dataKey="scope">
                                                    {rowData => rowData.role.scope}
                                                </Cell>
                                            </Column>
                                            <Column>
                                                <HeaderCell>
                                                    Role
                                                </HeaderCell>
                                                <Cell dataKey="role">
                                                    {rowData => rowData.role.name}
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
                                    scope={['ADMIN', 'OWNER', 'MANAGER']}
                                >
                                    <FieldContainer>
                                        <InviteCollaborator 
                                            {...this.props}
                                        />
                                    </FieldContainer>
                                </RoleValidator>
                                
                            </DataContainer>
                        </Panel>
                    )}
                </React.Fragment>
                )}
            </InfoContainer>
    );
  }
}

AgencyInfo.propTypes = {};
