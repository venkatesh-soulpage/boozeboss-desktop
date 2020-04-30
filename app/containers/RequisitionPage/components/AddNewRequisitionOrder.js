import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, Radio, RadioGroup, InputNumber, InputGroup, Checkbox} from 'rsuite'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    display: flex;
    flex: 1;
    margin: 0 0.5em 0.5em 0;
`;

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


export default class AddNewRequisitionOrder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        product: null,
        units: 0,
        is_display: false,
        base_price: 0,
      };
    }

    fillData = () => {
        const {product} = this.props;
        this.setState({...product});
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
      this.getProducts()
    }

    handleChangeProduct = (value, name) => {
        this.setState({[name]: value, base_price: value.base_price});
    }

    handleChange = (value, name) => {
        console.log(value, name)
        this.setState({[name]: value});
    }

    getProducts = () => {
        const {getClientProducts, brief} = this.props;
        getClientProducts(brief.client_id);
    }

    submitOrder = () => {
        const {createRequisitionOrder, requisitions, currentRequisition, event} = this.props;
        const {product, units, base_price, is_display} = this.state;
        const order = {
            brief_event_id: event.id,
            product_id: product.id,
            price: base_price,
            units: Number(units),
            is_display,
        }

        createRequisitionOrder(requisitions[currentRequisition].id, order);
        this.reset();
    }

    getPickerData = (products) => {
        const {requisitions, currentRequisition, event} = this.props;

        if (!products || !requisitions[currentRequisition]) return [];

        const brief_products = requisitions[currentRequisition].brief.products.map(prod => prod.product_id);

        const available_products = products
            .filter(prod => {
                const ingredients_available = prod.ingredients.filter(ing => brief_products.indexOf(ing.product_id) > -1);
                const has_product = brief_products.indexOf(prod.id) > -1;
                const has_ingredient = ingredients_available.length > 0;
                return has_product || has_ingredient;
            })
            .map(prod => {
                return {
                    label: prod.is_cocktail ? `${prod.name} - ${prod.metric_amount}${prod.metric} (Cocktail)` : `${prod.name} - ${prod.metric_amount}${prod.metric}`,
                    value: prod
                }
            });

        return available_products;
    }

    reset = () => {
        this.setState({
            product: null,
            units: 0,
            base_price: 0,
        });
        this.close();
    }

    render() {
        const {products} = this.props;
        const {show, product, units, base_price, is_display } = this.state;
        const available_products = this.getPickerData(products);
        return (
            <React.Fragment>
                <a onClick={this.open} color="green">Add new products</a>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Product / Cocktail</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={available_products}
                                onChange={(value) => this.handleChangeProduct(value, 'product')}
                            />
                        </FieldContainer>
                        {product && !product.is_cocktail && (
                           <FieldContainer>
                                <FieldLabel>Settings</FieldLabel>
                                <Checkbox 
                                    checked={is_display}
                                    onChange={(value) => this.handleChange(!this.state.is_display, 'is_display')}
                                >
                                    Is display product (Return to warehouse)
                                </Checkbox>
                            </FieldContainer> 
                        )}
                        {product && (
                            <FieldContainer>
                                <FieldLabel>Units</FieldLabel>
                                <InputGroup>
                                    <InputNumber 
                                        defaultValue={0} 
                                        value={units}
                                        onChange={(value) => this.handleChange(value, 'units')}
                                    />
                                </InputGroup>
                            </FieldContainer>
                        )}
                        {product && (
                            <FieldContainer>
                                <FieldLabel>Price</FieldLabel>
                                <InputGroup>
                                    <InputNumber 
                                        disabled={is_display}
                                        defaultValue={product.base_price} 
                                        value={base_price || product.base_price}
                                        onChange={(value) => this.handleChange(value, 'base_price')}
                                    />
                                </InputGroup>
                            </FieldContainer>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.submitOrder} color="green">
                        New Order
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
  