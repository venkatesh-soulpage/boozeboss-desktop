import React, { Component } from 'react'
import styled from 'styled-components';
import {Panel, Divider, Button, Message} from 'rsuite';
import moment from 'moment';
import UpdateDelivery from './UpdateDelivery';
import RoleValidator from 'components/RoleValidator';

const StyledPanel = styled(Panel)`
    
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
    <FieldRow>
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
    <StyledPanel bordered shaded>
        <FieldRow spaced>
            <FieldContainer>
                <FieldLabel>Created at</FieldLabel>
                <p>{moment(props.delivery.created_at).format('DD/MM/YYYY LT')}</p>
            </FieldContainer>
            {props.delivery.status === 'PROCESSING DELIVERY' && (
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
            <FieldContainer>
                {props.delivery.status === 'DELIVERED' && (
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
                {props.delivery.status === 'DELIVERED' && (
                    <RoleValidator
                        {...props}
                        scopes={['AGENCY']}
                        roles={['OWNER', 'MANAGER']}
                    >
                        <FieldContainer>
                            <FieldLabel>
                                <UpdateDelivery 
                                    text="Dispute"
                                    status="PROCESSING DELIVERY"
                                    {...props}
                                    delivery={props.delivery}
                                />
                            </FieldLabel>
                        </FieldContainer>
                    </RoleValidator>
                )}
            </FieldContainer>
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

export default class Deliveries extends Component {
    render() {
        const {requisition} = this.props;
        return (
            <EventSection>
                {requisition &&
                    requisition.deliveries && 
                    requisition.deliveries.length > 0 ? (
                        <React.Fragment>
                            {requisition.deliveries.map(delivery => <Delivery {...this.props} delivery={delivery}/>)}
                        </React.Fragment>
                    ) : (
                        <p>No current deliveries</p>
                    )}
            </EventSection>
        )
    }
}
