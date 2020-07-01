import React, { Component } from 'react'
import {Modal, Button, Input, DatePicker, InputNumber, Checkbox, SelectPicker} from 'rsuite'
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

const StyledButton = styled(Button)`
    margin: 1em 0 1em 0;
`

export default class NewEvent extends React.Component {
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
        drinks_enabled: true,
        recee_required: false,
        recee_time: null,
        cocktails_enabled: false,
        cocktails_per_guest: 1,
        free_drinks_enabled: false,
        free_drinks_per_guest: 1,
        comments: null,
        cash_collected_by: null,
        venue_id: null,
      };
    }

    close = () => {
      this.setState({ show: false });
      this.reset();
    }

    open = () => {
      this.setState({ show: true });
      this.getPickerData();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    handleDateChange = (value, name) => {
        const {agency} = this.props;
        const {setup_time, start_time, end_time} = this.state;

        const sla_limit = (new Date()).setHours((new Date()).getHours() + agency.sla_hours_before_event_creation);


        if (value.getTime() < sla_limit) {
            this.setState({[name]: null});
            return alert("You can't select this date because of the SLA terms.");
        } else {
           // Validate dates
            switch (name) {
                case 'setup_time':
                    const after_start_time = start_time && value.getTime() >= start_time.getTime();
                    const after_end_time = end_time && value.getTime() >= end_time.getTime();
                    if (after_start_time) {
                        alert('Setup time should be before start time');
                        this.setState({[name]: null})
                    } else if (after_end_time) {
                        alert('Setup time should be before end time');
                        this.setState({[name]: null})
                    } else {
                        this.setState({[name]: value})
                    };
                    break;
                case 'start_time': 
                    const start_before_setup_time = setup_time && value.getTime() <= setup_time.getTime();
                    const start_after_end_time = end_time && value.getTime() >= end_time.getTime();
                    if (start_before_setup_time) {
                        alert('Start time should be after setup time');
                        this.setState({[name]: null});
                    } else if (start_after_end_time) {
                        alert('Start time should be before setup time');
                        this.setState({[name]: null});
                    } else {
                        this.setState({[name]: value})
                    };
                    break;
                case 'end_time': 
                    const end_before_setup_time = setup_time && value.getTime() <= setup_time.getTime();
                    const end_before_start_time = start_time && value.getTime() <= start_time.getTime();
                    if (end_before_setup_time) {
                        alert('End time should be after start time');
                        this.setState({[name]: null});
                    } else if (end_before_start_time) {
                        alert('End time should be after start time');
                        this.setState({[name]: null});
                    } else {
                        this.setState({[name]: value})
                    };
                    break;
                default: 
                    return;
            }

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

    addEvent = async () => {
        const {createBriefEvent, briefs, currentBrief} = this.props;
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
        
        if (!name || !setup_time || !start_time || !end_time || !expected_guests || !hourly_expected_guests || !cash_collected_by || !venue_id  ) return alert('Missing fields');
 
        await createBriefEvent(
            briefs[currentBrief].id,
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
                cocktails_per_guest: cocktails_enabled ? cocktails_per_guest : 0,
                free_drinks_enabled,
                free_drinks_per_guest: free_drinks_enabled  ? free_drinks_per_guest : 0,
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
        const {agency} = this.props;
        const { show, name, setup_time, start_time, end_time, drinks_enabled, recee_required, recee_time, cocktails_enabled, free_drinks_enabled, venuesData, expected_guests, hourly_expected_guests, cocktails_per_guest, free_drinks_per_guest} = this.state;
        return (
            <React.Fragment>
                <StyledButton  onClick={this.open} color="green">+ New Event</StyledButton>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                                <FieldLabel>Event Name (Required)</FieldLabel>
                                <Input 
                                    onChange={(value) => this.handleChange(value, 'name')}
                                    value={name}
                                /> 
                            </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Setup Time (Required)</FieldLabel>
                            <DatePicker
                                value={setup_time}
                                format="DD-MM-YYYY HH:mm"
                                ranges={[
                                {
                                    label: `SLA (+${agency.sla_hours_before_event_creation} hours)`,
                                    value: (new Date()).setHours((new Date()).getHours() + agency.sla_hours_before_event_creation),
                                    closeOverlay: true
                                }
                                ]}
                                onOk={(value) => this.handleDateChange(value, 'setup_time')}
                            />
                        </FieldContainer>
                        <FieldRow>
                            <FieldContainer>
                                <FieldLabel>Start Time (Required)</FieldLabel>
                                <DatePicker
                                    value={start_time}
                                    format="DD-MM-YYYY HH:mm"
                                    ranges={[
                                    {
                                        label: `SLA (+${agency.sla_hours_before_event_creation} hours)`,
                                        value: (new Date()).setHours((new Date()).getHours() + agency.sla_hours_before_event_creation),
                                        closeOverlay: true
                                    }
                                    ]}
                                    onOk={(value) => this.handleDateChange(value, 'start_time')}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldLabel>End Time (Required)</FieldLabel>
                                <DatePicker
                                    value={end_time}
                                    format="DD-MM-YYYY HH:mm"
                                    ranges={[
                                    {
                                        label: `SLA (+${agency.sla_hours_before_event_creation} hours)`,
                                        value: (new Date()).setHours((new Date()).getHours() + agency.sla_hours_before_event_creation),
                                        closeOverlay: true
                                    }
                                    ]}
                                    onOk={(value) => this.handleDateChange(value, 'end_time')}
                                />
                            </FieldContainer>
                        </FieldRow>
                        <FieldRow>
                            <FieldContainer>
                                <FieldLabel>Expected Guests (Required)</FieldLabel>
                                <InputNumber 
                                    onChange={(value) => this.handleChange(value, 'expected_guests')}
                                    value={expected_guests}
                                /> 
                            </FieldContainer>
                            <FieldContainer>
                                <FieldLabel>Expected Hourly Guests (Required)</FieldLabel>
                                <InputNumber 
                                    value={hourly_expected_guests}
                                    onChange={(value) => this.handleChange(value, 'hourly_expected_guests')}
                                /> 
                            </FieldContainer>
                        </FieldRow>
                        {drinks_enabled && (
                            <FieldRow>
                                <FieldContainer>
                                    <FieldLabel>Cocktails</FieldLabel>
                                    <Checkbox defaultChecked={cocktails_enabled} onChange={(value) => this.handleChange(!cocktails_enabled, 'cocktails_enabled')}>Enable Cocktails Limit</Checkbox>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Max cocktails per guest</FieldLabel>
                                    <InputNumber 
                                        min={1}
                                        disabled={!cocktails_enabled}
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
                                    <Checkbox defaultChecked={free_drinks_enabled} onChange={(value) => this.handleChange(!free_drinks_enabled, 'free_drinks_enabled')}>Enable Redeemable Cocktails</Checkbox>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Cocktails per Guest</FieldLabel>
                                    <InputNumber 
                                        disabled={!free_drinks_enabled}
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
                                    <Checkbox disabled={!start_time} onChange={(value) => this.handleChange(!recee_required, 'recee_required')}>Recee Required</Checkbox>
                                </FieldRow>
                            </FieldContainer>
                        </FieldRow> 
                        { recee_required && (
                            <FieldRow>
                                <FieldContainer>
                                    <FieldLabel>Recee Time</FieldLabel>
                                    <DatePicker
                                        value={recee_time}
                                        format="DD-MM-YYYY HH:mm"
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
                                componentClass="textarea"
                                rows={3}
                                style={{resize: 'auto' }}
                                onChange={(value) => this.handleChange(value, 'comments')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldRow>
                                <FieldLabel>Venue (Required)</FieldLabel>
                                <a onClick={() => this.goToRoute('/clients')}>+ Add new venue</a>
                            </FieldRow>
                            <SelectPicker 
                                searchable={false}
                                data={venuesData}
                                onChange={(value) => this.handleChange(value, 'venue_id')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Cash Collected by (Required)</FieldLabel>
                            <SelectPicker 
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
                    <Button onClick={this.addEvent} color="green">
                        Add Event
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
  