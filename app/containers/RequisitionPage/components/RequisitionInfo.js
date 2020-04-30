import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Divider } from 'rsuite';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import RequisitionEvent from './RequisitionEvent';
import RequisitionProduct from './RequisitionProduct';

const { Column, HeaderCell, Cell } = Table;

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

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1em 0 0 0;
`

const FieldHeader = styled.div`
    display: flex;
    flex: 1;
`

export default class RequisitionInfo extends Component {

  render() {
    const { requisitions, scope, role, currentRequisition } = this.props;
        return (
            <InfoContainer>
                {(!requisitions || requisitions.length < 1) && <ClientsLabel>No Requisitions</ClientsLabel> }
                {requisitions &&
                    requisitions.length > 0 && (
                        <Panel bordered>
                            <DataContainer>
                                <FieldContainer>
                                    <FieldLabel>ID</FieldLabel>
                                    <p>#{requisitions[currentRequisition].id}</p>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Products</FieldLabel>
                                    {requisitions[currentRequisition].brief && 
                                        requisitions[currentRequisition].brief.products &&
                                        requisitions[currentRequisition].brief.products.map(p => <RequisitionProduct {...this.props} brief_product={p} requisition={requisitions[currentRequisition]}/>)}
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Events</FieldLabel>
                                    <FieldRow>
                                        <FieldHeader><b>Name</b></FieldHeader>
                                        <FieldHeader><b>Start Time</b></FieldHeader>
                                        <FieldHeader><b>End Time</b></FieldHeader>
                                        <FieldHeader><b>Venue</b></FieldHeader>
                                        <FieldHeader><b>Expected Guests</b></FieldHeader>
                                        <FieldHeader><b>Requisition</b></FieldHeader>
                                    </FieldRow>
                                    <Divider />
                                    {requisitions[currentRequisition].brief && 
                                        requisitions[currentRequisition].brief.brief_events &&
                                        requisitions[currentRequisition].brief.brief_events.map(be => <RequisitionEvent {...this.props} brief={requisitions[currentRequisition].brief} event={be}/>)}
                                </FieldContainer>
                                
                            </DataContainer>
                        </Panel>
                    )}
            </InfoContainer>
    );
  }
}

RequisitionInfo.propTypes = {};
