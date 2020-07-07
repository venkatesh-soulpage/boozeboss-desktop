import React, { Component } from 'react'
import {Modal, Button, Input, InputNumber} from 'rsuite'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export default class EditConversionRate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          show: false,
          currency_amount: 1,
          coins_amount: 1,
      };
    }

    close = () => {
      this.setState({ show: false, currency_amount: 1, coins_amount: 1 });
    }

    open = () => {
      this.setState({ show: true });
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    handleSubmit = () => {
        const {currency_amount, coins_amount} = this.state;
        const { updateLocationRate, rowData } = this.props;
        if (!currency_amount || !coins_amount) return alert('Invalid fields');

        const currency_conversion = Math.round(coins_amount / currency_amount * 10000) / 10000;

        updateLocationRate(rowData.id, currency_conversion);
        this.close();
    }

    render() {
        const {show, currency_amount, coins_amount} = this.state;
        const {rowData} = this.props;
        return (
            <React.Fragment>
                <a onClick={this.open}>Edit Rate</a>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldRow>
                                <FieldLabel>Conversion Rate</FieldLabel>
                                <FieldLabel>1 {rowData.currency} = {(currency_amount && coins_amount) ? Math.round(coins_amount / currency_amount * 10000) / 10000 : '-'} COINS</FieldLabel>
                            </FieldRow>
                            
                            <InputNumber 
                                prefix={rowData.currency}
                                value={currency_amount}
                                min={0.00001}
                                onChange={(value) => this.handleChange(value, 'currency_amount')}
                            />
                            <br />
                            <InputNumber 
                                prefix="Coins" 
                                value={coins_amount}
                                min={0.00001}
                                onChange={(value) => this.handleChange(value, 'coins_amount')}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button color="green" onClick={this.handleSubmit}>
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
  