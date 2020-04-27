import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Checkbox } from 'rsuite'
import AddProductModal from './AddProductModal';

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: space-between;
    flex: 1;
`

const HeaderSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.reverse ? 'flex-end' : 'flex-start'};
    flex: 1;
`

export default class ProductsHeader extends Component {

    handleToggle = (filter) => {
        const {toggleFilter} = this.props;
        toggleFilter(filter);
    }


    render() {
        const {productsEnabled} = this.props;
        return (
            <StyledHeader>
                <HeaderSection>
                    <AddProductModal {...this.props}/>
                </HeaderSection>
                <HeaderSection reverse>
                    <Checkbox 
                        checked={productsEnabled.indexOf('Product') > -1}
                        onClick={() => this.handleToggle('Product')}
                    >
                        Products
                    </Checkbox>
                    <Checkbox 
                        checked={productsEnabled.indexOf('Cocktail') > -1}
                        onClick={() => this.handleToggle('Cocktail')}
                    >
                        Cocktails
                    </Checkbox>
                </HeaderSection>
            </StyledHeader>
        )
    }
}
