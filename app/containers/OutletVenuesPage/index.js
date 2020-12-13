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

import { OutletVenuesContainer } from './components';
import { makeSelectVenues, makeSelectLocations } from './selectors';
import { makeSelectScope, makeSelectRole } from '../App/selectors';

import {
  addOutletVenueDraft,
  getVenuesRequest,
  addVenueRequest,
  getLocationsRequest,
  addMenuRequest,
} from './actions';

export class OutletVenuesPage extends React.Component {
  componentDidMount = () => {
    this.props.getVenuesRequest();
    this.props.getLocationsRequest();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Outlet Venues</title>
          <meta name="description" content="Description of Outlet Venues" />
        </Helmet>

        <OutletVenuesContainer {...this.props} />
      </div>
    );
  }
}

OutletVenuesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  outletvenues: makeSelectVenues(),
  outletlocations: makeSelectLocations(),
  scope: makeSelectScope(),
  role: makeSelectRole(),
});

function mapDispatchToProps(dispatch) {
  return {
    addOutletVenueDraft: () => dispatch(addOutletVenueDraft()),
    getVenuesRequest: () => dispatch(getVenuesRequest()),
    addVenueRequest: venue => dispatch(addVenueRequest(venue)),
    getLocationsRequest: () => dispatch(getLocationsRequest()),
    addMenuRequest: (venueId, menu) => dispatch(addMenuRequest(venueId, menu)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'outletvenues', reducer });
const withSaga = injectSaga({ key: 'outletvenues', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OutletVenuesPage);
