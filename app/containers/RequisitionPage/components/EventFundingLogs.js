import React, { Component } from 'react'
import {Modal, Button, Table, Loader, Input, SelectPicker, InputNumber, Icon} from 'rsuite'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';
import request from 'utils/request';
import moment from 'moment';

const {Column, HeaderCell, Cell } = Table;


const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const typeOptions = [
    { label: 'Product', value: 'PRODUCT' },
    { label: 'Cocktail', value: 'COCKTAIL' },
    { label: 'Brand Asset', value: 'BRAND_ASSET' },
    { label: 'Mixer', value: 'MIXER' },
    { label: 'Ingredient', value: 'INGREDIENT' },
    { label: 'Consumable', value: 'CONSUMABLE' },
];
  
const subtypesOptions = {
    MIXER: [
      { label: 'Soda', value: 'SODA' },
      { label: 'Packed Juice', value: 'PACKED_JUICE' },
      { label: 'Fresh Juice', value: 'FRESH_JUICE' },
      { label: 'Syrup', value: 'SYRUP' },
      { label: 'Other', value: 'OTHER' },
    ],
    CONSUMABLE: [{ label: 'Consumable', value: 'CONSUMABLE' }],
    INGREDIENT: [
      { label: 'Whole Fruit', value: 'WHOLE_FRUIT' },
      { label: 'Flavoring Bitter', value: 'FLAVORING_BITTER' },
      { label: 'Other', value: 'OTHER' },
    ],
    BRAND_ASSET: [
      { label: 'Mobile Bar', value: 'MOBILE_BAR' },
      { label: 'POS', value: 'POS' },
      { label: 'Cocktail Equipment', value: 'COCKTAIL_EQUIPMENT' },
      { label: 'Other', value: 'OTHER' },
    ],
};

export default class MenuAddProduct extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        logs: null
      };
    }

    componentDidMount = () => {
    }

    close = () => {
        this.setState({
            show: false,
            logs: []
        });
    }

    open = () => {
      this.setState({ show: true });
      this.getLogs();
    }

    getLogs = async () => {
        const {event} = this.props;
    
        const options = {
            method: 'GET'
        }

        const logs = await request(`${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event.event.id}/funding-logs`, options);
        
        this.setState({logs});
    }

    render() {
        const {show, logs} = this.state;
        return (
            <React.Fragment>
                <a onClick={this.open}>Show Funding Logs</a>
        
                <Modal show={show} onHide={this.close} size="md">
                    <Modal.Body>
                        {logs ? (
                            <Table
                                data={logs}
                                height={600}
                            >
                                <Column width={200}>
                                    <HeaderCell>
                                        Account 
                                    </HeaderCell>
                                    <Cell dataKey="account">
                                        {rowData => `${rowData.account.first_name} ${rowData.account.last_name}` }
                                    </Cell>
                                </Column>
                                <Column width={100}>
                                    <HeaderCell>
                                        Action 
                                    </HeaderCell>
                                    <Cell dataKey="action">
                                        {rowData => `${rowData.action}` }
                                    </Cell>
                                </Column>
                                <Column width={100}>
                                    <HeaderCell>
                                        Amount 
                                    </HeaderCell>
                                    <Cell dataKey="amount">
                                        {rowData => <span>{rowData.amount}<Icon icon="circle" style={{color: '#c2b90a', margin: '0 0.5em 0 0.5em'}}/></span> }
                                    </Cell>
                                </Column>
                                <Column width={150}>
                                    <HeaderCell>
                                        Time 
                                    </HeaderCell>
                                    <Cell dataKey="time">
                                        {rowData => moment(rowData.created_at).format('DD/MM/YYYY LT')}
                                    </Cell>
                                </Column>
                            </Table>
                        ) : (
                            <Loader />
                        )}
                        
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.close} appearance="subtle">
                        Ok
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
  }
  