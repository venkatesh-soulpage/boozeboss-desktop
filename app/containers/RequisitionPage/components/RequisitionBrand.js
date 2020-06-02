import React, { Component } from 'react'
import styled from 'styled-components';
import { Progress, Panel } from 'rsuite'

const { Line } = Progress;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0.5em 0 0.5em 0;
    align-items: center;
`

const ProductSection = styled.div`
    display: flex;
    flex: 1;
`

const ProgressSection = styled.div`
    display: flex;
    flex: 3;
`

class ProductRow extends Component {

    state = {
        product: null,
    }

    componentDidMount = () => {
        const {product_id, products} = this.props;
        if (!products) return;
        const product = products.find(product => product.id === product_id );
        this.setState({product})
    }

    getCurrentUnits = () => {
        const {requisitions, currentRequisition, product_id} = this.props;
        const requisition = requisitions[currentRequisition];
        const {orders} = requisition;
        

        const currentUnits = orders.reduce((acc, curr) => {

            const ingredient_ids = curr.product.ingredients.map(ing => ing.product_id);

            if ( product_id === curr.product_id ) {
                return Number(acc) + Number(curr.units);
            } else if ( ingredient_ids.indexOf(product_id) > -1 ){
                // Calculate bottles from units
                const ingredient = curr.product.ingredients.find(ing => ing.product_id === product_id );
                const totalml = ingredient.quantity * curr.units;
                const totalUnits = Math.round(totalml / curr.product.metric_amount); 
                return acc + totalUnits;
            } else {
                return acc;
            }
        }, 0);

        return currentUnits;
    }

    render() {
        const {products, product_id} = this.props;
        const product = products && products.find(product => product.id === product_id );
        return (
        <div>
            {product && (
                <FieldRow>
                    <ProductSection>{product.name} ({product.metric_amount} {product.metric})</ProductSection>
                    <ProductSection>{this.getCurrentUnits()} units</ProductSection>
                </FieldRow>
            )}
        </div>
        )
    }
}


export default class RequisitionProduct extends Component {

    getProductProgress = () => {
        const {requisitions, currentRequisition, brief_product} = this.props;
        const requisition = requisitions[currentRequisition];
        const {orders} = requisition;

        // Calculate the bottles
        const currentUnits = orders.reduce((acc, curr) => {

            const ingredient_ids = curr.product.ingredients.map(ing => ing.product_id);

            if ( brief_product.product_id === curr.product_id ) {
                // If its bottle of vodka just add the bottles 
                return Number(acc) + Number(curr.units);
            } else if ( ingredient_ids.indexOf(brief_product.product_id) > -1 ){
                // Calculate bottles from units
                const ingredient = curr.product.ingredients.find(ing => ing.product_id === brief_product.product_id );
                const totalml = ingredient.quantity * curr.units;
                const totalUnits = Math.round(totalml / brief_product.product.metric_amount); 
                return acc + totalUnits;
            } else {
                return acc;
            }
        }, 0);

        const progress = (Math.round(currentUnits / brief_product.limit * 100) / 100) * 100;
        return progress;

    }
    

    getCurrentUnits = () => {
        const {requisitions, currentRequisition, brief_brand} = this.props;
        const requisition = requisitions[currentRequisition];
        const {orders} = requisition;
        

        const currentUnits = orders.reduce((acc, curr) => {

            const ingredient_ids = curr.product.ingredients.map(ing => ing.product_id);

            if ( brief_product.product_id === curr.product_id ) {
                return Number(acc) + Number(curr.units);
            } else if ( ingredient_ids.indexOf(brief_product.product_id) > -1 ){
                // Calculate bottles from units
                const ingredient = curr.product.ingredients.find(ing => ing.product_id === brief_product.product_id );
                const totalml = ingredient.quantity * curr.units;
                const totalUnits = Math.round(totalml / brief_product.product.metric_amount); 
                return acc + totalUnits;
            } else {
                return acc;
            }
        }, 0);

        return currentUnits;
    }
    
    getOrderProducts = () => {
        const {requisitions, currentRequisition, type} = this.props;
        const requisition = requisitions[currentRequisition];
        const {orders} = requisition;

        if (!requisitions) return [];

        // Filter the products for the brand
        // Products for brands
        const category_products = 
                orders
                    .filter(order => !order.product.is_cocktail)
                    .filter(order => order.product.product_type === type)
                    .map(order => order.product_id);
            
        const cocktail_products_id = [];
        orders
            .filter(order => order.product.is_cocktail)
            .map(order => {
                order.product.ingredients.map(ing => {
                    if (ing.product.product_type === type) {
                        cocktail_products_id.push(ing.product_id);
                    }
                })
            })   

        const all_ids = [...category_products, ...cocktail_products_id];
        const unique_products = [...new Set(all_ids)];

        // Return the available products         
        return unique_products.map(product_id => <ProductRow {...this.props} product_id={product_id} />)        

    }

    render() {
        const {type} = this.props;
        return (
            <Panel header={type} collapsible bordered>
                {this.getOrderProducts()}
            </Panel>
        )
    }
}
