import React, { Component } from 'react'
import styled from 'styled-components';
import {Modal, Button, SelectPicker, InputNumber, InputGroup, Divider} from 'rsuite'


const StyledCocktailBuilder = styled.div`
    display: flex;
    flex-direction: column;
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const IngredientRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px 0 5px 0;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: gray;
`;

const IngredientLabel = styled.p`
    margin: 0 1em 0 1em;
`


class CocktailModal extends Component {

    state = {
        show: false,
        productsOptions: null,
        product: null,
        amount: 0,
    }

    open = () => {
        this.setState({show: true});
        this.getPickerData();
    }

    close = () => {
        this.setState({show: false})
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    getPickerData = ()  => {
        const {products} = this.props;
        const productsOptions = products
            .filter(product => !product.is_cocktail)
            .map(product => {
                return {
                    label: `${product.name} - ${product.metric_amount} ${product.metric} (${product.brand.name})`,
                    value: product,
                    role: product.name,
                }
            })
        this.setState({productsOptions});
    }

    selectIngredient = () => {
        const {addIngredient} = this.props;
        const {product, amount} = this.state;
        addIngredient({product, amount});
        this.close();
    }

    render() {
        const {show, productsOptions, product, amount} = this.state;
        return (
            <React.Fragment>
                <Button style={{margin: '1em'}} onClick={this.open}>+ Add Ingredient</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Product</FieldLabel>
                            {productsOptions && productsOptions.length > 0 && (
                                <SelectPicker 
                                    searchable={false}
                                    data={productsOptions}
                                    onChange={(value) => this.handleChange(value, 'product')}
                                />
                            )}
                        </FieldContainer>
                        {product && (
                            <FieldContainer>
                                <FieldLabel>Amount</FieldLabel>
                                <InputGroup>
                                    <InputNumber 
                                        defaultValue={amount}
                                        value={amount}
                                        onChange={(value) => this.handleChange(value, 'amount')}
                                    />
                                    <InputGroup.Addon>
                                    {product.metric}
                                    </InputGroup.Addon>
                                </InputGroup>
                            </FieldContainer>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.selectIngredient} color="green">
                        Add
                    </Button>
                    <Button onClick={this.close} appearance="subtle">
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }

}

const Ingredient = ({ingredient}) => (
    <IngredientRow>
        <IngredientLabel>{ingredient.product.name}</IngredientLabel>
        <IngredientLabel>{ingredient.product.brand.product_type}</IngredientLabel>
        <IngredientLabel>{ingredient.product.brand.name}</IngredientLabel>
        <IngredientLabel>{ingredient.amount}{ingredient.product.metric}</IngredientLabel>
    </IngredientRow>
)

export default class CocktailBuilder extends Component {
    render() {
        const {ingredients} = this.props;
        return (
            <StyledCocktailBuilder>
                <FieldContainer>
                    <FieldLabel>Ingredients</FieldLabel>
                    {ingredients &&
                        ingredients.length > 0 &&
                        ingredients.map(ingredient => <Ingredient ingredient={ingredient}/>)}
                    <CocktailModal {...this.props} />
                </FieldContainer>
            </StyledCocktailBuilder>
        )
    }
}
