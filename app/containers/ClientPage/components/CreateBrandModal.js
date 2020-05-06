import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker} from 'rsuite'
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
        label: 'Spirit',
        value: 'Spirit',
        role: 'Spirit',
    },
    {
        label: 'Mixer',
        value: 'Mixer',
        role: 'Mixer',
    },
    {
        label: 'Beer',
        value: 'Beer',
        role: 'Beer',
    },
    {
        label: 'Fruits',
        value: 'Fruits',
        role: 'Fruits',
    },
    {
        label: 'Juice',
        value: 'Juice',
        role: 'Juice',
    },
    {
        label: 'Branding Item',
        value: 'Branding Item',
        role: 'Branding Item',
    },
    {
        label: 'Consumable',
        value: 'Consumable',
        role: 'Consumable',
    },
    {
        label: 'Mobile Bar',
        value: 'Mobile Bar',
        role: 'Mobile Bar',
    },
    {
        label: 'Cocktail',
        value: 'Cocktail',
        role: 'Cocktail',
    },
    {
        label: 'Bar Equipment',
        value: 'Bar Equipment',
        role: 'Bar Equipment',
    },
    {
        label: 'Other',
        value: 'Other',
        role: 'Other',
    },
]


export default class CreateBrandModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        name: null,
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
        this.setState({[name]: value});
    }

    componentDidMount = () => {
        const {showBrandModal} = this.props.location;

        if (showBrandModal) {
            this.open();
        }
    }

    create = async () => {
        const {createBrand, clients, currentClient} = this.props;
        const {name, description, product_type } = this.state;
        if ( !name || !description || !product_type) return;
        const client_id = clients[currentClient].id;
        await createBrand({name, description, product_type, client_id});
        this.close();
    }

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <Button id="new-venue" onClick={this.open} color="green">+ Add Brand</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Name (Required)</FieldLabel>
                            <Input 
                                onChange={(value) => this.handleChange(value, 'name')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Product Category (Required)</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={product_types}
                                onChange={(value) => this.handleChange(value, 'product_type')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Description (Required)</FieldLabel>
                            <Input
                                componentClass="textarea"
                                rows={2}
                                style={{resize: 'auto' }}
                                onChange={(value) => this.handleChange(value, 'description')}
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
  