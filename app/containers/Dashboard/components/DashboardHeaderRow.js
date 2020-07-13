import React, { Component } from 'react';
import { Panel } from 'rsuite'; 
import styled from 'styled-components';


const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: black;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${props => props.flex || '1'};
    font-weight: bold;
    align-items: center;
`

export default class DashboardHeaderRow extends Component {
    render() {
        const {event} = this.props;
        return (
            <StyledRow>
                <StyledColumn>
                    Ending In
                </StyledColumn>
                <StyledColumn>
                    Brief
                </StyledColumn>
                <StyledColumn>
                    Event
                </StyledColumn>
                <StyledColumn>
                    Checked-In / Invited
                </StyledColumn>
                <StyledColumn>
                    In Venue / Checked-In
                </StyledColumn>
                <StyledColumn>
                    Sales (Volume)
                </StyledColumn>
                <StyledColumn>
                    Sales (Value)
                </StyledColumn>
            </StyledRow>
        )
    }
}
