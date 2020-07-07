/**
 *
 * Product
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectProducts, makeSelectBrands, makeSelectSuccess, makeSelectError, makeSelectProductsEnabled, makeSelectIsLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getProducts, addProduct, getBrands, updateProduct, dismiss, toggleFilter } from './actions';
import { ProductsContainer } from './components'
import { makeSelectScope, makeSelectRole, makeSelectUser } from '../App/selectors'

const Products = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

/* eslint-disable react/prefer-stateless-function */
export class Product extends React.Component {

  componentDidMount = () => {
    const {getProducts, getBrands} = this.props;
    getProducts();
    getBrands();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Products</title>
          <meta name="description" content="Description of Product" />
        </Helmet>
        <Products>
          <ProductsContainer 
            {...this.props}
          />
        </Products>
        
      </div>
    );
  }
}

Product.propTypes = {
  products: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  addProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  getBrands: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  success: PropTypes.string,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  scope: makeSelectScope(),
  role: makeSelectRole(),
  products: makeSelectProducts(),
  brands: makeSelectBrands(),
  productsEnabled: makeSelectProductsEnabled(),
  success: makeSelectSuccess(),
  error: makeSelectError(),
  isLoading: makeSelectIsLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getProducts()),
    addProduct: (product) => dispatch(addProduct(product)),
    updateProduct: (product_id, product) => dispatch(updateProduct(product_id, product)),
    getBrands: () => dispatch(getBrands()),
    toggleFilter: (filter) => dispatch(toggleFilter(filter)),
    dismiss: (dismiss_type) => dispatch(dismiss(dismiss_type)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'products', reducer });
const withSaga = injectSaga({ key: 'products', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Product);
