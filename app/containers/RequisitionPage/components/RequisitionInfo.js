import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Divider, Message } from 'rsuite';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import RequisitionEvent from './RequisitionEvent';
import RequisitionBrand from './RequisitionBrand';
import ConfirmSubmit from './ConfirmSubmit';
import RejectRequisition from './RejectRequisition';
import RequestModifications from './RequestModifications';
import ApproveRequisitionConfirm from './ApproveRequisitionConfirm';
import DeliverRequisitionOrders from './DeliverRequisitionOrders';
import Deliveries from './Deliveries';
import AddNewDelivery from './AddNewDelivery';
import RoleValidator from 'components/RoleValidator';

const { Column, HeaderCell, Cell } = Table;

const InfoContainer = styled.div`
  display: flex;
    flex-direction: column;
    flex: 3;
    margin: 0 2em 2em 2em;
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
    ${props => props.align && `align-items: ${props.align};`}
`;

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1em 0 0 0;
    justify-content: space-between;
    align-content: center;
`

const FieldHeader = styled.div`
    display: flex;
    flex: 1;
`

export default class RequisitionInfo extends Component {

    getBrandsSummary = () => {
        const {requisitions, currentRequisition} = this.props;
        if (!requisitions) return;

        const requisition = requisitions[currentRequisition];
        const {orders} = requisition;

        const product_types = 
                orders 
                    .filter(order => !order.product.is_cocktail)
                    .map(order => order.product.product_type);

        
        const ingredient_types =  [];
        orders
            .filter(order => order.product.is_cocktail)
            .map(order => {
                return order.product.ingredients.map(ing => ingredient_types.push(ing.product.product_type))
            }) 

        const all_types = [...product_types, ...ingredient_types];
        const unique_types = [...new Set(all_types)];

        return unique_types.map(type => <RequisitionBrand {...this.props} type={type} requisition={requisitions[currentRequisition]}/>);
    }

    handleRequestDocument = () => {
        const {requisitions, currentRequisition, requestSignDocument} = this.props;
        if (!requisitions) return; 

        requestSignDocument(requisitions[currentRequisition].id);
    }

    render() {
        const { requisitions, scope, role, currentRequisition } = this.props;
            return (
                <InfoContainer>
                    {(!requisitions || requisitions.length < 1) && <ClientsLabel>No Requisitions</ClientsLabel> }
                    {requisitions &&
                        requisitions.length > 0 && (
                            <Panel bordered>
                                <DataContainer>
                                    <FieldRow>
                                        <DataContainer>
                                            <FieldContainer>
                                                <FieldLabel>Serial</FieldLabel>
                                                <p>#{requisitions[currentRequisition].serial_number}</p>
                                            </FieldContainer>
                                        </DataContainer>
                                        <FieldContainer align="flex-end">
                                            <p>{requisitions[currentRequisition].status}</p>
                                            {(requisitions[currentRequisition].status === 'DRAFT' || requisitions[currentRequisition].status === 'CHANGES REQUIRED' ) && (
                                                <ConfirmSubmit {...this.props}/>
                                            )}
                                            {requisitions[currentRequisition].status === 'SUBMITTED' && (
                                                <RoleValidator 
                                                    {...this.props}
                                                    scopes={['BRAND']}
                                                    roles={['OWNER', 'MANAGER']}
                                                >
                                                    <ApproveRequisitionConfirm {...this.props}/>
                                                </RoleValidator>
                                            )}
                                            {requisitions[currentRequisition].status === 'SUBMITTED' && (
                                                <RoleValidator 
                                                    {...this.props}
                                                    scopes={['BRAND']}
                                                    roles={['OWNER', 'MANAGER']}
                                                >
                                                    <RejectRequisition {...this.props}/>
                                                </RoleValidator>
                                            )}
                                            {requisitions[currentRequisition].status === 'SUBMITTED' && (
                                                <RoleValidator 
                                                    {...this.props}
                                                    scopes={['BRAND']}
                                                    roles={['OWNER', 'MANAGER']}
                                                >
                                                    <RequestModifications {...this.props}/>
                                                </RoleValidator>
                                            )}
                                            {requisitions[currentRequisition].status === 'APPROVED' && requisitions[currentRequisition].hellosign_signature_id && (
                                                <Button block onClick={this.handleRequestDocument}>Show Document</Button>
                                            )}
                                        </FieldContainer>
                                    </FieldRow>
                                    {requisitions[currentRequisition].comments && requisitions[currentRequisition].status !== 'APPROVED' && (
                                        <Message
                                            style={{width: '100%'}}
                                            type="warning"
                                            description={
                                                <div>
                                                    <b>Changes Required</b>
                                                    <p>
                                                    {requisitions[currentRequisition].comments}
                                                    </p>
                                                </div>
                                            }
                                        />
                                    )}
                                    <FieldContainer>
                                        <FieldLabel>Events</FieldLabel>
                                        <FieldRow>
                                            <FieldHeader><b>Name</b></FieldHeader>
                                            <FieldHeader><b>Start Time</b></FieldHeader>
                                            <FieldHeader><b>End Time</b></FieldHeader>
                                            <FieldHeader><b>Venue</b></FieldHeader>
                                            <FieldHeader><b>Expected Guests</b></FieldHeader>
                                            <FieldHeader><b>{requisitions[currentRequisition].status === 'APPROVED' ? 'Credits Left' : 'Credits Required'}</b></FieldHeader>
                                            {requisitions[currentRequisition].status === 'APPROVED' && (
                                                <FieldHeader><b>Total Funded</b></FieldHeader>
                                            )}
                                            <FieldHeader><b>Requisition</b></FieldHeader>
                                        </FieldRow>
                                        <Divider />
                                        {requisitions[currentRequisition].brief && 
                                            requisitions[currentRequisition].brief.brief_events &&
                                            requisitions[currentRequisition].brief.brief_events.map(be => (
                                                <RequisitionEvent {...this.props} brief={requisitions[currentRequisition].brief} event={be}/>
                                            ))}
                                    </FieldContainer>
                                    <FieldContainer>
                                        <FieldLabel>Summary</FieldLabel>
                                        {this.getBrandsSummary()}
                                       </FieldContainer>
                                    {requisitions[currentRequisition].status === 'APPROVED' && (
                                        <FieldContainer>
                                            <FieldRow>
                                                <FieldLabel>Deliveries</FieldLabel>
                                                <RoleValidator
                                                    {...this.props}
                                                    scopes={['BRAND']}
                                                    roles={['OWNER', 'WAREHOUSE_MANAGER']}
                                                >
                                                <AddNewDelivery {...this.props}/> 
                                                </RoleValidator>
                                            </FieldRow>
                                            <Deliveries 
                                                {...this.props}
                                                requisition={requisitions[currentRequisition]}
                                            />
                                        </FieldContainer>
                                    )}
                                </DataContainer>
                            </Panel>
                        )}
                </InfoContainer>
        );
    }
}

RequisitionInfo.propTypes = {};
