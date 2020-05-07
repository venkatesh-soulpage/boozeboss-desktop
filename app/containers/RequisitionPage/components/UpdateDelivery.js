import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, Radio, RadioGroup, InputNumber, InputGroup, Checkbox, Divider} from 'rsuite'
import styled from 'styled-components';

const StyledButton = styled(Button)`
    margin: 0 0 0 0;
`

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1em 0 0 0;
`

const FieldDeliveryRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1em 0 0 0;
    padding: ${props => props.isFirst ? '15px' : '10px'} 0 10px 0;
    border-bottom-color: gray;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    ${props => props.isFirst && `
        border-top-color: gray;
        border-top-style: solid;
        border-top-width: 1px;
    `}
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

const FieldDeliveryLabel = styled.p`
    display: flex;
    flex: 1;
    margin: 0 0.5em 0.5em 0;
`;

const Field = styled.div`
    display: flex;
    flex: 1;
`

const ProductsSection = styled.div`
    margin: 0.5em 0 1em 0;
`

const StatusesData = [
    {label: 'ON PROGRESS', value: 'ON PROGRESS'},
    {label: 'SENT', value: 'SENT'},
    {label: 'DELIVERED', value: 'DELIVERED'},
    {label: 'ON HOLD', value: 'ON HOLD'},

]

export default class UpdateDelivery extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        waybill: null,
        status: null,
        warehouse_id: null,
        deliveryProducts: [],
      };
    }


    close = () => {
      this.setState({ show: false });
      this.reset();
    }

    open = () => {
        const {delivery} = this.props
        this.setState({ show: true, ...delivery });
    }

    handleChangeProduct = (value, name) => {
        this.setState({[name]: value, base_price: value.base_price});
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    submit = () => {
        const {requisitions, currentRequisition, updateRequisitionDelivery, delivery} = this.props;
        const {waybill, warehouse_id, status, deliveryProducts} = this.state;

        updateRequisitionDelivery(
            requisitions[currentRequisition].id,
            delivery.id,
            {waybill, warehouse_id, status, deliveryProducts}
        );
        this.close();
    }

    reset = () => {
        this.setState({
            waybill: null,
            status: null,
        })
    }
    
    render() {
        const {show, waybill, status } = this.state;
        return (
            <React.Fragment>
                <StyledButton block onClick={this.open} color="green">Update</StyledButton>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Waybill</FieldLabel>
                            <Input
                                value={waybill}
                                onChange={(val) => this.handleChange(val, 'waybill')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>
                                Status
                            </FieldLabel>
                            <SelectPicker 
                                value={status}
                                searchable={false}
                                cleanable={false}
                                data={StatusesData}
                                onSelect={(value) => this.handleChange(value, 'status')}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.submit} color="green">
                        Update Delivery
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
  