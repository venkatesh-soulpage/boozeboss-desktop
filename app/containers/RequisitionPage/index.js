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
import { makeSelectRequisitions, makeSelectSuccess, makeSelectError, makeSelectProducts } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getRequisitions, getClientProducts, createRequisitionOrder, deleteRequisitionOrder } from './actions';
import { RequisitionsContainer } from './components'

/* eslint-disable react/prefer-stateless-function */
export class Requisition extends React.Component {

  componentDidMount = () => {
    const {getRequisitions} = this.props;
    getRequisitions();
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
  success: makeSelectSuccess(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRequisitions: () => dispatch(getRequisitions()),
    getClientProducts: (client_id) => dispatch(getClientProducts(client_id)),
    createRequisitionOrder: (requisition_id, order) => dispatch(createRequisitionOrder(requisition_id, order)),
    deleteRequisitionOrder: (requisition_id, requisition_order_id) => dispatch(deleteRequisitionOrder(requisition_id, requisition_order_id)),
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
