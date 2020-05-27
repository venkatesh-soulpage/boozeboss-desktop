import React, { Component } from 'react'
import styled from 'styled-components';
import {Table} from 'rsuite';
import UpdateProductModal from './UpdateProductModal';
import RoleValidator from 'components/RoleValidator';

const { Column, HeaderCell, Cell} = Table;

const StyledTableSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
`


export default class ProductsTable extends Component {

    state = {
        sortColumn: null,
        sortType: null,
        loading: false,
    }

    getFilteredProducts = productsEnabled => {
        const {products} = this.props;
        if (!products) return [];

        // IF both products are enabled return all
        if (productsEnabled.indexOf('Cocktail') > -1 && productsEnabled.indexOf('Product') > -1) {
            return products;
        }

        if (productsEnabled.indexOf('Cocktail') > -1) {
            return products.filter(product => product.is_cocktail);
        }

        if (productsEnabled.indexOf('Product') > -1) {
            return products.filter(product => !product.is_cocktail);
        }
    }

    getData = (products) => {
        const data = products;
        const { sortColumn, sortType } = this.state;
    
        if (sortColumn && sortType) {
          return data.sort((a, b) => {
            let x = a[sortColumn];
            let y = b[sortColumn];
            if (typeof x === 'string') {
              x = x.charCodeAt();
            }
            if (typeof y === 'string') {
              y = y.charCodeAt();
            }
            if (sortType === 'asc') {
              return x - y;
            } else {
              return y - x;
            }
          });
        }
        return data;
      }
    
      handleSortColumn = (sortColumn, sortType) => {
        this.setState({
          loading: true
        });
    
        setTimeout(() => {
          this.setState({
            sortColumn,
            sortType,
            loading: false
          });
        }, 500);
      }
    

    render() {
        const {productsEnabled} = this.props;
        const products = this.getFilteredProducts(productsEnabled);
        return (
            <StyledTableSection>
                {products && products.length > 0 ? (
                    <Table
                        data={this.getData(products)}
                        autoHeight
                        sortColumn={this.state.sortColumn}
                        sortType={this.state.sortType}
                        onSortColumn={this.handleSortColumn}
                        loading={this.state.loading}
                    >
                        <Column width={150} flexGrow sortable>
                            <HeaderCell>
                                Type
                            </HeaderCell>
                            <Cell dataKey="product_type">
                                {rowData => rowData.product_type}
                            </Cell>
                        </Column>
                        <Column width={150} flexGrow sortable>
                            <HeaderCell>
                                Subtype
                            </HeaderCell>
                            <Cell dataKey="product_subtype">
                                {rowData => rowData.product_subtype}
                            </Cell>
                        </Column>
                        <Column width={150} resizable sortable>
                            <HeaderCell>
                                Name
                            </HeaderCell>
                            <Cell dataKey="name">
                                {rowData => <b>{rowData.name}</b>}
                            </Cell>
                        </Column>
                        <Column flexGrow sortable>
                            <HeaderCell>
                                Brand
                            </HeaderCell>
                            <Cell dataKey="name">
                                {rowData => <a>{rowData.brand ? rowData.brand.name : 'N/A'}</a>}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                Description
                            </HeaderCell>
                            <Cell dataKey="description">
                                {rowData => rowData.description}
                            </Cell>
                        </Column>
                        <Column width={70}>
                            <HeaderCell>
                                Amount
                            </HeaderCell>
                            <Cell dataKey="metric_amount">
                                {rowData => rowData.metric_amount}
                            </Cell>
                        </Column>
                        <Column width={70}>
                            <HeaderCell>
                                Metric
                            </HeaderCell>
                            <Cell dataKey="metric">
                                {rowData => rowData.metric}
                            </Cell>
                        </Column>
                        <Column flexGrow>
                            <HeaderCell>
                                SKU
                            </HeaderCell>
                            <Cell dataKey="sku">
                                {rowData => rowData.sku}
                            </Cell>
                        </Column>
                        <Column resizable sortable>
                            <HeaderCell>
                                Base Price
                            </HeaderCell>
                            <Cell dataKey="base_price">
                                {rowData => rowData.base_price}
                            </Cell>
                        </Column>
                        <Column resizable>
                            <HeaderCell>
                                Actions
                            </HeaderCell>
                            <Cell dataKey="actions">
                                {rowData => (
                                    <React.Fragment>
                                       <RoleValidator 
                                            {...this.props}
                                            scopes={['BRAND']}
                                            roles={['OWNER', 'MANAGER']}
                                        >
                                            <UpdateProductModal {...this.props} product={rowData}/>  
                                        </RoleValidator> 
                                        <RoleValidator 
                                            {...this.props}
                                            scopes={['AGENCY']}
                                            roles={['OWNER', 'MANAGER']}
                                        >
                                            <p>No actions</p>
                                        </RoleValidator> 
                                    </React.Fragment>
                                    
                                )}
                            </Cell>
                        </Column>
                    </Table>
                ) : (
                    <p>No products</p>
                )}
            </StyledTableSection>
        )
    }
}
