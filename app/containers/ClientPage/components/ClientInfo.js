import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider, DatePicker } from 'rsuite';
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
import EditableField from './EditableField';
import ClientToggleActive from './ClientToggleActive';
import RoleValidator from 'components/RoleValidator';
import ClientCollaboratorsTable from './ClientCollaboratorsTable';
import ClientUploadLogo from './ClientUploadLogo';
import ClientManageLocation from './ClientManageLocations';

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
    flex: 1;
    min-width: 170px;
    align-items: ${props => props.align || 'flex-start'};
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

const Countries = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 0;
    width: 100%;
`

const Country = styled.li`
    font-weight: bold;
`

const HeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const StyledLogo = styled.img`
    max-width: 250px;
    max-height: 300px;
    margin: 0 0 1em 0;
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
        expiration_date: new Date(),
        selected_locations: [],
  };

  handleChange = (value, name) => {
        this.setState({[name]: value});
  };
  
  
  handleExpiration = (value, name) => {
    if (new Date(value).getTime() <= new Date().getTime()) return alert("Can't set expiration");
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
        const {name, description, owner_email, collaborator_limit, briefs_limit, brands_limit, warehouses_limit, locations_limit, selected_locations, identity_verifications_limit, agencies_limit, agency_collaborators_limit, expiration_date} = this.state;
        console.log(selected_locations);
        return (
            <Panel bordered>
                <DataContainer>
                    <FieldsRow>
                        <FieldContainer>
                            <FieldLabel>Name</FieldLabel>
                            <Input 
                                value={name}
                                onChange={(value) => this.handleChange(value, 'name')}
                            />
                        </FieldContainer>
                    </FieldsRow>
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
                        <FieldContainer>
                            <FieldLabel>Expiration Date</FieldLabel>
                            <DatePicker 
                                style={{width: '100%'}}
                                value={expiration_date}
                                onChange={(value) => this.handleExpiration(value, 'expiration_date')}
                            />
                        </FieldContainer>
                    </FieldsRow>
                    <FieldsRow>
                        <FieldContainer>
                            <FieldLabel>Locations</FieldLabel>
                            {selected_locations && selected_locations.length > 0 && (
                                <Countries >
                                    <Table
                                        data={selected_locations}
                                        width='100%'
                                    >
                                        <Column flexGrow>
                                            <HeaderCell>
                                                Name
                                            </HeaderCell>
                                            <Cell dataKey="name">
                                                {rowData => rowData.name}
                                            </Cell>
                                        </Column>
                                        <Column flexGrow>
                                            <HeaderCell>
                                                States Available
                                            </HeaderCell>
                                            <Cell dataKey="childrens">
                                                {rowData => rowData.childrens.length}
                                            </Cell>
                                        </Column>
                                        <Column flexGrow>
                                            <HeaderCell>
                                                Currency
                                            </HeaderCell>
                                            <Cell dataKey="currency">
                                                {rowData => rowData.currency}
                                            </Cell>
                                        </Column>
                                        <Column flexGrow>
                                            <HeaderCell>
                                                Passport Available
                                            </HeaderCell>
                                            <Cell dataKey="passport_available">
                                                {rowData => rowData.passport_available ? 'Yes' : 'No' }
                                            </Cell>
                                        </Column>
                                        <Column flexGrow>
                                            <HeaderCell>
                                                ID Available
                                            </HeaderCell>
                                            <Cell dataKey="id_card_available">
                                                {rowData => rowData.id_card_available ? 'Yes' : 'No'}
                                            </Cell>
                                        </Column>
                                    </Table>
                                </Countries>
                            )}
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
                        <Button block color="green" onClick={this.submitClient}>Create Brand</Button>
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
                                        <EditableField 
                                            {...this.props}
                                            client={clients[currentClient]}
                                            field_label='Name'
                                            field_name='name'
                                            value={clients[currentClient].name}
                                            tag_type='header'
                                            is_number={false}
                                            show_label={false}
                                            margin='0'
                                        />
                                        <EditableField 
                                            {...this.props}
                                            client={clients[currentClient]}
                                            field_label='Description'
                                            field_name='description'
                                            value={clients[currentClient].description}
                                            is_number={false}
                                            show_label={false}
                                            margin='0'
                                        />
                                       <EditableField 
                                            {...this.props}
                                            client={clients[currentClient]}
                                            field_label='Contact Email'
                                            field_name='contact_email'
                                            value={clients[currentClient].contact_email}
                                            is_number={false}
                                            show_label={false}
                                            margin='0'
                                        />
                                    </FieldContainer>
                                    <FieldContainer align='flex-end'>
                                        {clients[currentClient] && clients[currentClient].logo_url && (
                                            <StyledLogo src={clients[currentClient].logo_url}/>
                                        )}
                                        <RoleValidator
                                            {...this.props}
                                            scopes={['ADMIN']}
                                            roles={['ADMIN']}
                                        >
                                            <ClientToggleActive     
                                                {...this.props}
                                                client={clients[currentClient]}
                                            />
                                        </RoleValidator>
                                        <RoleValidator
                                            {...this.props}
                                            scopes={['BRAND']}
                                            roles={['OWNER']}
                                        >
                                            <ClientUploadLogo {...this.props}/>
                                        </RoleValidator>
                                        
                                    </FieldContainer>
                                </HeaderRow>
                                <FieldsRow>
                                    <EditableField 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Collaborator limit'
                                        field_name='collaborator_limit'
                                        value={clients[currentClient].collaborator_limit}
                                    />
                                    <EditableField 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Brief Limit / Year'
                                        field_name='briefs_limit'
                                        value={clients[currentClient].briefs_limit}
                                    />
                                    <EditableField 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Brands Limit'
                                        field_name='brands_limit'
                                        value={clients[currentClient].brands_limit}
                                    />
                                    <EditableField 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Warehouses Limit'
                                        field_name='warehouses_limit'
                                        value={clients[currentClient].warehouses_limit}
                                    />  
                                    <EditableField 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Locations Limit'
                                        field_name='locations_limit'
                                        value={clients[currentClient].locations_limit}
                                    />  
                                    <EditableField 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Identity Verification Limit'
                                        field_name='identity_verifications_limit'
                                        value={clients[currentClient].identity_verifications_limit}
                                    />  
                                    <EditableField 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Agencies Limit'
                                        field_name='agencies_limit'
                                        value={clients[currentClient].agencies_limit}
                                    />  
                                    <EditableField 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Agencies Collaborators Limit'
                                        field_name='agency_collaborators_limit'
                                        value={clients[currentClient].agency_collaborators_limit}
                                    />   
                                    <EditableField 
                                        {...this.props}
                                        client={clients[currentClient]}
                                        field_label='Brief Attachments Limit'
                                        field_name='brief_attachment_limits'
                                        value={clients[currentClient].brief_attachment_limits}
                                    />   
                                </FieldsRow>
                                <Divider />
                                <ClientCollaboratorsTable {...this.props}/>
                                <Divider />
                                <FieldContainer>
                                    <FieldLabel>Locations ({clients[currentClient].locations.length} / {clients[currentClient].locations_limit})</FieldLabel>
                                    {clients[currentClient].locations 
                                        && clients[currentClient].locations.length > 0 ? (
                                            <Countries >
                                                <Table
                                                    data={clients[currentClient].locations}
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
                                                    </Column> */
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
                                                    <Column flexGrow>
                                                        <HeaderCell>
                                                            Locations
                                                        </HeaderCell>
                                                        <Cell dataKey="id_card_available">
                                                            {rowData => <ClientManageLocation {...this.props} country={rowData} />}
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
                                        <ClientAddLocation 
                                            {...this.props}
                                            client={clients[currentClient]}
                                        />
                                    </RoleValidator>
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
                                            width='100%'
                                        >
                                            <Column flexGrow>
                                                <HeaderCell>
                                                    Name
                                                </HeaderCell>
                                                <Cell dataKey="name">
                                                    {rowData => rowData.name}
                                                </Cell>
                                            </Column>
                                            <Column flexGrow>
                                                <HeaderCell>
                                                    Address
                                                </HeaderCell>
                                                <Cell dataKey="last_name">
                                                    {rowData => rowData.address}
                                                </Cell>
                                            </Column>
                                            <Column flexGrow>
                                                <HeaderCell>
                                                    Contact Name
                                                </HeaderCell>
                                                <Cell dataKey="contact_name">
                                                    {rowData => rowData.contact_name}
                                                </Cell>
                                            </Column>
                                            <Column flexGrow>
                                                <HeaderCell>
                                                    Contact Email
                                                </HeaderCell>
                                                <Cell dataKey="contact_email">
                                                    {rowData => rowData.contact_email}
                                                </Cell>
                                            </Column>
                                            <Column flexGrow>
                                                <HeaderCell>
                                                    Telephone # 
                                                </HeaderCell>
                                                <Cell dataKey="contact_phone_number">
                                                    {rowData => parsePhoneNumberFromString(`+${rowData.contact_phone_number}`) ? parsePhoneNumberFromString(`+${rowData.contact_phone_number}`).formatInternational() : ''}
                                                </Cell>
                                            </Column>
                                            <Column flexGrow>
                                                <HeaderCell>
                                                    Latitude 
                                                </HeaderCell>
                                                <Cell dataKey="latitude">
                                                    {rowData => rowData.latitude}
                                                </Cell>
                                            </Column>
                                            <Column flexGrow>
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
