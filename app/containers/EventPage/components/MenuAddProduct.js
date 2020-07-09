import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, InputNumber, Icon} from 'rsuite'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';

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
        product_options: null,
        product: null,
        product_type: null,
        product_subtype: null,
        price: null,
      };
    }

    componentDidMount = () => {
    }

    close = () => {
        this.setState({
            show: false,
            product: null,
            price: null,
        });
    }

    open = () => {
      this.setState({ show: true });
      this.getPickerData();
    }

    getAvailable = (id) => {
        const { event } = this.props;
        const {orders} = event;

        const products_ids = [];

        orders.map(order => {
            products_ids.push(order.product_id);
            order.product.ingredients.map((ing) => {
                products_ids.push(ing.product_id);
            });
        })

        return products_ids.indexOf(id) > -1;
    }

    getPickerData = () => {
        const {products, event} = this.props;
        const {product_type, product_subtype} = this.state;

        if (!products || !event || !product_type) return [];

        const menu_ids = event.event.products.map(product => product.product_id);

        const available_products = products
            .filter(prod => menu_ids.indexOf(prod.id) < 0)
            .filter((prod) => {
                if (prod.product_type === 'PRODUCT') {
                    return this.getAvailable(prod.id) && prod.product_type === product_type;
                } else if (prod.product_type === 'COCKTAIL') {
                    return this.getAvailable(prod.id) && prod.product_type === product_type;
                } else {
                    if (!product_subtype) {
                        return prod.product_type === product_type;
                    } else {
                        return prod.product_type === product_type && prod.product_subtype === product_subtype;
                    }

                }
            })
            .map(prod => {
                return {
                    label: `${prod.name} - ${prod.metric_amount}${prod.metric}`,
                    value: prod
                }
            });

        return available_products;

    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    addProduct = async () => {
        const {addEventProduct, event} = this.props;
        const {product, price} = this.state;
        addEventProduct(event.event.id, {product_id: product.id, price}); 
        this.close();
    }

    render() {
        const { user } = this.props;
        const {show, product, price, product_type, product_subtype} = this.state;
        const product_options = this.getPickerData();
        return (
            <React.Fragment>
                <Button onClick={this.open} color="green" style={{width: '200px'}}>+ Add Product</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Product (Required)</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={typeOptions}
                                onChange={(value) => this.handleChange(value, 'product_type')}
                            />
                        </FieldContainer>
                        {product_type && !(['PRODUCT', 'COCKTAIL'].indexOf(product_type) > -1) && (
                            <FieldContainer>
                                <FieldLabel>Product (Required)</FieldLabel>
                                <SelectPicker 
                                    searchable={false}
                                    data={subtypesOptions[product_type]}
                                    onChange={(value) => this.handleChange(value, 'product_subtype')}
                                />
                            </FieldContainer>
                        )}
                        {product_type && (
                            <FieldContainer>
                                <FieldLabel>Product (Required)</FieldLabel>
                                <SelectPicker 
                                    searchable={true}
                                    data={product_options}
                                    onChange={(value) => this.handleChange(value, 'product')}
                                />
                            </FieldContainer>
                        )}
                        {product_type && product && (
                            <FieldContainer>
                                <FieldRow>
                                    <FieldLabel>Price (Required)</FieldLabel>
                                    {price && (
                                        <FieldLabel>
                                            <span>~{Math.round(user.location.currency_conversion * price * 100) / 100}<Icon icon="circle" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/></span>
                                        </FieldLabel>
                                    )}
                                    
                                </FieldRow>
                                <InputNumber
                                    prefix={user && user.location.currency}
                                    min={0}
                                    value={price}
                                    onChange={(value) => this.handleChange(value, 'price')}
                                />
                            </FieldContainer>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.addProduct} color="green">
                        Add
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
  