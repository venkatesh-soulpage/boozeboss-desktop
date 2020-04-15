import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider } from 'rsuite';
import InviteCollaborator from './InviteCollaborator';
import CreateVenueModal from './CreateVenueModal';
import DeleteVenueModal from './DeleteVenueModal';

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

const StyledMessage = styled(Message)`
    margin: 0 0 1em 0;
`

const ActionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

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
                {error && <StyledMessage showIcon closable type="error" description={error} onClose={() => dismiss('error')}/>}
                {success && <StyledMessage showIcon closable type="success" description={success} onClose={() => dismiss('success')} />}
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
                                <Divider />
                                <FieldContainer>
                                    <FieldLabelContainer> 
                                        <FieldLabel>Collaborators </FieldLabel>
                                        <p>{`( ${clients[currentClient].client_collaborators && clients[currentClient].client_collaborators.length} / ${clients[currentClient].collaborator_limit} ) `}</p>
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
                                            <Column>
                                                <HeaderCell>
                                                    Actions
                                                </HeaderCell>
                                                <Cell dataKey="actions">
                                                    Edit | Delete
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
                                <Divider />
                                <FieldContainer>
                                    <FieldLabelContainer> 
                                        <FieldLabel>Venues</FieldLabel>
                                    </FieldLabelContainer>
                                    {clients[currentClient].venues && 
                                        clients[currentClient].venues.length > 0 ? (
                                        <Table
                                            data={clients[currentClient].venues}
                                        >
                                            <Column resizable>
                                                <HeaderCell>
                                                    Name
                                                </HeaderCell>
                                                <Cell dataKey="name">
                                                    {rowData => rowData.name}
                                                </Cell>
                                            </Column>
                                            <Column resizable>
                                                <HeaderCell>
                                                    Address
                                                </HeaderCell>
                                                <Cell dataKey="last_name">
                                                    {rowData => rowData.address}
                                                </Cell>
                                            </Column>
                                            <Column>
                                                <HeaderCell>
                                                    Contact Name
                                                </HeaderCell>
                                                <Cell dataKey="contact_name">
                                                    {rowData => rowData.contact_name}
                                                </Cell>
                                            </Column>
                                            <Column resizable>
                                                <HeaderCell>
                                                    Contact Email
                                                </HeaderCell>
                                                <Cell dataKey="contact_email">
                                                    {rowData => rowData.contact_email}
                                                </Cell>
                                            </Column>
                                            <Column>
                                                <HeaderCell>
                                                    Telephone # 
                                                </HeaderCell>
                                                <Cell dataKey="contact_phone_number">
                                                    {rowData => rowData.contact_phone_number}
                                                </Cell>
                                            </Column>
                                            <Column>
                                                <HeaderCell>
                                                    Latitude 
                                                </HeaderCell>
                                                <Cell dataKey="latitude">
                                                    {rowData => rowData.latitude}
                                                </Cell>
                                            </Column>
                                            <Column>
                                                <HeaderCell>
                                                    Longitude
                                                </HeaderCell>
                                                <Cell dataKey="longitude">
                                                    {rowData => rowData.longitude}
                                                </Cell>
                                            </Column>
                                            <Column width={150}>
                                                <HeaderCell>
                                                    Actions
                                                </HeaderCell>
                                                <Cell dataKey="actions">
                                                        {rowData => {
                                                            return (
                                                                <ActionContainer>
                                                                    <DeleteVenueModal {...this.props} venue={rowData}/>
                                                                </ActionContainer>
                                                            )
                                                        }} 
                                                    
                                                </Cell>
                                            </Column>
                                        </Table>
                                    ) : (
                                        <p>No Venues</p>
                                    )}
                                </FieldContainer>
                                <FieldContainer>
                                    <CreateVenueModal 
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
