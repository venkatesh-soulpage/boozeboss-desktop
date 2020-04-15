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

export default class CreateVenueModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        name: null,
        address: null,
        contact_name: null,
        contact_email: null,
        contact_phone_number: null,
        latitude: null,
        longitude: null,
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
      // this.getPickerData();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    /* getPickerData = ()  => {
        const {roles} = this.props;
        const data = roles.map(role => {
            return {
                label: role.name,
                value: role.id,
                role: role.name,
            }
        })
        this.setState({data});
    }*/

    create = async () => {
        const {createVenue, clients, currentClient} = this.props;
        const {name, address, contact_name, contact_email, contact_phone_number, latitude } = this.state;
        if ( !name || !address) return;
        const created_by = clients[currentClient].id;
        await createVenue({name, address, contact_name, contact_email, contact_phone_number, latitude, created_by});
        this.close();
    }

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open}>+ Add Venue</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Name (Required)</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'name')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Address (Required)</FieldLabel>
                            <Input
                                componentClass="textarea"
                                rows={2}
                                style={{resize: 'auto' }}
                                onChange={(value) => this.handleChange(value, 'address')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Contact Name</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'contact_name')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Contact Email</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'contact_email')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Contact Phone Number</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'contact_phone_number')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Longitude</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'longitude')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Latitude</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'latitude')}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.create} color="green">
                        Create
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
  