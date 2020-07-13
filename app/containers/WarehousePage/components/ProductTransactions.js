import React, { Component } from 'react'
import {Modal, Button, Table} from 'rsuite'
import styled from 'styled-components';
import moment from 'moment';

const {Column, HeaderCell, Cell } = Table;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

export default class ProductTransactions extends React.Component {
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


    getWarehouseTransactions = () => {
        const {warehouses, currentWarehouse, transactions} = this.props;

        if (!transactions || transactions.length < 1) return [];

        const data = transactions.filter(tx => tx.warehouse_id === warehouses[currentWarehouse].id);
        return data;
    }

    goToRequisition = (requisition) => {
        const {history} = this.props;
        history.push({
          pathname: '/requisitions',
          requisition_id: requisition.id,
        });
      }

    render() {
        const {show} = this.state;
        const {transactions, product, quantity} = this.props;
        return (
            <React.Fragment>
                <a onClick={this.open} color="green">Show transactions</a>
        
                <Modal show={show} onHide={this.close} size="md">
                    <Modal.Header>
                        <Modal.Title>{`${product.name} - ${product.metric_amount}${product.metric} (${quantity} left on stock)`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Table
                                data={this.getWarehouseTransactions()}
                                height={800}
                            >
                                <Column width={100}>
                                    <HeaderCell>
                                        Quantity
                                    </HeaderCell>
                                    <Cell dataKey="quantity">
                                        {rowData => {
                                            if (rowData.action === 'ADD' || rowData.action === 'REFUND (DISPUTE)' ) {
                                                return `+ ${rowData.quantity}`
                                            } else {
                                                return `- ${rowData.quantity}`
                                            }
                                            
                                        }}
                                    </Cell>
                                </Column>
                                <Column width={200}>
                                    <HeaderCell>
                                        Action
                                    </HeaderCell>
                                    <Cell dataKey="action">
                                        {rowData => rowData.action}
                                    </Cell>
                                </Column>
                                <Column width={100}>
                                    <HeaderCell>
                                        Requisition
                                    </HeaderCell>
                                    <Cell dataKey="action">
                                        {rowData => rowData.requisition ? <a onClick={() => this.goToRequisition(rowData.requisition)}>{`#${rowData.requisition.serial_number}`}</a> : '-'}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Done by
                                    </HeaderCell>
                                    <Cell dataKey="action">
                                        {rowData => `${rowData.account.first_name} ${rowData.account.last_name}` }
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Date
                                    </HeaderCell>
                                    <Cell dataKey="date">
                                        {rowData => moment(rowData.created_at).format('DD/MM/YYYY hh:mm')}
                                    </Cell>
                                </Column>
                            </Table>                   
                        </div>
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
  