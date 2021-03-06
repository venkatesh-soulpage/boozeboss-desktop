import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Divider, Icon } from 'rsuite';
import moment from 'moment';
import AddNewRequisitionOrder from './AddNewRequisitionOrder';
import ProductOrders from './ProductOrders';
import AddEventCredits from './AddEventCredits';
import EventFundingLogs from './EventFundingLogs';
import RoleValidator from 'components/RoleValidator';

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const FieldLabel = styled.div`
    display: flex;
    flex: 1;
`

const FieldLabelAction = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

export default class RequisitionEvent extends Component {

    calculateEventFunding = () => {
        const {event, requisitions, currentRequisition, user} = this.props;
        
        if (!event || !requisitions || !user || !user.location) return '-';

        const accumulated_price =
                requisitions[currentRequisition].orders
                    .filter(order => order.brief_event_id === event.id)
                    .reduce((acc, curr) => {
                       return acc + (curr.price * curr.units); 
                    }, 0)

        return Math.round(accumulated_price * user.location.currency_conversion * 100) / 100;
    }

    render() {
        const {event, requisitions, currentRequisition} = this.props;
        return (
            <div>
                <FieldRow>
                    <FieldLabel>
                        {event.name}
                    </FieldLabel> 
                    <FieldLabel>
                        {moment(event.start_time).format('DD/MM/YY hh:mm')}
                    </FieldLabel> 
                    <FieldLabel>
                        {moment(event.end_time).format('DD/MM/YY hh:mm')}
                    </FieldLabel> 
                    <FieldLabel>
                        {event.venue.name}
                    </FieldLabel>
                    <FieldLabel>
                        {event.expected_guests}
                    </FieldLabel>
                    <FieldLabel>
                        <span>{event && event.event && requisitions[currentRequisition].status === 'APPROVED' && `${event.event.credits_left} / `}{this.calculateEventFunding()} <Icon icon="circle" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/></span>
                    </FieldLabel>
                    {event.event && (
                        <FieldLabel>
                            <span>{event.event.total_credits_funded} <Icon icon="circle" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/></span>
                        </FieldLabel>
                    )}
                    <FieldLabelAction>
                        {(requisitions[currentRequisition].status === 'DRAFT' || requisitions[currentRequisition].status === 'CHANGES REQUIRED' ) && (
                            <AddNewRequisitionOrder {...this.props}/>
                        )}
                        <ProductOrders {...this.props}/>
                        <EventFundingLogs {...this.props} />
                        {event && event.event && requisitions[currentRequisition].status === 'APPROVED' && (
                            <RoleValidator
                                {...this.props}
                                scopes={['BRAND']}
                                roles={['OWNER', 'MANAGER']}
                            >   
                                {event && event.event && !event.event.already_refunded && (
                                    <AddEventCredits 
                                        {...this.props}
                                    />
                                )}
                            </RoleValidator>
                        )}
                    </FieldLabelAction>
                </FieldRow>
                <Divider />
            </div>
        )
    }
}
