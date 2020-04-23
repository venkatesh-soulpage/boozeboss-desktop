import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, Radio, RadioGroup, InputNumber, InputGroup} from 'rsuite'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
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


export default class AddProductModal extends React.Component {
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
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
      this.getBrandPickerData();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    getBrandPickerData = ()  => {
        const {brands} = this.props;
        const brandOptions = brands.map(brand => {
            return {
                label: `${brand.name} (${brand.product_type})`,
                value: brand.id,
                role: brand.name,
            }
        })
        this.setState({brandOptions});
    }

    addProduct = () => {
        const { addProduct } = this.props;
        const { name, brand_id, description, is_cocktail, metric, metric_amount, sku, base_price } = this.state;
        if (!name || !brand_id || !description || !metric || !metric_amount || !sku || !base_price) return alert('Missing fields');
        console.log(this.state);
        addProduct({brand_id, name, description, is_cocktail, metric, metric_amount, sku, base_price});
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
        const {show, brandOptions, name, description, is_cocktail, metric, metric_amount, sku, base_price } = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open} color="green">+ Add Product</Button>
        
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
                        <FieldContainer>
                            <FieldLabel>Product Type</FieldLabel>
                            <RadioGroup name="radioList" onChange={(value) => this.handleChange(value, 'is_cocktail')} defaultValue={false}>
                                <Radio value={false}>Product</Radio>
                                <Radio value={true}>Cocktail</Radio>
                            </RadioGroup>
                        </FieldContainer>
                        { !is_cocktail && (
                            <FieldContainer>
                                <FieldLabel>Brand</FieldLabel>
                                <SelectPicker 
                                    searchable={false}
                                    data={brandOptions}
                                    onChange={(value) => this.handleChange(value, 'brand_id')}
                                />
                            </FieldContainer>
                        )}
                        <FieldContainer>
                            <FieldLabel>Metric</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                defaultValue={metric}
                                data={metricOptions}
                                onChange={(value) => this.handleChange(value, 'metric')}
                            />
                        </FieldContainer>
                        {metric && (
                            <FieldContainer>
                                <FieldLabel>Metric Amount</FieldLabel>
                                <InputGroup>
                                    <InputNumber 
                                        defaultValue={metric_amount} 
                                        value={metric_amount}
                                        onChange={(value) => this.handleChange(value, 'metric_amount')}
                                    />
                                    <InputGroup.Addon>{this.getMetricTag()}</InputGroup.Addon>
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
                    <Button onClick={this.addProduct} color="green">
                        Add
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
  