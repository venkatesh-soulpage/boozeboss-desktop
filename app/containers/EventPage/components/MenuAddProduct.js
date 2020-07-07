import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, InputNumber} from 'rsuite'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const styles = {
    width: '300px',
    margin: '0.75em 0 0 0'
  }

export default class MenuAddProduct extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        product_options: null,
        product: null,
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

    getPickerData = () => {
        const {products, event} = this.props;

        if (!products || !event) return [];

        const brief_brands = event.brief.brands.map(brand => brand.brand_id);

        const available_products = products
            .filter((prod) => {
        
                // filters
                const has_brief_brand = !prod.is_cocktail && prod.brand && brief_brands.indexOf(prod.brand.id) > -1;
                const is_ingredient = !prod.is_cocktail &&  prod.brand && prod.brand.product_type !== 'Liquour';

                return has_brief_brand || is_ingredient;
            })
            .map(prod => {
                return {
                    label: prod.is_cocktail ? `${prod.name} - ${prod.metric_amount}${prod.metric} (Cocktail)` : `${prod.name} - ${prod.metric_amount}${prod.metric}`,
                    value: prod
                }
            });

        const available_product_ids = [...new Set(available_products.map(prod => prod.value.brand_id))]; 
        const available_cocktails = products
            .filter((prod => {
                return prod.is_cocktail;
            }))
           .filter((prod) => {
                const ingredient_brands = prod.ingredients.filter((ing) => ing.product.brand_id).map((ing) => ing.product.brand_id);   
                const available_ingredients = ingredient_brands.filter(ib => {
                    return available_product_ids.indexOf(ib) > -1;
                })
                return available_ingredients.length >= 0;
            }) 
            .map(prod => {
                return {
                    label: prod.is_cocktail ? `${prod.name} - ${prod.metric_amount}${prod.metric} (Cocktail)` : `${prod.name} - ${prod.metric_amount}${prod.metric}`,
                    value: prod
                }
            });

        const no_brand_products = 
            products
                .filter(prod => {
                    const is_no_brand = ['BRAND_ASSET', 'MIXER', 'INGREDIENT'].indexOf(prod.product_type) > -1;
                    return is_no_brand;
                })
                .map(prod => {
                    return {
                        label: `${prod.name} - ${prod.metric_amount}${prod.metric}`,
                        value: prod
                    }
                });
    

        this.setState({
            product_options: [...available_cocktails, ...available_products, ...no_brand_products],
        })
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
        const {show, product_options, product, price} = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open} color="green">+ Add Product</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Product (Required)</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={product_options}
                                onChange={(value) => this.handleChange(value, 'product')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Price (Required)</FieldLabel>
                            <InputNumber
                                min={0}
                                value={price}
                                onChange={(value) => this.handleChange(value, 'price')}
                            />
                        </FieldContainer>
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
  