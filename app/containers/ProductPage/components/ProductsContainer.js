import React, { Component } from 'react'
import styled from 'styled-components';
import ProductsTable from './ProductsTable';
import ProductsHeader from './ProductsHeader';
import { Divider, Message } from 'rsuite';
import RoleValidator from 'components/RoleValidator';

const Centered = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`

const StyledContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    max-width: 1500px;
    margin: 1em 2em 0 2em;
`

const StyledRow = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    margin: 1em 0 0 0;
`

const StyledMessage = styled(Message)`
    margin: 0 0 1em 0;
`


export default class ProductsContainer extends Component {

    state = {
        product_type_filter: 'ALL',
        product_subtype_filter: 'ALL',
    }

    handleChange = (value, name) => {
        if (name === 'product_type_filter') {
            this.setState({
                [name]: value, 
                product_subtype_filter: 'ALL'
            })
        } else {
            this.setState({[name]: value});
        }
        
    }

    render() {
        const {success, error, dismiss, products} = this.props;
        return (
            <React.Fragment>
                <RoleValidator 
                    {...this.props}
                    {...this.state}
                    scopes={['BRAND']}
                    roles={['OWNER', 'MANAGER', 'WAREHOUSE_MANAGER']}
                >
                    {products && products.length < 1 && <Message type="info" description="You don't have products on this location. If you're a team collaborator you can start adding by doing click on the button below. "/>}
                </RoleValidator>
                <RoleValidator 
                    {...this.props}
                    {...this.state}
                    scopes={['REGION', 'AGENCY']}
                    roles={['OWNER', 'MANAGER']}
                >
                    {products && products.length < 1 && <Message type="info" description="This location doesn't have any products. You'll be able to track all the products once they are added."/>}
                </RoleValidator>
                <Centered>
                    <StyledContainer>
                        <StyledRow>
                            <ProductsHeader 
                                {...this.props}
                                {...this.state}
                                handleChange={this.handleChange}
                            />
                        </StyledRow>
                        <Divider />
                        <StyledRow>
                            <ProductsTable 
                                {...this.props}
                                {...this.state}
                            />
                        </StyledRow>
                    </StyledContainer>
                </Centered>
                
            </React.Fragment>
            
        )
    }
}
