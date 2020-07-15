import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker} from 'rsuite'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

export default class InviteCollaborator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        data: null,
        email: null,
        role_id: null,
        location_id: null,
        name: null, 
        custom_message: null,
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
      this.getPickerData();
      this.getLocationsPicker();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    getPickerData = ()  => {
        const {roles} = this.props;
        const data = roles.map(role => {
            return {
                label: role.name,
                value: role.id,
                role: role.name,
            }
        })
        this.setState({data});
    }

    getLocationsPicker = () => {
        const {organizations, currentOrganization} = this.props;
        const locations = 
                organizations[currentOrganization].locations.map(regional_location => {
                    return {
                        label: regional_location.location.name,
                        value: regional_location.location_id,
                    }
                })

        this.setState({locations});
    }

    invite = async () => {
        const {inviteCollaborator, organizations, currentOrganization} = this.props;
        const {email, role_id, name, location_id, custom_message} = this.state;
        if ( !email || !role_id || !location_id) return;
        const regional_organization_id = organizations[currentOrganization].id;
        await inviteCollaborator({email, role_id, regional_organization_id, location_id, display_name: name, custom_message});
        this.close();
    }

    render() {
        const {show, data, locations} = this.state;
        return ( 
            <React.Fragment>
                <Button onClick={this.open} color="green">+ Invite Collaborator</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Collaborator Email</FieldLabel>
                            <Input 
                                placeholder="Email"
                                onChange={(value) => this.handleChange(value, 'email')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Role</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={data}
                                onChange={(value) => this.handleChange(value, 'role_id')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Primary Location</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={locations}
                                onChange={(value) => this.handleChange(value, 'location_id')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Name (Only display)</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'name')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Custom message (Only display)</FieldLabel>
                            <Input 
                                componentClass="textarea"
                                rows={3}
                                onChange={(value) => this.handleChange(value, 'custom_message')}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.invite} color="green">
                        Invite
                    </Button>
                    <Button onClick={this.close} appearance="subtle">
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
  }
  