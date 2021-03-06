/* eslint-disable camelcase */
/**
 *
 * System
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectLocations,
  makeSelectSuccess,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { SystemMenuContainer } from './components';
import {
  getLocations,
  addLocation,
  dismiss,
  updateLocationRate,
  inviteOutletManager,
} from './actions';

/* eslint-disable react/prefer-stateless-function */
export class System extends React.Component {
  componentDidMount = () => {
    this.props.getLocations();
  };

  render() {
    return (
      <div>
        <SystemMenuContainer {...this.props} />
      </div>
    );
  }
}

System.propTypes = {
  getLocations: PropTypes.func.isRequired,
  addLocation: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations(),
  success: makeSelectSuccess(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLocations: () => dispatch(getLocations()),
    addLocation: location => dispatch(addLocation(location)),
    updateLocationRate: (location_id, currency_conversion) =>
      dispatch(updateLocationRate(location_id, currency_conversion)),
    dismiss: dismiss_type => dispatch(dismiss(dismiss_type)),
    inviteOutletManager: outlet_manager =>
      dispatch(inviteOutletManager(outlet_manager)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'system', reducer });
const withSaga = injectSaga({ key: 'system', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(System);
