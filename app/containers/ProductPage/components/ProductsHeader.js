import React, { Component } from 'react'
import styled from 'styled-components';
import { Button } from 'rsuite'
import AddProductModal from './AddProductModal';

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: space-between;
    flex: 1;
`

const HeaderSection = styled.div`
    display: flex;
    flex: 1;
`

export default class ProductsHeader extends Component {
    render() {
        return (
            <StyledHeader>
                <HeaderSection>
                    <AddProductModal {...this.props}/>
                </HeaderSection>
                <HeaderSection>
                    
                </HeaderSection>
            </StyledHeader>
        )
    }
}
