import React, { Component } from 'react'
import {Modal, Button, Input, DatePicker, InputNumber, Checkbox, SelectPicker, IconButton, Icon} from 'rsuite'
import styled from 'styled-components';

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`

const FieldContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 1.5em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const StyledButton = styled(IconButton)`
`

export default class UpdateBriefEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        name: null,
        setup_time: null,
        start_time: null,
        end_time: null,
        venuesData: null,
        expected_guests: null,
        hourly_expected_guests: null,
        drinks_enabled: false,
        recee_required: false,
        recee_time: null,
        cocktails_enabled: false,
        cocktails_per_guest: null,
        free_drinks_enabled: false,
        free_drinks_per_guest: null,
        comments: null,
        cash_collected_by: null,
        venue_id: null,
      };
    }

    populateFields = () => {
        const {event} = this.props;
        this.setState({...event});
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
      this.populateFields();
      this.getPickerData();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    handleDateChange = (value, name) => {
        const {agency} = this.props;

        const sla_limit = (new Date()).setHours((new Date()).getHours() + agency.sla_hours_before_event_creation);


        if (value.getTime() < sla_limit) {
            this.setState({[name]: null});
            return alert("You can't select this date because of the SLA terms.");
        } else {
            this.setState({[name]: value});
        }
    }

    // Handle recee time so it is done before the event date
    handleReceeChange = (value, name) => {
        const {start_time} = this.state;

        if (value.getTime() >= start_time.getTime()) {
            this.setState({recee_time: null});
            return alert('Recee date should be before the event Start time');
        } else {
            this.handleChange(value, name);
        }

       
    }

    getPickerData = ()  => {
        const {venues} = this.props;
        if (!venues) return [];
        const venuesData = venues.map(venue => {
            return {
                label: `${venue.name} (${venue.address.length > 60 ? `${venue.address.substring(0,60)}...` : venue.address})`,
                value: venue.id,
                role: venue.name,
            }
        })
        this.setState({venuesData});
    }

    updateEvent = async () => {
        const {updateBriefEvent, brief, event} = this.props;
        const {
            name,
            setup_time,
            start_time,
            end_time,
            expected_guests,
            hourly_expected_guests,
            drinks_enabled,
            recee_required,
            recee_time,
            cocktails_enabled,
            cocktails_per_guest,
            free_drinks_enabled,
            free_drinks_per_guest,
            comments,
            cash_collected_by,
            venue_id,
          } = this.state;
        
        await updateBriefEvent(
            brief.id,
            event.id,
            {
                name,
                setup_time,
                start_time,
                end_time,
                expected_guests,
                hourly_expected_guests,
                drinks_enabled,
                recee_required,
                recee_time,
                cocktails_enabled,
                cocktails_per_guest,
                free_drinks_enabled,
                free_drinks_per_guest,
                comments,
                cash_collected_by,
                venue_id,
                status: 'CURRENT'
            }
        )
        this.close();
    }

    goToRoute = (pathname) => {
        this.props.history.push({
            pathname,
            showVenueModal: true,
        });
    }

    reset = () => {
        this.setState({
            name: null,
            setup_time: null,
            start_time: null,
            end_time: null,
            expected_guests: null,
            hourly_expected_guests: null,
            drinks_enabled: false,
            recee_required: false,
            recee_time: null,
            cocktails_enabled: false,
            cocktails_per_guest: null,
            free_drinks_enabled: false,
            free_drinks_per_guest: null,
            comments: null,
            cash_collected_by: null,
            venue_id: null,
        })
    }

    render() {
        const {brief} = this.props;
        const { show, name, setup_time, start_time, end_time, drinks_enabled, recee_required, recee_time, cocktails_enabled, free_drinks_enabled, venuesData, expected_guests, hourly_expected_guests, cocktails_per_guest, free_drinks_per_guest, comments, venue_id, cash_collected_by} = this.state;
        return (
            <React.Fragment>
                <StyledButton  onClick={this.open} icon={<Icon icon="edit"/>} />
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                                <FieldLabel>Event Name</FieldLabel>
                                <Input 
                                    onChange={(value) => this.handleChange(value, 'name')}
                                    value={name}
                                /> 
                            </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Setup Time</FieldLabel>
                            <DatePicker
                                value={setup_time}
                                format="YYYY-MM-DD HH:mm"
                                ranges={[
                                {
                                    label: `SLA (+${brief.agency.sla_hours_before_event_creation} hours)`,
                                    value: (new Date()).setHours((new Date()).getHours() + brief.agency.sla_hours_before_event_update),
                                    closeOverlay: true
                                }
                                ]}
                                onOk={(value) => this.handleDateChange(value, 'setup_time')}
                            />
                        </FieldContainer>
                        <FieldRow>
                            <FieldContainer>
                                <FieldLabel>Start Time</FieldLabel>
                                <DatePicker
                                    value={start_time}
                                    format="YYYY-MM-DD HH:mm"
                                    ranges={[
                                    {
                                        label: `SLA (+${brief.agency.sla_hours_before_event_creation} hours)`,
                                        value: (new Date()).setHours((new Date()).getHours() + brief.agency.sla_hours_before_event_creation),
                                        closeOverlay: true
                                    }
                                    ]}
                                    onOk={(value) => this.handleDateChange(value, 'start_time')}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldLabel>End Time</FieldLabel>
                                <DatePicker
                                    value={end_time}
                                    format="YYYY-MM-DD HH:mm"
                                    ranges={[
                                    {
                                        label: `SLA (+${brief.agency.sla_hours_before_event_creation} hours)`,
                                        value: (new Date()).setHours((new Date()).getHours() + brief.agency.sla_hours_before_event_creation),
                                        closeOverlay: true
                                    }
                                    ]}
                                    onOk={(value) => this.handleDateChange(value, 'end_time')}
                                />
                            </FieldContainer>
                        </FieldRow>
                        <FieldRow>
                            <FieldContainer>
                                <FieldLabel>Expected Guests</FieldLabel>
                                <InputNumber 
                                    onChange={(value) => this.handleChange(value, 'expected_guests')}
                                    value={expected_guests}
                                /> 
                            </FieldContainer>
                            <FieldContainer>
                                <FieldLabel>Expected Hourly Guests</FieldLabel>
                                <InputNumber 
                                    value={hourly_expected_guests}
                                    onChange={(value) => this.handleChange(value, 'hourly_expected_guests')}
                                /> 
                            </FieldContainer>
                        </FieldRow>
                        <FieldRow>
                            <FieldContainer>
                                <FieldLabel>Drink Options</FieldLabel>
                                <FieldRow>
                                    <Checkbox defaultChecked={drinks_enabled} onChange={(value) => this.handleChange(!drinks_enabled, 'drinks_enabled')}>Enable Drinks</Checkbox>
                                </FieldRow>
                            </FieldContainer>
                        </FieldRow>
                        {drinks_enabled && (
                            <FieldRow>
                                <FieldContainer>
                                    <FieldLabel>Cocktails</FieldLabel>
                                    <Checkbox defaultChecked={cocktails_enabled} onChange={(value) => this.handleChange(!cocktails_enabled, 'cocktails_enabled')}>Enable Cocktails</Checkbox>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Cocktails per guest</FieldLabel>
                                    <InputNumber 
                                        value={cocktails_per_guest}
                                        onChange={(value) => this.handleChange(value, 'cocktails_per_guest')}
                                    /> 
                                </FieldContainer>
                            </FieldRow>
                        )}
                        {drinks_enabled && (
                            <FieldRow>
                                <FieldContainer>
                                    <FieldLabel>Free Drinks</FieldLabel>
                                    <Checkbox defaultChecked={free_drinks_enabled} onChange={(value) => this.handleChange(!free_drinks_enabled, 'free_drinks_enabled')}>Enable Free Drinks</Checkbox>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Credits per guest</FieldLabel>
                                    <InputNumber 
                                        onChange={(value) => this.handleChange(value, 'free_drinks_per_guest')}
                                        value={free_drinks_per_guest}
                                    /> 
                                </FieldContainer>
                            </FieldRow>
                        )}   
                        <FieldRow>
                            <FieldContainer>
                                <FieldLabel>Recee Options</FieldLabel>
                                <FieldRow>
                                    <Checkbox defaultChecked={recee_required} onChange={(value) => this.handleChange(!recee_required, 'recee_required')}>Recee Required</Checkbox>
                                </FieldRow>
                            </FieldContainer>
                        </FieldRow> 
                        { recee_required && start_time && (
                            <FieldRow>
                                <FieldContainer>
                                    <FieldLabel>Recee Time</FieldLabel>
                                    <DatePicker
                                        value={recee_time}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        ranges={[
                                        {
                                            label: 'Now',
                                            value: new Date()
                                        }
                                        ]}
                                        onOk={(value) => this.handleReceeChange(value, 'recee_time')}
                                    />
                                </FieldContainer>
                            </FieldRow> 
                        )}  
                        <FieldContainer>
                            <FieldLabel>Comments</FieldLabel>
                            <Input 
                                value={comments}
                                componentClass="textarea"
                                rows={3}
                                style={{resize: 'auto' }}
                                onChange={(value) => this.handleChange(value, 'comments')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldRow>
                                <FieldLabel>Venue</FieldLabel>
                                <a onClick={() => this.goToRoute('/clients')}>+ Add new venue</a>
                            </FieldRow>
                            <SelectPicker
                                defaultValue={venue_id} 
                                searchable={false}
                                data={venuesData}
                                onChange={(value) => this.handleChange(value, 'venue_id')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Cash Collected by</FieldLabel>
                            <SelectPicker 
                                defaultValue={cash_collected_by}
                                searchable={false}
                                data={[
                                    {
                                        label: 'Agency',
                                        value: 'AGENCY',
                                        role: 'AGENCY',
                                    },{
                                        label: 'Venue Owner',
                                        value: 'VENUE',
                                        role: 'VENUE',
                                    }]}
                                onChange={(value) => this.handleChange(value, 'cash_collected_by')}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.updateEvent} color="green">
                        Update Event
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
  