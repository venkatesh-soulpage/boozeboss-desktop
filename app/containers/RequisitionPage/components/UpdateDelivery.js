import React from 'react';
import {Modal, Button, Icon, Input, Checkbox, SelectPicker, InputNumber} from 'rsuite';
import styled from 'styled-components';

const StyledAction = styled(Button)`
    margin: -2em 0 0 0;
    text-align: center;
    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 0em;
    min-width: 250px;
`;

const FieldContainerRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const FieldContainerColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

class AddRefundModal extends React.Component {
    state = {
        show: false,
        productsData: null,
        product_id: null,
        refund_amount: 0,
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    open = () => {
        this.setState({show: true});
        this.getPickerData();
    }

    close = () => {
        this.setState({show: false, refund_amount: 0, product_id: null});
    }

    handleAddProductRefund = () => {
        const {addProductRefund, delivery} = this.props;
        const {product_id, refund_amount} = this.state;
        const delivery_product = delivery.products.find(dp => dp.product_id === product_id );
        addProductRefund({
            product: delivery_product.product,
            refund_amount,
        });
        this.close();
    }

    getPickerData = () => {
        const {delivery, refunds} = this.props;

        const refunds_ids = refunds.map(refund => refund.product.id);

        const productsData = 
            delivery.products
                .filter(delivery_product => refunds_ids.indexOf(delivery_product.product.id) < 0)
                .map(delivery_product => {
                    return {
                        label: `${delivery_product.product.name} (${delivery_product.product.metric_amount}${delivery_product.product.metric})`,
                        value: delivery_product.product.id,
                    }
                })
        this.setState({productsData});
    }

    getMaxRefundAmount = () => {
        const {delivery} = this.props;
        const {product_id} = this.state;
        if (!product_id) return 0;

        const delivery_product = delivery.products.find(dp => dp.product_id === product_id );
        return delivery_product.units;
    }

    render () {
        const {show, productsData, product_id, refund_amount} = this.state;
        return (
            <React.Fragment>
                <a onClick={this.open} block>+ Add Returning Product</a>
                <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Product</FieldLabel>
                            <SelectPicker
                              data={productsData}
                              searchable={false}
                              value={product_id}
                              onSelect={value => this.handleChange(value, 'product_id')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Refund Amount {product_id && `Max :${this.getMaxRefundAmount()}`}</FieldLabel>
                            <InputNumber 
                                disabled={!product_id}
                                max={this.getMaxRefundAmount()}
                                value={refund_amount}
                                onChange={val => {
                                    if (val > this.getMaxRefundAmount()) return;
                                    this.handleChange(val, 'refund_amount');
                                }}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.handleAddProductRefund} color="green">
                        Add
                    </Button>
                    <Button onClick={this.close} appearance="subtle">
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

class RefundsContainer extends React.Component {

    handleRemoveProductRefund = (index) => {
        const {removeProductRefund} = this.props;
        removeProductRefund(index);
    }

    render() {
        const {refunds} = this.props;
        return (
            <div>
                {refunds &&
                    refunds.length > 0 ? (
                        <FieldContainer>
                            {refunds.map((refund, index) => {
                                return (
                                    <FieldContainerRow>
                                        <FieldContainerColumn>
                                            {refund.product.name} ({refund.product.metric_amount} {refund.product.metric})
                                        </FieldContainerColumn>
                                        <FieldContainerColumn>
                                            {refund.refund_amount} units
                                        </FieldContainerColumn>
                                        <FieldContainerColumn>
                                            <a onClick={() => this.handleRemoveProductRefund(index)}>Remove</a>
                                        </FieldContainerColumn>
                                    </FieldContainerRow>
                                )
                            })}
                        </FieldContainer>
                    ) : (
                        <p>No products</p>
                    )}
            </div>
        )
    }
}


export default class UpdateDelivery extends React.Component {
    
    state = {
        show: false,
        comments: null,
        is_refund: false,
        refunds: []
    }

    close = () =>  {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    handleChangeComments = (comments) => {
        this.setState({comments}) 
    }

    toggleRefund = () => {
        this.setState({
            is_refund: !this.state.is_refund
        })
    }

    submit = () => {
        const {requisitions, currentRequisition, updateRequisitionDelivery, delivery, status} = this.props;
        const {comments, is_refund, refunds} = this.state;
        updateRequisitionDelivery(
            requisitions[currentRequisition].id,
            delivery.id,
            {status, comments, is_refund, refunds}
        );
        this.close();
    }

    addProductRefund = (productRefund) => {
        this.setState({
            refunds: [...this.state.refunds, productRefund]
        })
    }
    
    removeProductRefund = (refund_index) => {
        const {refunds} = this.state;
        let refunds_copy = refunds;
        refunds_copy.splice(refund_index, 1);
        this.setState({refunds: refunds_copy});
    }

    render() {
        const {text, status, is_dispute, color} = this.props;
        const {show, comments, is_refund} = this.state;
        return (
            <React.Fragment>
                <StyledAction color={color} onClick={this.open} block>{text}</StyledAction>
                {!is_dispute ? (
                    <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                        <Modal.Body>
                            <p>
                                The Delivery will change to <b>{status}</b> status.
                                Do you want to proceed?
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={this.submit} color="green">
                            Ok
                        </Button>
                        <Button onClick={this.close} appearance="subtle">
                            Cancel
                        </Button>
                        </Modal.Footer>
                    </Modal>
                ) : (
                    <Modal backdrop="static" show={show} onHide={this.close}>
                        <Modal.Body>
                            <FieldContainer>
                                <FieldLabel>Dispute</FieldLabel>
                                <Checkbox checked={is_refund} onChange={this.toggleRefund}>Return products?</Checkbox>
                            </FieldContainer>
                            {is_refund && (
                                <FieldContainer>
                                    <FieldContainerRow>
                                        <FieldLabel>Returning products</FieldLabel>
                                        <AddRefundModal 
                                            {...this.props}
                                            {...this.state}
                                            addProductRefund={this.addProductRefund}
                                        />
                                    </FieldContainerRow>
                                    <RefundsContainer 
                                        {...this.props}
                                        {...this.state}
                                        removeProductRefund={this.removeProductRefund}
                                    />
                                </FieldContainer>
                            )}
                            <FieldContainer>
                                <FieldLabel>Dispute Reason</FieldLabel>
                                <Input
                                    componentClass="textarea"
                                    rows={3}
                                    style={{resize: 'auto' }}
                                    value={comments}
                                    onChange={(val) => this.handleChangeComments(val)}
                                />
                            </FieldContainer>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={this.submit} color="green">
                            Dispute
                        </Button>
                        <Button onClick={this.close} appearance="subtle">
                            Cancel
                        </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </ React.Fragment>
        );
    }
  }