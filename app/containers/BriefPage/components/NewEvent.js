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

export default class NewEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        start_time: null,
        end_time: null,
        venuesData: null,
        expected_guests: null,
        hourly_expected_guests: null,
        drinks_enabled: false,
        recee_required: false,
        cocktails_enabled: false,
        cocktails_per_guest: null,
        free_drinks_enabled: false,
        free_drinks_per_guest: null,
        comments: null,
        cash_collected_by: null,
        venue_id: null,
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
            start_time,
            end_time,
            expected_guests,
            hourly_expected_guests,
            drinks_enabled,
            recee_required,
            cocktails_enabled,
            cocktails_per_guest,
            free_drinks_enabled,
            free_drinks_per_guest,
            comments,
            cash_collected_by,
            venue_id,
          } = this.state;
        
        await createBriefEvent(
            briefs[currentBrief].id,
            {
                start_time,
                end_time,
                expected_guests,
                hourly_expected_guests,
                drinks_enabled,
                recee_required,
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

    render() {
        const {show, drinks_enabled, recee_required, cocktails_enabled, free_drinks_enabled, venuesData, expected_guests, hourly_expected_guests, cocktails_per_guest, free_drinks_per_guest} = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open}>+ New Event</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldRow>
                            <FieldContainer>
                                <FieldLabel>Start Time</FieldLabel>
                                <DatePicker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    ranges={[
                                    {
                                        label: 'Now',
                                        value: new Date()
                                    }
                                    ]}
                                    onChange={(value) => this.handleChange(value, 'start_time')}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldLabel>End Time</FieldLabel>
                                <DatePicker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    ranges={[
                                    {
                                        label: 'Now',
                                        value: new Date()
                                    }
                                    ]}
                                    onChange={(value) => this.handleChange(value, 'end_time')}
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
                                <FieldLabel>Options</FieldLabel>
                                <FieldRow>
                                    <Checkbox onChange={(value) => this.handleChange(!drinks_enabled, 'drinks_enabled')}>Enable Drinks</Checkbox>
                                    <Checkbox onChange={(value) => this.handleChange(!recee_required, 'recee_required')}>Recee Required</Checkbox>
                                </FieldRow>
                            </FieldContainer>
                        </FieldRow>
                        {drinks_enabled && (
                            <FieldRow>
                                <FieldContainer>
                                    <FieldLabel>Cocktails</FieldLabel>
                                    <Checkbox onChange={(value) => this.handleChange(!cocktails_enabled, 'cocktails_enabled')}>Enable Cocktails</Checkbox>
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
                                    <Checkbox onChange={(value) => this.handleChange(!free_drinks_enabled, 'free_drinks_enabled')}>Enable Free Drinks</Checkbox>
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
                            <FieldLabel>Venue</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={venuesData}
                                onChange={(value) => this.handleChange(value, 'venue_id')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Cash Collected by</FieldLabel>
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
  