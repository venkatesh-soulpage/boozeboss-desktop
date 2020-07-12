import React, { Component } from 'react';
import { Panel } from 'rsuite'; 
import styled from 'styled-components';
import moment from 'moment';

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 60px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: gray;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: ${props => props.flex || '1'};
`

export default class DashboardRow extends Component {

    getGuestsCheckedIn = (event) => {
        const { guests } = event;
        const checked_in_guests = guests.filter(guest => guest.checked_in)
        const percentage = Math.round((checked_in_guests.length / (guests.length > 0 ? guests.length : 1)) * 10000) / 100;
        return `${checked_in_guests.length} / ${guests.length} (${percentage}%)`;
    }

    getCurrentGuests = (event) => {
        const {guests} = event;
        const checked_in_guests = guests.filter(guest => guest.checked_in);
        const checked_out_guests = guests.filter(guest => guest.check_out_time);
        const percentage = Math.round(((checked_in_guests.length - checked_out_guests.length) / (checked_in_guests.length > 0 ? checked_in_guests.length : 1)) * 10000) / 100;
        return `${checked_in_guests.length - checked_out_guests.length} / ${checked_in_guests.length} (${percentage}%)`
    }

    totalAmountSold = (event) => {
        const {products} = event;
        const amount = 
                products.reduce((acc, curr) => {
                    return acc + (curr.product.metric_amount * curr.transactions.length);
                }, 0)
        
        return `${amount / 1000} L`;
    }

    totalAmountSold = (event) => {
        const {products} = event;
        const amount = 
                products.reduce((acc, curr) => {
                    return acc + (curr.product.metric_amount * curr.transactions.length);
                }, 0)
        
        return `${amount / 1000} L`;
    }

    totalValueSold = (event) => {
        const {products} = event;
        const value = 
                products.reduce((acc, curr) => {
                    return acc + (curr.price * curr.transactions.length);
                }, 0)
        
        return value;
    }

    render() {
        const { event } = this.props;
         return (
            <StyledRow>
                <StyledColumn>
                    {moment(event.ended_at).fromNow(true)}
                </StyledColumn>
                <StyledColumn>
                    {event.brief_event.brief.name}
                </StyledColumn>
                <StyledColumn>
                    {event.brief_event.name}
                </StyledColumn>
                <StyledColumn>
                    {this.getGuestsCheckedIn(event)}
                </StyledColumn>
                <StyledColumn>
                    {this.getCurrentGuests(event)}
                </StyledColumn>
                <StyledColumn>
                    {this.totalAmountSold(event)}
                </StyledColumn>
                <StyledColumn>
                    {this.totalValueSold(event)} {event.brief_event.brief.client.location.currency}
                </StyledColumn>
            </StyledRow>
        )
    }
}
