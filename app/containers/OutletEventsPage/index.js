import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import { OutletEventsContainer } from './components';
import { makeSelectEvents, makeSelectLocations } from './selectors';
import { makeSelectScope, makeSelectRole } from '../App/selectors';

import {
  addOutletEventDraft,
  getEventsRequest,
  addEventRequest,
  getLocationsRequest,
  addMenuRequest,
} from './actions';

export class OutletEventsPage extends React.Component {
  componentDidMount = () => {
    this.props.getEventsRequest();
    this.props.getLocationsRequest();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Outlet Events</title>
          <meta name="description" content="Description of Outlet Events" />
        </Helmet>

        <OutletEventsContainer {...this.props} />
      </div>
    );
  }
}

OutletEventsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  outletevents: makeSelectEvents(),
  outletlocations: makeSelectLocations(),
  scope: makeSelectScope(),
  role: makeSelectRole(),
});

function mapDispatchToProps(dispatch) {
  return {
    addOutletEventDraft: () => dispatch(addOutletEventDraft()),
    getEventsRequest: () => dispatch(getEventsRequest()),
    addEventRequest: event => dispatch(addEventRequest(event)),
    getLocationsRequest: () => dispatch(getLocationsRequest()),
    addMenuRequest: (eventId, menu) => dispatch(addMenuRequest(eventId, menu)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'outletevents', reducer });
const withSaga = injectSaga({ key: 'outletevents', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OutletEventsPage);
