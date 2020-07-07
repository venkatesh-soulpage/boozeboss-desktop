import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Loader } from 'rsuite';
import UpdateProductModal from './UpdateProductModal';
import RoleValidator from 'components/RoleValidator';

const { Column, HeaderCell, Cell, Pagination } = Table;

const StyledTableSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin: 1em 0 2em 0;
`;

const StyledLoaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
`

export default class ProductsTable extends Component {
  state = {
    displayLength: 15,
    sortColumn: null,
    sortType: null,
    loading: false,
    page: 1,
  };

  handleChangePage = (dataKey) => {
    this.setState({
      page: dataKey
    });
  }

  handleChangeLength = (dataKey) => {
    this.setState({
      page: 1,
      displayLength: dataKey
    });
  }

  getFilteredProducts = productsEnabled => {
    const { displayLength, page } = this.state; 
    const { products } = this.props;
    if (!products) return [];

    const pagination_start = (page * displayLength) - displayLength;
    const pagination_end = page * displayLength;

    // IF both products are enabled return all
    if (
      productsEnabled.indexOf('Cocktail') > -1 &&
      productsEnabled.indexOf('Product') > -1
    ) {
      return products.filter((prod, index) => index >= pagination_start && index < pagination_end);
    }

    if (productsEnabled.indexOf('Cocktail') > -1) {
      return products.filter(product => product.is_cocktail).filter((prod, index) => index >= pagination_start && index < pagination_end);
    }

    if (productsEnabled.indexOf('Product') > -1) {
      return products.filter(product => !product.is_cocktail).filter((prod, index) => index >= pagination_start && index < pagination_end);
    }
  };

  getData = products => {
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
  };

  handleSortColumn = (sortColumn, sortType) => {
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        sortColumn,
        sortType,
        loading: false,
      });
    }, 500);
  };

  render() {
    const { productsEnabled, isLoading, user } = this.props;
    const {displayLength, page} = this.state;
    const products = this.getFilteredProducts(productsEnabled);
    return (
      <StyledTableSection>
        {products && products.length > 0 ? (
          <React.Fragment>
            <Table
              data={this.getData(products)}
              autoHeight
              sortColumn={this.state.sortColumn}
              sortType={this.state.sortType}
              onSortColumn={this.handleSortColumn}
              loading={this.state.loading}
            >
              <Column width={150} flexGrow sortable>
                <HeaderCell>Type</HeaderCell>
                <Cell dataKey="product_type">
                  {rowData => rowData.product_type}
                </Cell>
              </Column>
              <Column width={150} flexGrow sortable>
                <HeaderCell>Subtype</HeaderCell>
                <Cell dataKey="product_subtype">
                  {rowData => rowData.product_subtype}
                </Cell>
              </Column>
              <Column width={150} resizable sortable>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name">{rowData => <b>{rowData.name}</b>}</Cell>
              </Column>
              <Column flexGrow sortable>
                <HeaderCell>Brand</HeaderCell>
                <Cell dataKey="name">
                  {rowData => <a>{rowData.brand ? rowData.brand.name : 'N/A'}</a>}
                </Cell>
              </Column>
              <Column resizable>
                <HeaderCell>Description</HeaderCell>
                <Cell dataKey="description">
                  {rowData => rowData.description}
                </Cell>
              </Column>
              <Column width={70}>
                <HeaderCell>Amount</HeaderCell>
                <Cell dataKey="metric_amount">
                  {rowData => rowData.metric_amount}
                </Cell>
              </Column>
              <Column width={70}>
                <HeaderCell>Metric</HeaderCell>
                <Cell dataKey="metric">{rowData => rowData.metric}</Cell>
              </Column>
              <Column flexGrow>
                <HeaderCell>SKU</HeaderCell>
                <Cell dataKey="sku">{rowData => rowData.sku}</Cell>
              </Column>
              <Column resizable sortable>
                <HeaderCell>Base Price</HeaderCell>
                <Cell dataKey="base_price">{rowData => `${rowData.base_price} ${user && user.location && user.location.currency}`}</Cell>
              </Column>
              <Column resizable>
                <HeaderCell>Actions</HeaderCell>
                <Cell dataKey="actions">
                  {rowData => (
                    <React.Fragment>
                      <RoleValidator
                        {...this.props}
                        scopes={['BRAND']}
                        roles={['OWNER', 'MANAGER']}
                      >
                        <UpdateProductModal {...this.props} product={rowData} />
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
            <Pagination
              lengthMenu={[
                {
                  value: 5,
                  label: 5
                },
                {
                  value: 10,
                  label: 10
                },
                {
                  value: 15,
                  label: 15
                },
                {
                  value: 20,
                  label: 20
                },
              ]}
              activePage={page}
              displayLength={displayLength}
              total={this.props.products ? this.props.products.length : 0}
              onChangePage={this.handleChangePage}
              onChangeLength={this.handleChangeLength}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {isLoading ? (
              <StyledLoaderSection>
                <Loader size="md" />
              </StyledLoaderSection>
            ) : (
              <p>No products</p>
            )}
          </React.Fragment>
        )}
      </StyledTableSection>
    );
  }
}
