import React, { Component } from 'react'
import styled from 'styled-components';
import {Panel, Divider, Button, Message} from 'rsuite';
import moment from 'moment';
import UpdateDelivery from './UpdateDelivery';
import UpdateDispute from './UpdateDispute';
import RoleValidator from 'components/RoleValidator';

const StyledPanel = styled(Panel)`
    margin: 1em 0 0 0;
`

const EventSection = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 0 0;
`

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.spaced ? 'space-between' : 'flex-start'};
    ${props => props.isProduct && `
        border-top-color: #DCDCDC;
        border-top-style: solid;
        border-top-width: 1px;
    `}
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 0em;
    min-width: 250px;
`;

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

const ProductLabel = styled.p`
    min-width: 150px;
`;

const DeliveryProduct = (props) => (
    <FieldRow isProduct={true}>
        <FieldContainer>
           <ProductLabel>{props.deliveryProduct.product.name}</ProductLabel> 
        </FieldContainer>
        <FieldContainer>
        <ProductLabel>{props.deliveryProduct.product.metric_amount} {props.deliveryProduct.product.metric}</ProductLabel>
        </FieldContainer>
        <FieldContainer>
            <ProductLabel>{props.deliveryProduct.units} units</ProductLabel>
        </FieldContainer>
    </FieldRow>
)

const Delivery = (props) => (
    <StyledPanel bordered>
        <FieldRow spaced>
            <FieldContainer>
                <FieldLabel>Created at</FieldLabel>
                <p>{moment(props.delivery.created_at).format('DD/MM/YYYY LT')}</p>
            </FieldContainer>
            {props.delivery.status === 'PROCESSING DELIVERY' && props.delivery.enabled && (
                <RoleValidator
                    {...props}
                    scopes={['BRAND']}
                    roles={['OWNER', 'WAREHOUSE_MANAGER']}
                >
                    <FieldContainer>
                        <FieldLabel>
                            <UpdateDelivery 
                                text="Mark as Delivered"
                                color="green"
                                status="DELIVERED"
                                {...props}
                                delivery={props.delivery}
                            />
                        </FieldLabel>
                    </FieldContainer>
                </RoleValidator>
            )}
            {props.delivery.status === 'DISPUTED' && props.delivery.enabled &&(
                <RoleValidator
                    {...props}
                    scopes={['BRAND']}
                    roles={['OWNER', 'WAREHOUSE_MANAGER']}
                >
                    <FieldContainer>
                        <FieldLabel>
                            <UpdateDispute 
                                {...props}
                            />
                        </FieldLabel>
                    </FieldContainer>
                </RoleValidator>
            )}
            <RoleValidator
                {...props}
                scopes={['AGENCY']}
                roles={['OWNER', 'MANAGER']}
            >
                <FieldContainer>
                {props.delivery.status === 'DELIVERED' && props.delivery.enabled &&(
                    <RoleValidator
                        {...props}
                        scopes={['AGENCY']}
                        roles={['OWNER', 'MANAGER']}
                    >
                        <FieldContainer>
                            <FieldLabel>
                                <UpdateDelivery 
                                    text="Confirm reception"
                                    color="green"
                                    status="RECEIVED"
                                    {...props}
                                    delivery={props.delivery}
                                />
                            </FieldLabel>
                        </FieldContainer>
                    </RoleValidator>
                )}
                {props.delivery.status === 'DELIVERED' && props.delivery.enabled && (
                    <RoleValidator
                        {...props}
                        scopes={['AGENCY']}
                        roles={['OWNER', 'MANAGER']}
                    >
                        <FieldContainer>
                            <FieldLabel>
                                <UpdateDelivery 
                                    text="Dispute"
                                    is_dispute={true}
                                    status="DISPUTED"
                                    {...props}
                                    delivery={props.delivery}
                                />
                            </FieldLabel>
                        </FieldContainer>
                    </RoleValidator>
                )}
                </FieldContainer>
            </ RoleValidator>
        </FieldRow>
        <Divider />
        <FieldRow>
            <FieldContainer>
                <FieldLabel>
                    Waybill
                </FieldLabel>
                <p>{props.delivery.waybill}</p>
            </FieldContainer>
            <FieldContainer>
                <FieldLabel>
                    Status
                </FieldLabel>
                <p>{props.delivery.status}</p>
            </FieldContainer>
            <FieldContainer>
                <FieldLabel>
                    From
                </FieldLabel>
                <p>{props.delivery.warehouse.name}</p>
            </FieldContainer>
        </FieldRow>
        <FieldRow>
            <FieldContainer>
                <FieldLabel>Products</FieldLabel>
                {props.delivery.products.map(prod => <DeliveryProduct deliveryProduct={prod}/>)}
            </FieldContainer>
        </FieldRow>
        {props.delivery.comments && (
            <FieldRow>
                <Message type="warning" description={props.delivery.comments} style={{width: '100%'}}/>
            </FieldRow>
        )}
        
    </StyledPanel>
)

class WaybillGroup extends Component {
    render() {
        const {requisition, waybill} = this.props;
        const deliveries = 
            requisition.deliveries
                .sort((a,b) => {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                })
                .filter(delivery => {
                    return delivery.waybill.includes(waybill)
                })

        return (
             <StyledPanel 
                shaded
                header={`Waybill: ${waybill} ${deliveries && deliveries[0] && `(${deliveries[0].status})`}`}
                collapsible
            >
                 {deliveries.map(delivery => {
                     return <Delivery {...this.props} delivery={delivery}/> 
                 })}
            </StyledPanel>
        )
    }
}

export default class Deliveries extends Component {
    
    groupWaybills = () => {
        const {requisition} = this.props;
        if (!requisition) return [];
        const waybills = requisition.deliveries.map((del) => {
            const splitted = del.waybill.split('_');
            return `${splitted[0]}_${splitted[1]}`;
        });

        return [...new Set(waybills)]
    }

    render() {
        const {requisition} = this.props;
        const waybills = this.groupWaybills();
        return (
            <EventSection>
                {waybills &&
                    waybills.length > 0 ? (
                        <React.Fragment>
                            {waybills
                                .map(waybill => <WaybillGroup {...this.props} waybill={waybill}/>)}
                        </React.Fragment>
                    ) : (
                        <p>No current deliveries</p>
                    )}
            </EventSection>
        )
    }
}
