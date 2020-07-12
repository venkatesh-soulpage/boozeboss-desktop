import React, { Component } from 'react'
import { Loader } from 'rsuite';
import moment from 'moment';
import styled from 'styled-components';

const StyledEventsSection = styled.div`
    display: flex; 
    flex-direction: column;
    flex: 1;
`

const StyledEventRow = styled.div`
    display: flex;
    flex-direction: row; 
    padding: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: gray;
`

const StyledEventColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${props => props.flex || '1'};
    font-weight: ${props => props.fontWeight || 'regular'};
    align-content: ${props => props.align || 'flex-start'};
`

class EventsHeader extends Component {

    render() {
        return (
            <StyledEventRow>
                <StyledEventColumn fontWeight="bold" flex={2}>
                    Event Name
                </StyledEventColumn>
                <StyledEventColumn fontWeight="bold">
                    Started At
                </StyledEventColumn>
                <StyledEventColumn fontWeight="bold">
                    Ended At
                </StyledEventColumn>
                <StyledEventColumn fontWeight="bold">
                    Summary
                </StyledEventColumn>
            </StyledEventRow>
        )
    }
}


class EventRow extends Component {

    handleEventReport = (event_id) => {
        const {downloadEventReport} = this.props;
        downloadEventReport(event_id);
    }

    render() {
        const {last_event} = this.props;
        console.log(last_event)
        return (
            <StyledEventRow>
                <StyledEventColumn flex={2}>
                   {last_event.name} 
                </StyledEventColumn>
                <StyledEventColumn align="center">
                    {moment(last_event.event.started_at).format('DD/MM/YYYY LT')}
                </StyledEventColumn>
                <StyledEventColumn align="center">
                    {moment(last_event.event.ended_at).format('DD/MM/YYYY LT')}
                </StyledEventColumn>
                <StyledEventColumn align="center">
                    <a onClick={() => this.handleEventReport(last_event.event.id)}>Summary</a>
                </StyledEventColumn>
            </StyledEventRow>
        )
    }
}

export default class LastEventsContainer extends Component {
    render() {
        const {last_events} = this.props;
        return (
            <div>
                {!last_events && <Loader />}
                {last_events &&
                    last_events.length > 0 ? (
                        <StyledEventsSection>
                            <EventsHeader />
                            {last_events
                                .sort((a,b) => new Date(b.event.ended_at).getTime() - new Date(a.event.ended_at).getTime())
                                .map(last_event => {
                                    return (
                                        <EventRow last_event={last_event} {...this.props}/>
                                    )
                                })}
                        </StyledEventsSection>
                    ) :(
                        <StyledEventsSection>
                            No last events.
                        </StyledEventsSection>
                    )}
            </div>
        )
    }
}
