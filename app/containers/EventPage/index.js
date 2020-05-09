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
import {makeSelectEvents, makeSelectSuccess, makeSelectError } from './selectors';
import { getEvents, inviteGuest, resendEmail, deleteGuest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { EventsContainer } from './components';

/* eslint-disable react/prefer-stateless-function */
export class EventPage extends React.Component {

  componentWillMount = () => {
    const {getEvents} = this.props;
    getEvents();
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
  success: makeSelectSuccess(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => dispatch(getEvents()),
    inviteGuest: (guest) => dispatch(inviteGuest(guest)),
    resendEmail: (event_guest_id) => dispatch(resendEmail(event_guest_id)),
    deleteGuest: (event_guest_id) => dispatch(deleteGuest(event_guest_id)),
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
