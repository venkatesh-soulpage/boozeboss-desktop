import React, { Component } from 'react'
import {Modal, Button, Input, DatePicker, InputNumber, Checkbox, SelectPicker} from 'rsuite'
import styled from 'styled-components';

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`

const FieldContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 1.5em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

export default class NewProduct extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        productsData: null,
        product_id: null,
        limit: 0
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
      this.getPickerData();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    getPickerData = ()  => {
        const {products} = this.props;
        if (!products) return [];
        const productsData = products.map(product => {
            return {
                label: `${product.name} - ${product.metric_amount}${product.metric} ${product.brand ? `(${product.brand.name})` : ''}`,
                value: product.id,
                role: product.name,
            }
        })
        this.setState({productsData});
    }

    addProduct = async () => {
        const { createBriefProduct, briefs, currentBrief } = this.props;
        const {product_id, limit} = this.state;
        createBriefProduct(briefs[currentBrief].id, {product_id, limit});
        this.close();
    }

    goToRoute = (pathname) => {
        this.props.history.push({
            pathname,
            showProductModal: true,
        });
    }

    render() {
        const {show, productsData, limit} = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open}>+ Add Product </Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldRow>
                                <FieldLabel>Product</FieldLabel>
                                <a onClick={() => this.goToRoute('/products')}>+ Add new product</a>
                            </FieldRow>
                            
                            <SelectPicker 
                                searchable={false}
                                data={productsData}
                                onChange={(value) => this.handleChange(value, 'product_id')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Limit</FieldLabel>
                            <InputNumber 
                                onChange={(value) => this.handleChange(value, 'limit')}
                                value={limit}
                            /> 
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.addProduct} color="green">
                        Add Event
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
  