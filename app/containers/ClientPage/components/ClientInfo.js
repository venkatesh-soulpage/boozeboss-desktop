import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider } from 'rsuite';
import InviteCollaborator from './InviteCollaborator';
import CreateVenueModal from './CreateVenueModal';
import DeleteVenueModal from './DeleteVenueModal';
import ClientAddLocationModal from './ClientAddLocationModal';

import { parsePhoneNumberFromString } from 'libphonenumber-js'
import ClientBrandsTable from './ClientBrandsTable';
import CreateBrandModal from './CreateBrandModal';
import ClientWarehouseTable from './ClientWarehouseTable';
import CreateWarehouseModal from './CreateWarehouseModal';
import ClientAddLocation from './ClientAddLocation';
import EditableSLA from './EditableSLA';
import ClientToggleActive from './ClientToggleActive';
import RoleValidator from 'components/RoleValidator';

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
        identity_verifications_limit: 100,
        agencies_limit: 1,
        agency_collaborators_limit: 1,
        selected_locations: [],
  };

  handleChange = (value, name) => {
        this.setState({[name]: value});
  };

  submitClient = () => {
    const { inviteClient } = this.props;
        inviteClient({...this.state});
  };

    addLocation = (location) => {
        this.setState({
            selected_locations: [...this.state.selected_locations, location]
        })
    }

    render() {
        const {name, description, owner_email, collaborator_limit, briefs_limit, brands_limit, warehouses_limit, locations_limit, selected_locations, identity_verifications_limit, agencies_limit, agency_collaborators_limit} = this.state;
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
                            <FieldLabel>Briefs / Year Limit</FieldLabel>
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
                        <FieldContainer>
                            <FieldLabel>ID Verifications Limit</FieldLabel>
                            <InputNumber 
                                value={identity_verifications_limit}
                                onChange={(value) => this.handleChange(value, 'identity_verifications_limit')}
                            />
                        </FieldContainer>  
                        <FieldContainer>
                            <FieldLabel>Agencies Limit</FieldLabel>
                            <InputNumber 
                                value={agencies_limit}
                                onChange={(value) => this.handleChange(value, 'agencies_limit')}
                            />
                        </FieldContainer>  
                        <FieldContainer>
                            <FieldLabel>Agencies Collaborators Limit</FieldLabel>
                            <InputNumber 
                                value={agency_collaborators_limit}
                                onChange={(value) => this.handleChange(value, 'agency_collaborators_limit')}
                            />
                        </FieldContainer>  
                    </FieldsRow>
                    <FieldsRow>
                        <FieldContainer>
                            <FieldLabel>Locations</FieldLabel>
                            <Countries>
                                {selected_locations 
                                    && selected_locations.length > 0
                                    && selected_locations.map(selected => {
                                        return <Country>{selected.name}</Country>
                                })}
                            </Countries>
                            <ClientAddLocationModal 
                                {...this.props} 
                                selected_locations={selected_locations}
                                locations_limit={locations_limit}
                                addLocation={this.addLocation}
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

    formatPhoneNumber = (str) => {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        
        //Check if the input is of correct
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        
        if (match) {
          //Remove the matched extension code
          //Change this to format for any country code.
          let intlCode = (match[1] ? '+1 ' : '')
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        
        return null;
      }

  render() {
        const { clients, currentClient, error, success, dismiss } = this.props;
        return (
            <InfoContainer>
                {/* error && <StyledMessage showIcon closable type="error" description={error} onClose={() => dismiss('error')}/> */}
                {/* success && <StyledMessage showIcon closable type="success" description={success} onClose={() => dismiss('success')} /> */}
                {(!clients || clients.length < 1) && <ClientsLabel>No Clients</ClientsLabel> }
                {clients &&
                clients.length > 0 && (
                    <React.Fragment>
                    {clients[currentClient].isDraft ? (
                        <ClientForm {...this.props} />
                    ) : (
                        <Panel bordered>
                            <DataContainer>
                                <HeaderRow>
                                    <FieldContainer>
                                        <h3>{clients[currentClient].name}</h3>
                                        <p>{clients[currentClient].description}</p>
                                        <p>{clients[currentClient].contact_email}</p>
                                    </FieldContainer>
                                    <FieldContainer>
                                        <ClientToggleActive     
                                            {...this.props}
                                            client={clients[currentClient]}
                                        />
                                    </FieldContainer>
                                </HeaderRow>
                                <Divider />
                                <FieldContainer>
                                    <FieldLabel>Locations</FieldLabel>
                                    {clients[currentClient].locations 
                                        && clients[currentClient].locations.length > 0 ? (
                                            <Countries>
                                                {clients[currentClient].locations.map(loc => (
                                                    <Country>{loc.location.name}</Country>
                                                ))}
                                            </Countries>
                                        ) : (
                                            <p>No locations defined</p>
                                        )}
                                    <RoleValidator
                                        {...this.props}
                                        scopes={['ADMIN']}
                                        roles={['ADMIN']}
                                    >
                                        <ClientAddLocation 
                                            {...this.props}
                                            client={clients[currentClient]}
                                        />
                                    </RoleValidator>
                                </FieldContainer>
                                <FieldsRow>
                                    <EditableSLA 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Collaborator limit'
                                        field_name='collaborator_limit'
                                        value={clients[currentClient].collaborator_limit}
                                    />
                                    <EditableSLA 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Brief Limit / Year'
                                        field_name='briefs_limit'
                                        value={clients[currentClient].briefs_limit}
                                    />
                                    <EditableSLA 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Brands Limit'
                                        field_name='brands_limit'
                                        value={clients[currentClient].brands_limit}
                                    />
                                    <EditableSLA 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Warehouses Limit'
                                        field_name='warehouses_limit'
                                        value={clients[currentClient].warehouses_limit}
                                    />  
                                    <EditableSLA 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Locations Limit'
                                        field_name='locations_limit'
                                        value={clients[currentClient].locations_limit}
                                    />  
                                    <EditableSLA 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Identity Verification Limit'
                                        field_name='identity_verifications_limit'
                                        value={clients[currentClient].identity_verifications_limit}
                                    />  
                                    <EditableSLA 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Agencies Limit'
                                        field_name='agencies_limit'
                                        value={clients[currentClient].agencies_limit}
                                    />  
                                    <EditableSLA 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Agencies Collaborators Limit'
                                        field_name='agency_collaborators_limit'
                                        value={clients[currentClient].agency_collaborators_limit}
                                    />   
                                    <EditableSLA 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Brief Attachments Limit'
                                        field_name='brief_attachment_limits'
                                        value={clients[currentClient].brief_attachment_limits}
                                    />   
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
                                            <Column resizable>
                                                <HeaderCell>
                                                    Phone #
                                                </HeaderCell>
                                                <Cell dataKey="phone_number">
                                                    {rowData => parsePhoneNumberFromString(`+${rowData.account.phone_number}`).formatInternational()}
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
                                            <Column resizable>
                                                <HeaderCell>
                                                    Telephone # 
                                                </HeaderCell>
                                                <Cell dataKey="contact_phone_number">
                                                    {rowData => parsePhoneNumberFromString(`+${rowData.contact_phone_number}`) ? parsePhoneNumberFromString(`+${rowData.contact_phone_number}`).formatInternational() : ''}
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
                                <Divider />
                                <FieldContainer>
                                    <ClientBrandsTable
                                        {...this.props} 
                                        brands={clients[currentClient].brands}
                                    />
                                    <CreateBrandModal 
                                        {...this.props}
                                    />
                                </FieldContainer>
                                <Divider />
                                <FieldContainer>
                                        <ClientWarehouseTable 
                                            {...this.props}
                                            warehouses={clients[currentClient].warehouses}
                                        />
                                        <CreateWarehouseModal 
                                            {...this.props}
                                            locations={clients[currentClient].locations}
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
