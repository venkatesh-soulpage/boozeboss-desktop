import React, { Component } from 'react'
import styled from 'styled-components';
import { Progress } from 'rsuite'

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
        const {requisitions, currentRequisition, brief_product} = this.props;
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

    render() {
        const {brief_product} = this.props;
        return (
            <FieldRow> 
                <ProductSection>
                    {brief_product.product.name}
                </ProductSection>
                <ProgressSection>
                    <Line percent={this.getProductProgress()} status={this.getProductProgress() >= 100 ? 'success' : 'active'} />
                </ProgressSection>
                <ProductSection>
                    {this.getCurrentUnits()}/{brief_product.limit}
                </ProductSection>
            </FieldRow>
        )
    }
}
