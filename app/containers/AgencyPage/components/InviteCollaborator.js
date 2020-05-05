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
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
      this.getPickerData();
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

    invite = async () => {
        const {inviteCollaborator, agencies, currentAgency} = this.props;
        const {email, role_id} = this.state;
        if ( !email || !role_id) return;
        const agency_id = agencies[currentAgency].id;
        await inviteCollaborator({email, role_id, agency_id});
        this.close();
    }

    render() {
        const {show, data} = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open} color="green">+ Invite Collaborator</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Collaborator Email</FieldLabel>
                            <Input 
                                placeholed="Email"
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
  