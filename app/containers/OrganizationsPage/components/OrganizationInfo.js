import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider, DatePicker } from 'rsuite';
/* import InviteCollaborator from './InviteCollaborator';
import CreateVenueModal from './CreateVenueModal';
import DeleteVenueModal from './DeleteVenueModal'; */
import OrganizationAddLocationModal from './OrganizationAddLocationModal';
import EditableField from './EditableField';
import OrganizationCollaboratorsTable from './OrganizationCollaboratorsTable';

import { parsePhoneNumberFromString } from 'libphonenumber-js'
import OrganizationLocationsTable from './OrganizationLocationsTable';

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

class OrganizationsForm extends Component {

    state = {
        name: null,
        description: null,
        owner_email: null,
        display_name: null,
        custom_message: null,
        locations_limit: 1,
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
        const { inviteOrganization } = this.props;
        inviteOrganization({...this.state});
    };

    addLocation = (location) => {
        this.setState({
            selected_locations: [...this.state.selected_locations, location]
        })
    }

    removeLocation = (id) => {
        let {selected_locations} = this.state;
        const locations_ids = selected_locations.map(location => location.id);
        const location_index = locations_ids.indexOf(id);
        selected_locations.splice(location_index, 1);
        this.setState({selected_locations});
    }

    render() {
        const {name, description, owner_email, display_name, custom_message, locations_limit, selected_locations, expiration_date} = this.state;
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
                            <FieldLabel>Locations Limit</FieldLabel>
                            <InputNumber 
                                min={1}
                                value={locations_limit}
                                onChange={(value) => this.handleChange(value, 'locations_limit')}
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
                                        <Column flexGrow>
                                            <HeaderCell>
                                                Actions
                                            </HeaderCell>
                                            <Cell dataKey="id_card_available">
                                                {rowData => <a onClick={() => this.removeLocation(rowData.id)}>Remove</a>}
                                            </Cell>
                                        </Column>
                                    </Table>
                                </Countries>
                            )}
                            <OrganizationAddLocationModal 
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
                    <Divider />
                    <FieldsRow>
                        <FieldContainer>
                            <FieldLabel>Owner Email</FieldLabel>
                            <p>(We will send an invite to this email)</p>
                            <Input 
                                value={owner_email}
                                onChange={(value) => this.handleChange(value, 'owner_email')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Owner Name</FieldLabel>
                            <p>(Only for email display)</p>
                            <Input 
                                value={display_name}
                                onChange={(value) => this.handleChange(value, 'display_name')}
                            />
                        </FieldContainer>
                    </FieldsRow>
                    <FieldContainer>
                        <FieldLabel>Custom Message</FieldLabel>
                        <Input
                            componentClass="textarea" 
                            rows={3} 
                            value={custom_message}
                            onChange={(value) => this.handleChange(value, 'custom_message')}
                        />
                    </FieldContainer>
                    <Divider />
                    <FieldContainer>
                        <Button block color="green" onClick={this.submitClient}>Create Organization</Button>
                    </FieldContainer>
                </DataContainer>
            </Panel>
    );
  }
}

export default class OrganizationsInfo extends Component {

    /* formatPhoneNumber = (str) => {
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
      } */


  render() {
        const { organizations, currentOrganization, error, success, dismiss } = this.props;
        return (
            <InfoContainer>
                {(!organizations || organizations.length < 1) && <ClientsLabel>No organizations</ClientsLabel> }
                {organizations &&
                organizations.length > 0 && (
                    <React.Fragment>
                    {organizations[currentOrganization].isDraft ? (
                        <OrganizationsForm {...this.props} />
                    ) : (
                        <Panel bordered>
                            <DataContainer>
                                <HeaderRow>
                                    <FieldContainer>
                                        <EditableField 
                                            {...this.props}
                                            client={organizations[currentOrganization]}
                                            field_label='Name'
                                            field_name='name'
                                            value={organizations[currentOrganization].name}
                                            tag_type='header'
                                            is_number={false}
                                            show_label={false}
                                            margin='0'
                                        />
                                        <EditableField 
                                            {...this.props}
                                            client={organizations[currentOrganization]}
                                            field_label='Description'
                                            field_name='description'
                                            value={organizations[currentOrganization].description}
                                            is_number={false}
                                            show_label={false}
                                            margin='0'
                                        />
                                       <EditableField 
                                            {...this.props}
                                            client={organizations[currentOrganization]}
                                            field_label='Contact Email'
                                            field_name='contact_email'
                                            value={organizations[currentOrganization].contact_email}
                                            is_number={false}
                                            show_label={false}
                                            margin='0'
                                        />
                                    </FieldContainer>
                                    {/* <FieldContainer align='flex-end'>
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
                                        
                                    </FieldContainer> */}
                                </HeaderRow>
                                <FieldsRow>
                                    <EditableField 
                                        {...this.props}
                                        client={organizations[currentOrganization]}
                                        field_label='Locations Limit'
                                        field_name='locations_limit'
                                        value={organizations[currentOrganization].locations_limit}
                                    />  
                                </FieldsRow>
                                <Divider />
                                <OrganizationCollaboratorsTable {...this.props}/>
                                <Divider />
                                <OrganizationLocationsTable {...this.props} />
                                {/* <FieldContainer>
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
                                <Divider /> */}
                            </DataContainer> 
                        </Panel>
                    )}
                </React.Fragment>
                )}
            </InfoContainer>
    );
  }
}

OrganizationsInfo.propTypes = {
};
