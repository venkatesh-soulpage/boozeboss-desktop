import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, Checkbox} from 'rsuite'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const styles = {
    width: '300px',
    margin: '0.75em 0 0 0'
  }

export default class EventInviteGuest extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        role_options: null,
        role_id: null,
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        send_email: false,
      };
    }

    componentDidMount = () => {
        const {showVenueModal} = this.props.location;

        if (showVenueModal) {
            this.open();
        }
    }

    close = () => {
        this.setState({
            show: false,
            role_id: null,
            first_name: null,
            last_name: null,
            email: null,
            phone_number: null,
            send_email: false
        });
    }

    open = () => {
      this.setState({ show: true });
      this.getPickerData();
    }

    getPickerData = () => {
        const {roles} = this.props;
        if (!roles) return [];

        const role_options = roles.map(role => {
            return {
                label: role.name,
                value: role.id,
            }
        })

        this.setState({role_options});
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    invite = async () => {
        const {inviteGuest, events, currentEvent} = this.props;
        const { role_id, first_name, last_name, email, phone_number, send_email} = this.state;
        if ( !first_name || !role_id) return alert('Missing fields');
        console.log(events,events[currentEvent].event);
        await inviteGuest({role_id, first_name, last_name, email, phone_number, event_id: events[currentEvent].event.id, send_email});
        this.close();
    }

    render() {
        const {role_id, show, role_options, email, phone_number} = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open} color="green" style={{width: '200px'}}>+ Add Guest</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Event Role (Required)</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={role_options}
                                onChange={(value) => this.handleChange(value, 'role_id')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>First Name (Required)</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'first_name')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Last Name</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'last_name')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Email</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'email')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Phone Number</FieldLabel>
                            <PhoneInput
                                style={{width: '300px', zIndex: 99}}
                                
                                country={'us'} 
                                enableSearch
                                disableSearchIcon
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: true
                                }}
                                onChange={(value) => this.handleChange(value, 'phone_number')}
                            />
                        </FieldContainer>
                        { (email || phone_number) && (
                            <FieldContainer>
                                <FieldLabel>Share</FieldLabel>
                                {email && (
                                    <Checkbox 
                                        value={this.state.send_email}
                                        onChange={(value) => this.handleChange(!this.state.send_email, 'send_email')}
                                    >   
                                        Send Email?
                                    </Checkbox>
                                )}
                                {phone_number && (
                                    <Checkbox 
                                    value={this.state.send_sms}
                                    onChange={(value) => this.handleChange(!this.state.send_sms, 'send_sms')}
                                    disabled
                                >   
                                    Send SMS?
                                </Checkbox>
                                )}
                                
                            </FieldContainer>
                        )}
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
  