import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, Radio, RadioGroup, InputNumber, InputGroup, Checkbox, Divider} from 'rsuite'
import styled from 'styled-components';

const StyledButton = styled(Button)`
    margin: 1em 0 0 0;
`

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1em 0 0 0;
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1em 0 0 0;
`;

const FieldLabel = styled.b`
    display: flex;
    flex: 1;
    margin: 0 0.5em 0.5em 0;
`;

const Field = styled.div`
    display: flex;
    flex: 1;
`

const metricOptions = [
    {
        label: 'Liters (L)',
        value: 'l',
    },
    {
        label: 'Milliliters (ml)',
        value: 'ml',
    },
    {
        label: 'Units (U)',
        value: 'u',
    },
    {
        label: 'Killogram (Kg)',
        value: 'kg',
    },
    {
        label: 'Milligram (mg)',
        value: 'mg',
    },
    
]

class StockOrder extends React.Component {

    state = {
        disabled: false,
    }

    getCurrentUnits = () => {
        const {requisitions, currentRequisition, brief_product} = this.props;
        const requisition = requisitions[currentRequisition];
        const {orders} = requisition;
        

        const currentUnits = orders.reduce((acc, curr) => {

            const ingredient_ids = curr.product.ingredients.map(ing => ing.product_id);

            if ( brief_product.product_id === curr.product_id ) {
                return Number(acc) + Number(curr.units);
            } else if ( ingredient_ids.indexOf(brief_product.product_id) > -1 ){
                // Calculate bottles from units
                const ingredient = curr.product.ingredients.find(ing => ing.product_id === brief_product.product_id );
                const totalml = ingredient.quantity * curr.units;
                const totalUnits = Math.round(totalml / brief_product.product.metric_amount); 
                return acc + totalUnits;
            } else {
                return acc;
            }
        }, 0);

        return currentUnits;
    }

    getPickerData = () => {
        const {warehouses} = this.props;
        if (!warehouses || warehouses.length < 1) return []; 
        return warehouses.map(wh => {
            return {
                label: wh.name,
                value: wh.id
            }
        })
    }

    handleOrder = (value) => {
        const {brief_product, handleAddWarehouse} = this.props;
        this.setState({disabled: true});
        handleAddWarehouse({
            warehouse_id: value,
            product_id: brief_product.product.id,
            units: this.getCurrentUnits(),
        })
    }

    render() {
        const {disabled} = this.state;
        const {brief_product} = this.props;
        return (
            <React.Fragment>
                <FieldRow>
                    <FieldLabel>{brief_product.product.name} - {brief_product.product.metric_amount}{brief_product.product.metric}</FieldLabel>
                    <FieldLabel>{this.getCurrentUnits()}</FieldLabel>
                    <Field>
                        <SelectPicker 
                            disabled={disabled}
                            style={{width: 150}}
                            searchable={false}
                            cleanable={false}
                            data={this.getPickerData()}
                            onSelect={(value) => this.handleOrder(value)}
                        />
                    </Field>
                </FieldRow>
                <Divider />
            </React.Fragment>
            
        )
    }
}


export default class DeliverRequisitionOrders extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        waybill: null,
        orders: []
      };
    }


    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    handleChangeProduct = (value, name) => {
        this.setState({[name]: value, base_price: value.base_price});
    }

    handleAddWarehouse = (value) => {
        this.setState({orders: [...this.state.orders, value]});
    }

    handleChangeWaybill = (waybill) => {
        this.setState({waybill});
    }

    getOrders = () => {
        const {requisitions, currentRequisition} = this.props;

        if (!requisitions[currentRequisition]) return <div />

        return requisitions[currentRequisition].brief.products.map(brief_product => {
            return <StockOrder brief_product={brief_product} {...this.props} handleAddWarehouse={this.handleAddWarehouse}/> 
        })
    }

    submit = () => {
        const {requisitions, currentRequisition, updateRequisitionOrders} = this.props;
        const {orders, waybill} = this.state;
        updateRequisitionOrders(requisitions[currentRequisition].id, orders, waybill);
    }
    
    render() {
        const {show, waybill } = this.state;
        return (
            <React.Fragment>
                <StyledButton onClick={this.open} color="green">Mark as Delivered</StyledButton>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Waybill</FieldLabel>
                            <Input
                                value={waybill}
                                onChange={(val) => this.handleChangeWaybill(val)}
                            />
                        </FieldContainer>
                        {this.getOrders()}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.submit} color="green">
                        Mark as Delivered
                    </Button>
                    <Button onClick={this.close} appearance="subtle">
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
  }
  