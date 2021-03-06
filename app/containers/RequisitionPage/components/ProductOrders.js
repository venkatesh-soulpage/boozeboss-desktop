import React, { Component } from 'react'
import {Modal, Button, Table} from 'rsuite'
import styled from 'styled-components';
import moment from 'moment';

const {Column, HeaderCell, Cell } = Table;

const FieldRow = styled.div`
    display: flex; 
    flex-direction: row; 
    margin: 0.5em 0 0.5em 0;
    padding: 10px 0 10px 0;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #fafafa;
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.p`
    display: flex;
    text-align: center;
    justify-content: center;
    flex: ${props => props.flex || 1};
`;

const FieldHeaderLabel = styled.b`
    display: flex;
    align-items: center;
    justify-content: center;
    tex-align: center;
    flex: ${props => props.flex || 1};
`;

const StyledAction = styled.p`
    margin: 2px 5px 0 5px;
    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
`

const ProductHeader = (props) => (<FieldRow>
    <FieldHeaderLabel flex={2}>
        Product Name
    </FieldHeaderLabel>
    <FieldHeaderLabel>
        Display
    </FieldHeaderLabel>
    <FieldHeaderLabel>
        Units
    </FieldHeaderLabel>
    <FieldHeaderLabel flex={1.5}>
        Suggested Price
    </FieldHeaderLabel>
    <FieldHeaderLabel>
        Total Amount
    </FieldHeaderLabel>
    {props.requisitions[props.currentRequisition].status === 'DRAFT' && (
        <FieldHeaderLabel>
            Actions
        </FieldHeaderLabel>
    )}
    
</FieldRow>)

class DeleteVenueModal extends React.Component {
    
    state = {
        show: false,
    }

    close = () =>  {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    delete = () => {
        const {deleteRequisitionOrder, order, requisitions, currentRequisition, closeParent} = this.props;
        deleteRequisitionOrder(requisitions[currentRequisition].id, order.id);
        this.close();
        closeParent();
    }

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <StyledAction onClick={this.open}>Remove</StyledAction>
        
                <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                    <Modal.Body>
                        Are you sure you want to delete this Order? 
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.delete} color="red">
                        Ok
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

class ProductOrder extends Component {
    render () {
        const {order, requisitions, currentRequisition} = this.props;
        return (
            <FieldRow>
                <FieldLabel flex={2}>
                    {order.product.name}
                </FieldLabel>
                <FieldLabel>
                    {order.is_display ? 'Yes' : 'No'}
                </FieldLabel>
                <FieldLabel>
                    {order.units}
                </FieldLabel>
                <FieldLabel flex={1.5}>
                    {order.price}
                </FieldLabel>
                <FieldLabel>
                    {order.units * order.product.metric_amount}{order.product.metric}
                </FieldLabel>
                {(requisitions[currentRequisition].status === 'DRAFT' || requisitions[currentRequisition].status === 'CHANGES REQUIRED' ) && (
                    <FieldLabel>
                        <DeleteVenueModal {...this.props}/>
                    </FieldLabel>
                )}
                
            </FieldRow>
        )
    }
}

export default class ProductOrders extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
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

    getOrders = () => {
        const {event, requisitions, currentRequisition} = this.props;
        const {orders} = requisitions[currentRequisition];

        const event_orders = orders.filter(ord => ord.brief_event_id === event.id);

        if (!event_orders || event_orders.length < 1) return <FieldRow><FieldLabel>No products assigned</FieldLabel></FieldRow>
    
        const orders_array = event_orders.map(order => <ProductOrder order={order} {...this.props} closeParent={this.close}/>);
        return [<ProductHeader {...this.props}/>, ...orders_array];
    }

    render() {
        const {show} = this.state;
        const {event, requisitions, currentRequisition} = this.props;
        return (
            <React.Fragment>
                <a onClick={this.open} color="green">{requisitions[currentRequisition].status === 'APPROVED' ? 'Show Products' : 'Edit Products'}</a>
        
                <Modal show={show} onHide={this.close} size="md">
                    <Modal.Header>
                        <Modal.Title>Products assigned to {event.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.getOrders()}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.close} appearance="subtle">
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
  }
  