import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider, DatePicker, IconButton, Icon, Dropdown } from 'rsuite';
/* import InviteCollaborator from './InviteCollaborator';
import CreateVenueModal from './CreateVenueModal';
import DeleteVenueModal from './DeleteVenueModal'; */
import RoleValidator from 'components/RoleValidator';
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

    submitOrganization = () => {
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
            <Panel shaded>
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
                                onChangeCalendarDate={(value) => this.handleExpiration(value, 'expiration_date')}
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
                                                Primary
                                            </HeaderCell>
                                            <Cell dataKey="childrens">
                                                {rowData => rowData.id === selected_locations[0].id ? <b>Primary Location</b> : 'No'}
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
                        <Button block color="green" onClick={this.submitOrganization}>Create Organization</Button>
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

    handleVerificationLogs = () => {
        const {organizations, currentOrganization, getVerificationLogs} = this.props;
        
        getVerificationLogs(organizations[currentOrganization].id);
    }

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
                        <Panel shaded>
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
                                    <FieldContainer align="flex-end">
                                        <Dropdown title="Options" icon={<Icon icon="setting" />} placement="leftStart">
                                            <Dropdown.Item icon={<Icon icon="file" />} onClick={this.handleVerificationLogs}>Verification Logs (CSV)</Dropdown.Item>
                                        </Dropdown>
                                    </FieldContainer>
                                </HeaderRow>
                                <Divider>Organization Limits</Divider>
                                <FieldsRow>
                                    <EditableField 
                                        {...this.props}
                                        limit={organizations[currentOrganization].locations.length}
                                        client={organizations[currentOrganization]}
                                        field_label='Locations Limit'
                                        field_name='locations_limit'
                                        field_type='number'
                                        value={organizations[currentOrganization].locations_limit}
                                    />  
                                    <EditableField 
                                        {...this.props}
                                        client={organizations[currentOrganization]}
                                        limit={organizations[currentOrganization].total_verifications}
                                        field_label='Identity Verification Limit'
                                        field_name='identity_verifications_limit'
                                        field_type='number'
                                        value={organizations[currentOrganization].identity_verifications_limit}
                                    /> 
                                    <RoleValidator
                                        {...this.props}
                                        scopes={['ADMIN']}
                                        roles={['ADMIN']}
                                    >
                                        <EditableField 
                                            {...this.props}
                                            client={organizations[currentOrganization]}
                                            field_label='Expiration Date'
                                            field_name='expiration_date'
                                            field_type='date'
                                            value={organizations[currentOrganization].expiration_date}
                                        />   
                                    </RoleValidator>
                                </FieldsRow>
                                <Divider>Teams limits</Divider>
                                <FieldsRow>
                                    <EditableField 
                                        {...this.props}
                                        client={organizations[currentOrganization]}
                                        field_label='Collaborator limit'
                                        field_name='collaborator_limit'
                                        field_type='number'
                                        value={organizations[currentOrganization].collaborator_limit}
                                    />
                                    <EditableField 
                                        {...this.props}
                                        client={organizations[currentOrganization]}
                                        field_label='Brief Limit / Year'
                                        field_name='briefs_limit'
                                        field_type='number'
                                        value={organizations[currentOrganization].briefs_limit}
                                    />
                                    <EditableField 
                                        {...this.props}
                                        client={organizations[currentOrganization]}
                                        field_label='Brands Limit'
                                        field_name='brands_limit'
                                        field_type='number'
                                        value={organizations[currentOrganization].brands_limit}
                                    />
                                    <EditableField 
                                        {...this.props}
                                        client={organizations[currentOrganization]}
                                        field_label='Warehouses Limit'
                                        field_name='warehouses_limit'
                                        field_type='number'
                                        value={organizations[currentOrganization].warehouses_limit}
                                    />   
                                    <EditableField 
                                        {...this.props}
                                        client={organizations[currentOrganization]}
                                        field_label='Agencies Limit'
                                        field_name='agencies_limit'
                                        field_type='number'
                                        value={organizations[currentOrganization].agencies_limit}
                                    />  
                                    <EditableField 
                                        {...this.props}
                                        client={organizations[currentOrganization]}
                                        field_label='Agencies Collaborators Limit'
                                        field_name='agency_collaborators_limit'
                                        field_type='number'
                                        value={organizations[currentOrganization].agency_collaborators_limit}
                                    />   
                                    <EditableField 
                                        {...this.props}
                                        client={organizations[currentOrganization]}
                                        field_label='Brief Attachments Limit'
                                        field_name='brief_attachment_limits'
                                        field_type='number'
                                        value={organizations[currentOrganization].brief_attachment_limits}
                                    />    
                                </FieldsRow>
                                <Divider />
                                <OrganizationCollaboratorsTable {...this.props}/>
                                <Divider />
                                <OrganizationLocationsTable {...this.props} />
                                <Divider /> 
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
