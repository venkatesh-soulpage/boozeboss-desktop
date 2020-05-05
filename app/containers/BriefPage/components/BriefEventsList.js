import React, { Component } from 'react'
import { Panel, Divider, Button, IconButton, Icon } from 'rsuite';
import styled from 'styled-components';
import moment from 'moment';
import UpdateBriefEvent from './UpdateBriefEvent';
import DeleteBriefEventConfirm from './DeleteBriefEventConfirm';

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

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;
class BriefCard extends Component {
    render() {
        const {event, brief} = this.props;
        return (
            <StyledEvent bordered shaded>
                <FieldsRow isHeader>
                    <FieldContainer>
                        <FieldLabel>Event Name</FieldLabel>
                        <p>{event.name}</p>
                    </FieldContainer>
                    {brief.status === 'DRAFT' && (
                        <FieldContainer centered>
                            <FieldLabel>Actions</FieldLabel>
                            <FieldsRow>
                                    <UpdateBriefEvent event={event} {...this.props}/>
                                    <DeleteBriefEventConfirm event={event} {...this.props}/>
                            </FieldsRow>
                        </FieldContainer>
                    )}
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
            </StyledEvent>
        )
    }
}

export default class BriefEventsList extends Component {
    render() {
        const {brief} = this.props;
        return (
            <React.Fragment>
                { brief &&
                    brief.brief_events && 
                    brief.brief_events.length > 0 ? (
                        <React.Fragment>
                            {brief.brief_events.map(event => <BriefCard {...this.props} event={event}/>)}
                        </React.Fragment>
                    ) : (
                        <p>No events</p>
                    )}
            </React.Fragment>
        )
    }
}
