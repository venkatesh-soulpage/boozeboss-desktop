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
import { makeSelectProducts, makeSelectBrands } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getProducts, addProduct, getBrands } from './actions';
import { ProductsContainer } from './components'

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
          <title>Product</title>
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
  getProducts: PropTypes.func.isRequired,
  getBrands: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  brands: makeSelectBrands(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getProducts()),
    addProduct: (product) => dispatch(addProduct(product)),
    getBrands: () => dispatch(getBrands()),
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
