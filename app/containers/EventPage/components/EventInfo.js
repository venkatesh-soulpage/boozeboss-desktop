import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider } from 'rsuite';
import RoleValidator from 'components/RoleValidator';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import moment from 'moment';
import GuestList from './GuestList';

const { Column, HeaderCell, Cell } = Table;

const StyledEvent = styled(Panel)`
    margin: 0.5em 0 0.5em 0;
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 1em 10px 0;
    min-width: 150px;
    ${props => props.centered && 'align-items: center;'}
`;

const FieldsRow = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-wrap: wrap;
    ${props => props.isHeader && 'justify-content: space-between;'}
`;

const FieldLabelContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const StyledMessage = styled(Message)`
    margin: 0 0 1em 0;
`

const InfoContainer = styled.div`
  display: flex;
    flex-direction: column;
    flex: 3;
    margin: 0 2em 0 2em;
`;

const ClientsLabel = styled.p`
  font-size: 1.25em;
`;
const DataContainer = styled.div`
  display: flex;
    flex-direction: column;
`;

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`

class EventCard extends Component {
    render() {
        const {event} = this.props;
        return (
            <StyledEvent bordered shaded>
                <FieldsRow isHeader>
                    <FieldContainer>
                        <FieldLabel>Event Name</FieldLabel>
                        <p>{event.name}</p>
                    </FieldContainer>
                </FieldsRow>
                <Divider />
                <FieldsRow>
                    <FieldContainer>
                        <FieldLabel>Setup Time</FieldLabel>
                        <p>{moment(event.setup_time).format('DD/MM/YYYY LT')}</p>
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Start Time</FieldLabel>
                        <p>{moment(event.start_time).format('DD/MM/YYYY LT')}</p>
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>End Time</FieldLabel>
                        <p>{moment(event.end_time).format('DD/MM/YYYY LT')}</p>
                    </FieldContainer>
                </FieldsRow>
                <FieldsRow>
                    <FieldContainer>
                        <FieldLabel>
                            Venue
                        </FieldLabel>
                        <p>{event.venue.name}</p>
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Expected Guests</FieldLabel>
                        <p>{event.expected_guests}</p>
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Expected Hourly Guests</FieldLabel>
                        <p>{event.hourly_expected_guests}</p>
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Cash collected by</FieldLabel>
                        <p>{event.cash_collected_by}</p>
                    </FieldContainer>
                </FieldsRow>
                <FieldsRow>
                    <FieldContainer>
                        <FieldLabel>Recee Required</FieldLabel>
                        <p>{event.recee_required ? 'Yes' : 'No'}</p>
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Recee Time</FieldLabel>
                        <p>{event.recee_time ? moment(event.recee_time).format('DD/MM/YYYY LT') : 'N/A'}</p>
                    </FieldContainer>
                </FieldsRow>
                <FieldsRow>
                    <FieldContainer>
                        <FieldLabel>Cocktails</FieldLabel>
                        <p>{event.cocktails_enabled ? 'Yes' : 'No'}</p>
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Cocktails Limit</FieldLabel>
                        <p>{event.drinks_enabled ? `Yes (${event.cocktails_per_guest} per guest)` : 'No'}</p>
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Free Drinks Limit</FieldLabel>
                        <p>{event.free_drinks_enabled ? `Yes (${event.free_drinks_per_guest} per guest)` : 'No'}</p>
                    </FieldContainer>
                </FieldsRow>
                <Divider />
                <FieldsRow>
                    <FieldContainer>
                        <FieldLabel>Comments</FieldLabel>
                        <p>{event.comments}</p>
                    </FieldContainer>
                </FieldsRow>
                <Divider />
                <GuestList 
                    {...this.props}
                />
            </StyledEvent>
        )
    }
}

export default class EventInfo extends Component {

  render() {
    const { events, scope, role, currentEvent, error, success, dismiss } = this.props;
    return (
        <InfoContainer>
            {(!events || events.length < 1) && <ClientsLabel>No Events</ClientsLabel> }
            {error && <StyledMessage showIcon closable type="error" description={error} onClose={() => dismiss('error')}/>}
            {success && <StyledMessage showIcon closable type="success" description={success} onClose={() => dismiss('success')} />}
            {events &&
            events.length > 0 && (
                <EventCard 
                    {...this.props}
                    event={events[currentEvent]}
                />
            )}
        </InfoContainer>
    );
  }
}

EventInfo.propTypes = {};
