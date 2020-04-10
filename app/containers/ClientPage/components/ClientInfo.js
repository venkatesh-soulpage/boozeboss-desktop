import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table } from 'rsuite';

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

class ClientForm extends Component {

    state = {
        name: null,
        description: null,
    owner_email: null,
  };

  handleChange = (value, name) => {
        this.setState({[name]: value});
  };

  submitClient = () => {
    const { inviteClient } = this.props;
        const {name, description, owner_email} = this.state;
    inviteClient({ name, description, owner_email });
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
                        <Button onClick={this.submitClient}>Create Brand</Button>
                    </FieldContainer>
                </DataContainer>
            </Panel>
    );
  }
}

export default class ClientInfo extends Component {

  render() {
    const { clients, currentClient } = this.props;
        return (
            <InfoContainer>
                {(!clients || clients.length < 1) && <ClientsLabel>No Clients</ClientsLabel> }
                {clients &&
                clients.length > 0 && (
                    <React.Fragment>
                                {clients[currentClient].isDraft ? (
                        <ClientForm {...this.props} />
                    ) : (
                        <Panel bordered>
                            <DataContainer>
                                <FieldContainer>
                                    <FieldLabel>Name</FieldLabel>
                                    <p>{clients[currentClient].name}</p>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Description</FieldLabel>
                                    <p>{clients[currentClient].description}</p>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Contact</FieldLabel>
                                    <p>{clients[currentClient].contact_email}</p>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Collaborators</FieldLabel>
                                    {clients[currentClient].client_collaborators.length > 0 ? (
                                        <Table
                                            data={clients[currentClient].client_collaborators}
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
                                    <Button>+ Invite Collaborator</Button>
                                </FieldContainer>
                            </DataContainer>
                        </Panel>
                    )}
                </React.Fragment>
                )}
            </InfoContainer>
    );
  }
}

ClientInfo.propTypes = {};
