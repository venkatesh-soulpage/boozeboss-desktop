import React, { Component } from 'react'
import styled from 'styled-components';
import ProductsTable from './ProductsTable';
import ProductsHeader from './ProductsHeader';
import { Divider } from 'rsuite';

const StyledContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 1100px;
    margin: 1em 2em 0 2em;
`

const StyledRow = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    margin: 1em 0 0 0;
`

export default class ProductsContainer extends Component {
    render() {
        return (
            <StyledContainer>
                <StyledRow>
                    <ProductsHeader 
                        {...this.props}
                    />
                </StyledRow>
                <Divider />
                <StyledRow>
                    <ProductsTable 
                        {...this.props}
                    />
                </StyledRow>
            </StyledContainer>
        )
    }
}
