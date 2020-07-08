import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, Radio, RadioGroup, InputNumber, InputGroup, Checkbox, Divider, Icon} from 'rsuite'
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
    flex: ${props => props.flex || 1};
    margin: 0 0.5em 0.5em 0;
`;

const FieldDeliveryAction= styled.a`
    display: flex;
    flex: ${props => props.flex || 1};
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

export default class ClientAddCollaboratorCredits extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        credits_amount: 0,
      };
    }


    close = () => {
      this.setState({ show: false, credits_amount: 0 });
    }

    open = () => {
      this.setState({ show: true });
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    addCredits = () => {
        const { collaborator, addCollaboratorCredits } = this.props;
        const {credits_amount} = this.state;
        addCollaboratorCredits(collaborator.account.id, credits_amount);
        this.close();
    }

    render() {
        const {show, credits_amount } = this.state;
        return (
            <React.Fragment>
                <a onClick={this.open}>(+/-)</a>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Add/Remove Credits</FieldLabel>
                            <InputNumber 
                                prefix={<Icon icon="circle" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/>}
                                value={credits_amount}
                                onChange={(val) => this.handleChange(val, 'credits_amount')} 
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.addCredits} color="green">
                        Add/Remove Credits
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
  