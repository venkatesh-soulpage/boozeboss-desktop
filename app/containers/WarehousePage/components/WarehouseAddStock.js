import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, InputNumber, InputGroup} from 'rsuite'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

export default class WarehouseAddStock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        productOptions: null,
        product: null,
        quantity: 0,
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
        const productOptions = products.map(prod => {
            return {
                label: `${prod.name} - ${prod.metric_amount}${prod.metric} ${prod.brand ? `(${prod.brand.name})` : ''}`,
                value: prod,
                role: prod.name,
            }
        })
        this.setState({productOptions});
    }

    addStock = async () => {
        const {addProductStock, warehouses, currentWarehouse} = this.props;
        const {product, quantity} = this.state;

        if (!product || !quantity) return alert('Missing fields');

        addProductStock({
            product_id: product.id,
            quantity
        }, warehouses[currentWarehouse].id)

        this.close();
    }

    render() {
        const {show, productOptions, product, quantity} = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open} color="green">+ Add Stock</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Product</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={productOptions}
                                onChange={(value) => this.handleChange(value, 'product')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Quantity</FieldLabel>
                            <InputGroup>
                                <InputNumber 
                                    defaultValue={quantity}
                                    value={quantity}
                                    onChange={(value) => this.handleChange(value, 'quantity')}
                                    step={1}
                                />
                                <InputGroup.Addon>
                                    units
                                </InputGroup.Addon>
                            </InputGroup>
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.addStock} color="green">
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
  