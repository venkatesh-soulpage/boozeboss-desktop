/**
 *
 * ClientSignup
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
import  { makeSelectSla } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { SignupForm } from './components';
import { agencySignup, getSla } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class AgencySignup extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Agency Signup</title>
          <meta name="description" content="Signup for agencies" />
        </Helmet>
        <SignupForm {...this.props} />
      </div>
    );
  }
}

AgencySignup.propTypes = {
  agencySignup: PropTypes.func.isRequired,
  getSla: PropTypes.func.isRequired,
  sla: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  sla: makeSelectSla(),
});

function mapDispatchToProps(dispatch) {
  return {
    agencySignup: auth => dispatch(agencySignup(auth)),
    getSla: (agency_id) => dispatch(getSla(agency_id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'agencySignup', reducer });
const withSaga = injectSaga({ key: 'agencySignup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AgencySignup);
