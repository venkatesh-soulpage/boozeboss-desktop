/**
 *
 * Events
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
import {makeSelectEvents, makeSelectSuccess, makeSelectError, makeSelectRoles, makeSelectProducts } from './selectors';
import { getEvents, inviteGuest, resendEmail, deleteGuest, getRoles, getProducts, addEventProduct, removeEventProduct, addEventCondition, removeEventCondition, selectAsFree } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { EventsContainer } from './components';

/* eslint-disable react/prefer-stateless-function */
export class EventPage extends React.Component {

  componentWillMount = () => {
    const {getEvents, getRoles, getProducts} = this.props;
    getEvents();
    getRoles();
    getProducts();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Events</title>
          <meta name="description" content="Description of Events" />
        </Helmet>
        <EventsContainer 
          {...this.props}
        />
      </div>
    );
  }
}

EventPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  events: makeSelectEvents(),
  roles: makeSelectRoles(),
  products: makeSelectProducts(),
  success: makeSelectSuccess(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => dispatch(getEvents()),
    getRoles: () => dispatch(getRoles()),
    getProducts: () => dispatch(getProducts()),
    addEventProduct: (event_id, product) => dispatch(addEventProduct(event_id, product)),
    removeEventProduct: (event_id, event_product_id) => dispatch(removeEventProduct(event_id, event_product_id)),
    selectAsFree: (event_id, event_product_id) => dispatch(selectAsFree(event_id, event_product_id)),
    inviteGuest: (guest) => dispatch(inviteGuest(guest)),
    resendEmail: (event_guest_id) => dispatch(resendEmail(event_guest_id)),
    deleteGuest: (event_guest_id) => dispatch(deleteGuest(event_guest_id)),
    addEventCondition: (event_id, condition) => dispatch(addEventCondition(event_id, condition)),
    removeEventCondition: (event_id) => dispatch(removeEventCondition(event_id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'events', reducer });
const withSaga = injectSaga({ key: 'events', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EventPage);
