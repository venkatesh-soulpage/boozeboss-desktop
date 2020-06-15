import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, TreePicker} from 'rsuite'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const product_types = [
    {
        label: 'Tequila',
        value: 'Tequila',
        role: 'Tequila',
    },
    {
        label: 'Vodka',
        value: 'Vodka',
        role: 'Vodka',
    },
    {
        label: 'Ginebra',
        value: 'Ginebra',
        role: 'Ginebra',
    },
    {
        label: 'Soda',
        value: 'Soda',
        role: 'Soda',
    },
    {
        label: 'Ingredient',
        value: 'Ingredient',
        role: 'Ingredient',
    },
    {
        label: 'Other',
        value: 'Other',
        role: 'Other',
    },

]


export default class CreateWarehouseModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        locationOptions: [],
        name: null,
        location_id: null,
        product_type: null,
        description: null,
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    handleChange = (value, name) => {
        console.log(value, name)
        this.setState({[name]: value});
    }

    getLocationOptions = () => {
        const {clients, currentClient} = this.props;

        const {location} = clients[currentClient];
         
        if (!location) return [];
        
        const locationOptions = 
                    location.childrens.map(state => {
                        const children = state.childrens.map(city => {
                            return {
                                label: city.name,
                                value: city.id,
                            }
                        })
                        return {
                            label: state.name,
                            value: state.id,
                            children
                        }
                    })

        return locationOptions;
    }

    create = async () => {
        const {createWarehouse, clients, currentClient} = this.props;
        const {name, address, location_id } = this.state;
        if ( !name || !address || !location_id) return;
        const client_id = clients[currentClient].id;
        await createWarehouse({name, address, location_id, client_id});
        this.close();
    }

    render() {
        const {show, location_id} = this.state;
        return (
            <React.Fragment>
                <Button id="new-venue" onClick={this.open} color="green" block>+ Add Warehouse</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Name</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'name')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Address</FieldLabel>
                            <Input
                                componentClass="textarea"
                                rows={2}
                                style={{resize: 'auto' }}
                                onChange={(value) => this.handleChange(value, 'address')}
                            />
                        </FieldContainer> 
                        <FieldContainer>
                            <FieldLabel>Location</FieldLabel>
                            <TreePicker 
                                virtualized
                                value={location_id}
                                data={this.getLocationOptions()}
                                onChange={(value) => this.handleChange(value, 'location_id')}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.create} color="green">
                        Create
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
  