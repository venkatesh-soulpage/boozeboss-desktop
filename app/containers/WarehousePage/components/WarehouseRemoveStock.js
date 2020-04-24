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

export default class WarehouseRemoveStock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        quantity: 0,
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }


    addStock = async () => {
        const {removeProductStock, warehouses, currentWarehouse, product} = this.props;
        const {quantity} = this.state;

        if (!product || !quantity) return alert('Missing fields');

        removeProductStock({
            product_id: product.id,
            quantity
        }, warehouses[currentWarehouse].id)

        this.close();
    }

    render() {
        const {show, quantity} = this.state;
        return (
            <React.Fragment>
                <a onClick={this.open} color="green">Remove</a>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Quantity</FieldLabel>
                            <InputGroup>
                                <InputNumber 
                                    defaultValue={quantity}
                                    value={quantity}
                                    onChange={(value) => this.handleChange(value, 'quantity')}
                                    step={1}
                                    min={1}
                                />
                                <InputGroup.Addon>
                                    units
                                </InputGroup.Addon>
                            </InputGroup>
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.addStock} color="green">
                        Remove
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
  