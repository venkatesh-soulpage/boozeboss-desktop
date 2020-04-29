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
    render() {
        const {brief_product} = this.props;
        return (
            <FieldRow> 
                <ProductSection>
                    {brief_product.product.name}
                </ProductSection>
                <ProgressSection>
                    <Line percent={0} status='active' />
                </ProgressSection>
                <ProductSection>
                    0/{brief_product.limit}
                </ProductSection>
            </FieldRow>
        )
    }
}
