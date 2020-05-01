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

const StocksLabel = styled.p`
    margin: 0.5em 0 0.5em 0;
`;


const StyledButton = styled(Button)`
    margin: 1em 0 1em 0;
`

export default class NewProduct extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        productsData: null,
        product_id: null,
        limit: 0,
        maxStocks: 0,
      };
    }

    close = () => {
      this.setState({ show: false, product_id: null, limit: 0, maxStocks: 0 });
    }

    open = () => {
      this.setState({ show: true });
      this.getPickerData();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    handleProductChange = (value, name) => {
        this.setState({[name]: value});
        this.calculateMaxStocks(value);
    }

    calculateMaxStocks = (product_id) => {
        const {products} = this.props;
        const product = products.find(prod => prod.id === product_id);


        const {stocks} = product;

        const maxStocks = stocks.reduce((acc, curr) => {
            return Number(acc) + curr.quantity;
        }, 0)

        this.setState({maxStocks});
    }

    getPickerData = ()  => {
        const {products} = this.props;
        if (!products) return [];
        const productsData = products.filter(prod => !prod.is_cocktail).map(product => {
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
        const {show, productsData, limit, product_id, maxStocks} = this.state;
        return (
            <React.Fragment>
                <StyledButton onClick={this.open} color="green">+ Add Product </StyledButton>
        
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
                                onChange={(value) => this.handleProductChange(value, 'product_id')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Limit</FieldLabel> 
                            {product_id && maxStocks > 0 && <StocksLabel>Stock Available: {maxStocks} units</StocksLabel>}
                            {product_id && maxStocks < 1 && <StocksLabel>No stock available</StocksLabel>}
                            <InputNumber 
                                min={0}
                                max={maxStocks}
                                onChange={(value) => this.handleChange(value, 'limit')}
                                value={limit}
                            /> 
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.addProduct} color="green" disabled={limit > maxStocks}>
                        Add Product
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
  