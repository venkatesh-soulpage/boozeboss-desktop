import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EventList from './EventList';
import EventInfo from './EventInfo';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2em 2em 0 2em;
`;

export default class EventsContainer extends Component {

    state = {
        currentEvent: 0,
    }

    handleSelectCurrentEvent = currentEvent => {
        this.setState({currentEvent})
    }

    render() {
        return (
            <StyledContainer>
                <EventList
                    {...this.props} 
                    {...this.state}
                    handleSelectCurrentEvent={this.handleSelectCurrentEvent}
                />
                <EventInfo 
                    {...this.props} 
                    {...this.state}
                    handleSelectCurrentEvent={this.handleSelectCurrentEvent}
                /> 
            </StyledContainer>
        )
    }
}

EventsContainer.propTypes = {};
