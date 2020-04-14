import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message } from 'rsuite';
import InviteCollaborator from './InviteCollaborator';

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

class ClientForm extends Component {

    state = {
        name: null,
        description: null,
        owner_email: null,
        collaborator_limit: 5,
        briefs_limit: 5,
        brands_limit: 10,
        warehouses_limit: 1,
        locations_limit: 1,
  };

  handleChange = (value, name) => {
        this.setState({[name]: value});
  };

  submitClient = () => {
    const { inviteClient } = this.props;
        inviteClient({...this.state});
  };

    render() {
        const {name, description, owner_email, collaborator_limit, briefs_limit, brands_limit, warehouses_limit, locations_limit} = this.state;
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
                    <FieldsRow>
                        <FieldContainer>
                            <FieldLabel>Collaborators Limit</FieldLabel>
                            <InputNumber 
                                value={collaborator_limit}
                                onChange={(value) => this.handleChange(value, 'collaborator_limit')}
                        />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Briefs / Month Limit</FieldLabel>
                            <InputNumber 
                                value={briefs_limit}
                                onChange={(value) => this.handleChange(value, 'briefs_limit')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Brands Limit</FieldLabel>
                            <InputNumber 
                                value={brands_limit}
                                onChange={(value) => this.handleChange(value, 'brands_limit')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Warehouses Limit</FieldLabel>
                            <InputNumber 
                                value={warehouses_limit}
                                onChange={(value) => this.handleChange(value, 'warehouses_limit')}
                            />
                        </FieldContainer>    
                        <FieldContainer>
                            <FieldLabel>Locations Limit</FieldLabel>
                            <InputNumber 
                                value={locations_limit}
                                onChange={(value) => this.handleChange(value, 'locations_limit')}
                            />
                        </FieldContainer>  
                    </FieldsRow>
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
    const { clients, currentClient, error, success, dismiss } = this.props;
        return (
            <InfoContainer>
                {error && <Message showIcon closable type="error" description={error} onClose={() => dismiss('error')}/>}
                {success && <Message showIcon closable type="success" description={success} onClose={() => dismiss('success')} />}
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
                                <FieldsRow>
                                    <FieldContainer>
                                        <FieldLabel>Collaborators Limit</FieldLabel>
                                        <p>{clients[currentClient].collaborator_limit}</p>
                                    </FieldContainer>
                                    <FieldContainer>
                                        <FieldLabel>Briefs / Month Limit</FieldLabel>
                                        <p>{clients[currentClient].briefs_limit}</p>
                                    </FieldContainer>
                                    <FieldContainer>
                                        <FieldLabel>Brands Limit</FieldLabel>
                                        <p>{clients[currentClient].brands_limit}</p>
                                    </FieldContainer>
                                    <FieldContainer>
                                        <FieldLabel>Warehouses Limit</FieldLabel>
                                        <p>{clients[currentClient].warehouses_limit}</p>
                                    </FieldContainer>    
                                    <FieldContainer>
                                        <FieldLabel>Locations Limit</FieldLabel>
                                        <p>{clients[currentClient].locations_limit}</p>
                                    </FieldContainer>  
                                </FieldsRow>
                                <FieldContainer>
                                    <FieldLabelContainer> 
                                        <FieldLabel>Collaborators </FieldLabel>
                                        <p>{`( ${clients[currentClient].client_collaborators.length} / ${clients[currentClient].collaborator_limit} ) `}</p>
                                    </FieldLabelContainer>
                                    {clients[currentClient].client_collaborators && 
                                        clients[currentClient].client_collaborators.length > 0 ? (
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
                                </FieldContainer>
                                <FieldContainer>
                                    <InviteCollaborator 
                                        {...this.props}
                                    />
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

ClientInfo.propTypes = {
};
