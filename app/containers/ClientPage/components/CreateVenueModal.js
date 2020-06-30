import React, { Component } from 'react'
import {Modal, Button, Input, TreePicker, Alert} from 'rsuite'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const styles = {
    margin: '0.75em 0 0 0'
  }

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
        location_id: null,
      };
    }

    componentDidMount = () => {
        const {showVenueModal} = this.props.location;

        if (showVenueModal) {
            this.open();
        }
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

    getLocationOptions = () => {
        const {clients, currentClient} = this.props;

        const {location} = clients[currentClient];
         
        if (!location) return [];
        
        const locationOptions = 
                    location.childrens.map(state => {
                        const children = state.childrens.map(city => {
                            return {
                                label: city.name,
                                value: city.id,
                            }
                        })
                        return {
                            label: state.name,
                            value: state.id,
                            children
                        }
                    })

        return locationOptions;
    }

    create = async () => {
        const {createVenue, clients, currentClient} = this.props;
        const {name, address, contact_name, contact_email, contact_phone_number, latitude, longitude, location_id } = this.state;
        if ( !name || !address || !location_id) return Alert.error('Missing fields');
        const created_by = clients[currentClient].id;
        await createVenue({name, address, contact_name, contact_email, contact_phone_number, latitude, longitude, created_by, location_id});
        this.close();
    }

    render() {
        const {show, location_id} = this.state;
        return (
            <React.Fragment>
                <Button id="new-venue" onClick={this.open} color="green" block>+ Add Venue</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Name (Required)</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'name')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Location (Required)</FieldLabel>
                            <TreePicker 
                                virtualized
                                value={location_id}
                                data={this.getLocationOptions()}
                                onChange={(value) => this.handleChange(value, 'location_id')}
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
                        <FieldRow>
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
                        </FieldRow>
                        <FieldContainer>
                            <FieldLabel>Contact Phone Number</FieldLabel>
                            <PhoneInput
                                style={{...styles, zIndex: 99}}
                                placeholder='+46 (271) 123-456'
                                enableSearch
                                disableSearchIcon
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: true
                                }}
                                onChange={(value) => this.handleChange(value, 'contact_phone_number')}
                            />
                        </FieldContainer>
                        <FieldRow>
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
                        </FieldRow>
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
  