import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, Checkbox, Panel} from 'rsuite'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';
import CSVReader from "react-csv-reader";

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2em 1em 1em 1em;
    align-items: center;
`;

const FieldLabel = styled.b`
    margin: 1em 0.5em 0.5em 0;
`;

const styles = {
    width: '300px',
    margin: '0.75em 0 0 0'
  }

const StyledPanel = styled(Panel)` 
  min-width: 300px;
`

const StyledButton = styled(Button)`
  margin: 1em 0 0 0;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`


export default class ImportGuestList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        guests: null,
        uploadIndex: 0,
      };
    }

    close = () => {
        this.setState({show: false, guests: null, uploadIndex: 0});
    }

    open = () => {
      this.setState({ show: true });
    }

    loadGuests = (data, fileInfo) => {
        this.setState({guests: data});
    }

    uploadGuest = async (guest) => { 
        const {inviteGuest, events, currentEvent, roles} = this.props;  
        // Validate role and first name
        // guest[0] - role
        // guest[1] - first_name

        if (!guest[0] || !guest[1]) return; 

        const role = roles.find(role => role.name === guest[0]);
        if (!role) return;

        await inviteGuest({
            role_id: role.id,
            first_name: guest[1], 
            last_name: guest[2], 
            email: guest[3], 
            phone_number: guest[4], 
            event_id: events[currentEvent].event.id, 
            send_email: false
        });

        await this.setState({uploadIndex: this.state.uploadIndex + 1});
    }

    validateColumnOrder = (columns) => {
        if (columns[0] !== 'role') return false;
        if (columns[1] !== 'first_name') return false;
        if (columns[2] !== 'last_name') return false;
        if (columns[3] !== 'email') return false;
        if (columns[4] !== 'phone_number') return false;
        return true;
    }

    import = async () => {
        const {guests} = this.state;
        if (!guests || guests.length < 1) return alert('Invalid import');
    
        const is_correct_column_order = this.validateColumnOrder(guests[0])

        if (!is_correct_column_order) return alert('Invalid column order');

        const only_guests = guests.slice(1);
        for (const guest of only_guests) {
            setTimeout(async () => { 
                await this.uploadGuest(guest);
            }, 100)
        }

    }

    render() {
        const {show, guests, uploadIndex} = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open} style={{width: '200px'}}>Import</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>    
                        <p>To upload guests you need a <b>CSV</b> file with the following columns:</p>
                        <ul>
                            <li><p><b>role</b>: (Required) REGULAR, VIP, VVIP</p></li>
                            <li><p><b>first_name</b>: (Required) Text</p></li>
                            <li><p><b>last_name</b>: (Optional) Text</p></li>
                            <li><p><b>email</b>: (Optional) Email</p></li>
                            <li><p><b>phone_number</b>: (Optional) Phone Number</p></li>
                        </ul>
                        <FieldContainer>
                            {guests && guests.length > 0 ? (
                                <StyledPanel bordered>
                                    <Row>
                                        <p>{guests.length - 1} guests</p>
                                        {uploadIndex > 0 && (
                                            <p style={{margin: 0}}>{Math.round(uploadIndex / (guests.length - 1) * 100)}%</p>
                                        )}
                                    </Row>
                                    <StyledButton color="blue" block onClick={this.import} disabled={uploadIndex > 0}>Import</StyledButton>
                                </StyledPanel>
                            ) : (
                                <Panel bordered>
                                    <CSVReader onFileLoaded={this.loadGuests} /> 
                                </Panel>  
                            )}
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.close} appearance="subtle">
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
  }
  