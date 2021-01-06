import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message } from 'rsuite';
import InviteCollaborator from './InviteCollaborator';
import RoleValidator from 'components/RoleValidator';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import AgencyCollaboratorsTable from './AgencyCollaboratorsTable';

const { Column, HeaderCell, Cell } = Table;

const StyledMessage = styled(Message)`
    margin: 0 0 1em 0;
`

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

class AgencyForm extends Component {

    state = {
        name: null,
        description: null,
        owner_email: null,
        sla_terms: null,
        display_name: null,
        custom_message: null,
        sla_hours_before_event_creation: 24,
        sla_hours_before_event_update: 12,
    };

    handleChange = (value, name) => {
            this.setState({[name]: value});
    };

    submitAgency = () => {
        const { inviteAgency } = this.props;
        const {name, description, owner_email, sla_terms, sla_hours_before_event_creation, sla_hours_before_event_update, display_name, custom_message} = this.state;
        inviteAgency({ 
            name, description, owner_email, sla_terms, 
            sla_hours_before_event_creation: new Number(sla_hours_before_event_creation), 
            sla_hours_before_event_update: new Number(sla_hours_before_event_update),
        });
    };

    render() {
        const {name, description, owner_email, sla_terms, sla_hours_before_event_creation, sla_hours_before_event_update, display_name, custom_message} = this.state;
        return (
            <Panel shaded>
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
                        <FieldLabel>SLA Terms</FieldLabel>
                        <Input
                            componentClass="textarea" 
                            style={{resize: 'auto' }}
                            rows={3} 
                            value={sla_terms}
                            onChange={(value) => this.handleChange(value, 'sla_terms')}
                        />
                    </FieldContainer>
                    <FieldRow>
                        <FieldContainer>
                            <FieldLabel>Hours Before Brief Creation</FieldLabel>
                            <InputNumber 
                                onChange={(value) => this.handleChange(value, 'sla_hours_before_event_creation')}
                                value={sla_hours_before_event_creation}
                            /> 
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Hours Before Brief Update</FieldLabel>
                            <InputNumber 
                                defaultValue={sla_hours_before_event_update}
                                value={sla_hours_before_event_update}
                                onChange={(value) => this.handleChange(value, 'sla_hours_before_event_update')}
                            /> 
                        </FieldContainer>
                    </FieldRow>
                    <FieldContainer>
                        <FieldLabel>Owner Email</FieldLabel>
                        <p>(We will send an invite to this email)</p>
                        <Input 
                            value={owner_email}
                            onChange={(value) => this.handleChange(value, 'owner_email')}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Display Name</FieldLabel>
                        <Input 
                            value={display_name}
                            onChange={(value) => this.handleChange(value, 'display_name')}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Custom Message</FieldLabel>
                        <Input
                            componentClass="textarea" 
                            style={{resize: 'auto' }}
                            rows={3} 
                            value={custom_message}
                            onChange={(value) => this.handleChange(value, 'custom_message')}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Button onClick={this.submitAgency} color="green">Create Agency</Button>
                    </FieldContainer>
                </DataContainer>
            </Panel>
    );
  }
}

export default class AgencyInfo extends Component {

  render() {
    const { agencies, scope, role, currentAgency, error, success, dismiss } = this.props;
        return (
            <InfoContainer>
                {(!agencies || agencies.length < 1) && <ClientsLabel>No Agencies</ClientsLabel> }
                {/* error && <StyledMessage showIcon closable type="error" description={error} onClose={() => dismiss('error')}/> */}
                {/* success && <StyledMessage showIcon closable type="success" description={success} onClose={() => dismiss('success')} /> */}
                {agencies &&
                agencies.length > 0 && (
                    <React.Fragment>
                                {agencies[currentAgency].isDraft ? (
                        <AgencyForm {...this.props} />
                    ) : (
                        <Panel shaded>
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
                                    <FieldLabel>SLA Terms</FieldLabel>
                                    <p>{agencies[currentAgency].sla_terms}</p>
                                </FieldContainer>
                                <FieldRow>
                                    <FieldContainer>
                                        <FieldLabel>Hours Before Brief Creation</FieldLabel>
                                        <p>{agencies[currentAgency].sla_hours_before_event_creation}</p>
                                    </FieldContainer>
                                    <FieldContainer>
                                        <FieldLabel>Hours Before Brief Update</FieldLabel>
                                        <p>{agencies[currentAgency].sla_hours_before_event_update}</p>
                                    </FieldContainer>
                                </FieldRow>
                                <AgencyCollaboratorsTable {...this.props} />
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
