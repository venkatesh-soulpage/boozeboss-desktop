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

/* const categories_old = {
    'Liquour': [
        'Whisky', 'Vodka', 'Rum', 'Brandy', 'Cognac', 'Tequila', 'Liqueur', 'Beer', 'Gin', 'Fortified Wine', 'Sake', 'Table Wine', 'Cachaca', 'Mezcal', 'Bitters', 'Vermount', 'Champagne', 'Other' 
    ],
    'Mixers': [
        'Soda', 'Packed Juice', 'Fresh Juice', 'Syrup', 'Other'
    ],
    'Consumable': [
        'Consumable'
    ],
    'Ingredient': [
        'Whole Fruit', 'Flavoring Bitter', 'Other'
    ],
    'Brand Asset': [
        'Mobile Bars', 'POS', 'Cocktail Equipment'
    ]
} */

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

export default class CreateBrandModal extends React.Component {
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
        const {name, description, product_type, product_subtype } = this.state;
        if ( !name || !description || !product_type || !product_subtype) return Alert.error('Missing fields', 2000);
        const client_id = clients[currentClient].id;
        await createBrand({name, description, product_type, product_subtype, client_id});
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
        const {show, product_type} = this.state;
        return (
            <React.Fragment>
                <Button id="new-venue" onClick={this.open} color="green" block>+ Add Brand</Button>
        
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
                                data={this.getCategories()}
                                onChange={(value) => this.handleChange(value, 'product_type')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Product SubCategory (Required)</FieldLabel>
                            <SelectPicker 
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
  