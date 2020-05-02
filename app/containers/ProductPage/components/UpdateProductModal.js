import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, Radio, RadioGroup, InputNumber, InputGroup} from 'rsuite'
import styled from 'styled-components';
import CocktailBuilder from './CocktailBuilder';

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
        label: 'Gram (g)',
        value: 'g',
    },
    
]


export default class UpdateProductModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        brandOptions: null,
        name: null,
        description: null,
        is_cocktail: false,
        brand_id: null,
        metric: 'l',
        metric_amount: 0,
        sku: null,
        base_price: 1,
        ingredients: [],
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
      this.fillData()
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    updateProduct = () => {
        const { updateProduct, product } = this.props;
        const { name, description, is_cocktail, metric, metric_amount, sku, base_price } = this.state;
        
        updateProduct(product.id, {name, description, is_cocktail, metric, metric_amount, sku, base_price})
    
        this.reset();
    }

    getMetricTag = () => {
        const {metric} = this.state;
        if (!metric) return '(metric)'
        const selected_metric = metricOptions.find(m => m.value === metric);
        return selected_metric.label;
    }

    reset = () => {
        this.setState({
            name: null,
            description: null,
            is_cocktail: false,
            brand_id: null,
            metric: 'l',
            metric_amount: 0,
            sku: null,
            base_price: 1,
        });
        this.close();
    }

    render() {
        const {show, name, description, is_cocktail, metric, metric_amount, sku, base_price, } = this.state;
        return (
            <React.Fragment>
                <a onClick={this.open} color="green">Update</a>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Name</FieldLabel>
                            <Input 
                                value={name}
                                onChange={(value) => this.handleChange(value, 'name')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Description</FieldLabel>
                            <Input 
                                componentClass="textarea" 
                                rows={3} 
                                value={description}
                                onChange={(value) => this.handleChange(value, 'description')}
                            />
                        </FieldContainer>
                        {!is_cocktail && (
                            <FieldContainer>
                                <FieldLabel>Metric</FieldLabel>
                                <SelectPicker 
                                    searchable={false}
                                    defaultValue={metric}
                                    value={metric}
                                    data={metricOptions}
                                    onChange={(value) => this.handleChange(value, 'metric')}
                                />
                            </FieldContainer>
                        )}
                        {!is_cocktail && (
                            <FieldContainer>
                                <FieldLabel>Metric Amount</FieldLabel>
                                <InputGroup>
                                    <InputNumber 
                                        defaultValue={metric_amount} 
                                        value={metric_amount}
                                        onChange={(value) => this.handleChange(value, 'metric_amount')}
                                    />
                                    <InputGroup.Addon>{is_cocktail ? 'ml':  this.getMetricTag()}</InputGroup.Addon>
                                </InputGroup>
                            </FieldContainer>
                        )}
                        <FieldContainer>
                            <FieldLabel>SKU</FieldLabel>
                            <Input 
                                value={sku}
                                onChange={(value) => this.handleChange(value, 'sku')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Base Price</FieldLabel>
                            <InputNumber
                                defaultValue={base_price} 
                                value={base_price}
                                step={0.01} 
                                onChange={(value) => this.handleChange(value, 'base_price')}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.updateProduct} color="green">
                        Update
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
  