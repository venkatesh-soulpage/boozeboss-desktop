/**
 *
 * Requisition
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
import { makeSelectRequisitions, makeSelectSuccess, makeSelectError, makeSelectProducts, makeSelectWarehouses, makeSelectHellosign } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getRequisitions, getClientProducts, createRequisitionOrder, deleteRequisitionOrder, updateRequisitionStatus, getWarehouses, updateRequisitionOrders, createRequisitionDelivery, updateRequisitionDelivery, rejectRequisition, requestSign } from './actions';
import { makeSelectScope, makeSelectRole } from '../App/selectors';
import { RequisitionsContainer } from './components'

/* eslint-disable react/prefer-stateless-function */
export class Requisition extends React.Component {

  componentDidMount = () => {
    const {getRequisitions, getClientProducts, getWarehouses, scope} = this.props;
    getRequisitions();

    if (scope === 'BRAND') {
      getWarehouses();
    }

    getClientProducts();
  }


  render() {
    return (
      <div>
        <Helmet>
          <title>Requisition</title>
          <meta name="description" content="Description of Requisition" />
        </Helmet>
        <RequisitionsContainer {...this.props}/>
      </div>
    );
  }
}

Requisition.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  requisitions: makeSelectRequisitions(),
  products: makeSelectProducts(),
  warehouses: makeSelectWarehouses(),
  success: makeSelectSuccess(),
  error: makeSelectError(),
  scope: makeSelectScope(),
  role: makeSelectRole(),
  hellosign: makeSelectHellosign(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRequisitions: () => dispatch(getRequisitions()),
    getWarehouses: () => dispatch(getWarehouses()),
    getClientProducts: (client_id) => dispatch(getClientProducts(client_id)),
    createRequisitionOrder: (requisition_id, order) => dispatch(createRequisitionOrder(requisition_id, order)),
    deleteRequisitionOrder: (requisition_id, requisition_order_id) => dispatch(deleteRequisitionOrder(requisition_id, requisition_order_id)),
    updateRequisitionStatus: (requisition_id, status, hellosign_signature_id) => dispatch(updateRequisitionStatus(requisition_id, status, hellosign_signature_id)),
    rejectRequisition: (requisition_id) => dispatch(rejectRequisition(requisition_id)),
    updateRequisitionOrders: (requisition_id, orders, waybill) => dispatch(updateRequisitionOrders(requisition_id, orders, waybill)),
    createRequisitionDelivery: (requisition_id, delivery) => dispatch(createRequisitionDelivery(requisition_id, delivery)),
    updateRequisitionDelivery: (requisition_id, requisition_delivery_id, delivery) => dispatch(updateRequisitionDelivery(requisition_id,requisition_delivery_id, delivery)),
    requestSign: (requisition_id) => dispatch(requestSign(requisition_id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'requisitions', reducer });
const withSaga = injectSaga({ key: 'requisitions', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Requisition);
