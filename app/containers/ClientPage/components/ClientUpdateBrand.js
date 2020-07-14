import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, Alert} from 'rsuite'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;


const categories = {
    'Whisky': ['Blended Scotch', 'Irish Whiskey', 'Japanese Whisky', 'Canadian Whisky',	'Bourbon Whiskey','Tennessee Whiskey', 'Single Malt Whisky'],
    'Vodka': ['Non-Flavored Vodka', 'Flavored Vodka',],
    'Rum': ['White Rum', 'Aged Rum'	, 'Cachaça', 'Spiced Rum', 'Agricole Rum', 'Overproof Rum'],
    'Brandy': ['Brandy'],
    'Cognac' : ['Cognac', 'Armanac', 'Calvados', 'South African Brandy'],
    'Tequila': ['Blanco', 'Reposado','Anejo', 'Joven'],
    'Liqueur': ['Bitters',  'Fruit Liqueur', 'Other Liqueur', 'Cream Liqueur', 'Herbal Liqueur'],
    'Beer': ['Larger', 'Stout', 'Pilsner', 'Speciality Beer'],
    'Gin': ['London Dry', 'Plymouth', 'Genver', 'Old Tom'],
    'Fortifies Wine': ['Fortified Wine'],
    'Sake': ['Sake'],
    'Table Wine': ['Sparkling Wine', 'Champagne',' Table Wine', 'Fortified Wine', 'Vermouth'],
    'Cachaca': ['Cachaca'],
    'Mezcal': ['Mezcal'],
    'Bitters': ['Bitters'],
    'Vermount': ['Vermount'],
    'Champagne': ['Champagne'],
    'Other': ['Other'],
}

export default class ClientUpdateBrand extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        name: null,
        product_type: null,
        product_subtype: null,
        description: null,
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
        const {brand} = this.props;
        this.setState({ show: true, ...brand });
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
        const {updateBrand, brand} = this.props;
        const {name, description, product_type, product_subtype } = this.state;
        if ( !name || !description || !product_type || !product_subtype) return Alert.error('Missing fields', 2000);
        await updateBrand(brand.id, {name, description, product_type, product_subtype});
        this.close();
    }

    getCategories = () => {
        const category_keys = Object.keys(categories);
        return category_keys.map(key => {
            return {
                label: key, value: key,
            }
        })
    }

    getSubCategories = () => {
        const {product_type} = this.state;
        if (!product_type) return [];
        return categories[product_type].map(key => {
            return {
                label: key, value: key,
            }
        })
    }

    render() {
        const {show, name, description, product_type, product_subtype} = this.state;
        return (
            <React.Fragment>
                <a onClick={this.open}>Update</a>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Name (Required)</FieldLabel>
                            <Input 
                                value={name}
                                onChange={(value) => this.handleChange(value, 'name')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Product Category (Required)</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                value={product_type}
                                data={this.getCategories()}
                                onChange={(value) => this.handleChange(value, 'product_type')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Product SubCategory (Required)</FieldLabel>
                            <SelectPicker 
                                value={product_subtype}
                                disabled={!product_type}
                                searchable={false}
                                data={this.getSubCategories()}
                                onChange={(value) => this.handleChange(value, 'product_subtype')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Description (Required)</FieldLabel>
                            <Input
                                componentClass="textarea"
                                rows={2}
                                value={description}
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
  