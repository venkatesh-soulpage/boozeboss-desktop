import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker} from 'rsuite'
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
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
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

    invite = async () => {
        const {inviteGuest, events, currentEvent} = this.props;
        const {first_name, last_name, email, phone_number} = this.state;
        if ( !first_name) return alert('Missing fields');
        await inviteGuest({first_name, last_name, email, phone_number, event_id: events[currentEvent].event.id});
        this.close();
    }

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open} color="green">+ Add Guest</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
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
                                style={{...styles, zIndex: 99}}
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
  