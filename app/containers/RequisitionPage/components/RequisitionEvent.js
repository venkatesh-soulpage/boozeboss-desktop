import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Divider } from 'rsuite';
import moment from 'moment';
import AddNewRequisitionOrder from './AddNewRequisitionOrder';

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
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
    render() {
        const {event} = this.props;
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
                    <FieldLabelAction>
                        <AddNewRequisitionOrder {...this.props}/>
                        <a>Show Products</a>
                    </FieldLabelAction>
                </FieldRow>
                <Divider />
            </div>
        )
    }
}
