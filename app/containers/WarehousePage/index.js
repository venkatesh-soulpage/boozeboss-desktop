/**
 *
 * Warehouse
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectWarehouse, { makeSelectWarehouses, makeSelectProducts, makeSelectError, makeSelectSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getWarehouses, getProducts, addProductStock, removeProductStock, dismiss } from './actions';
import { WarehousesContainer } from './components';
import { makeSelectScope, makeSelectRole } from '../App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class Warehouse extends React.Component {

  componentWillMount = () => {
    const {getWarehouses, getProducts} = this.props;
    getWarehouses();
    getProducts();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Warehouses</title>
          <meta name="description" content="Description of Warehouse" />
        </Helmet>
        <WarehousesContainer 
          {...this.props}
        />
      </div>
    );
  }
}

Warehouse.propTypes = {
  warehouses: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  getWarehouses: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  addProductStock: PropTypes.func.isRequired,
  removeProductStock: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  scope: makeSelectScope(),
  role: makeSelectRole(),
  warehouses: makeSelectWarehouses(),
  products: makeSelectProducts(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    getWarehouses: () => dispatch(getWarehouses()),
    getProducts: () => dispatch(getProducts()),
    addProductStock: (stock, warehouse_id) => dispatch(addProductStock(stock, warehouse_id)),
    removeProductStock: (stock, warehouse_id) => dispatch(removeProductStock(stock, warehouse_id)),
    dismiss: (dismiss_type) => dispatch(dismiss(dismiss_type)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'warehouse', reducer });
const withSaga = injectSaga({ key: 'warehouse', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Warehouse);
