import React, { Component } from 'react'
import styled from 'styled-components';
import {Panel} from 'rsuite';

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
    align-items: center;
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 0em;
    min-width: 150px;
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
            <ProductLabel>{props.deliveryProduct.units}</ProductLabel>
        </FieldContainer>
    </FieldRow>
)

const Delivery = (props) => (
    <StyledPanel bordered shaded>
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
