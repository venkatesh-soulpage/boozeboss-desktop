/**
 *
 * OrganizationSignup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signup } from './actions';

import { SignupForm } from './components';

/* eslint-disable react/prefer-stateless-function */
export class WaiterSignup extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Waiter Signup</title>
          <meta name="description" content="Description of WaiterSignup" />
        </Helmet>
        <SignupForm {...this.props} />
      </div>
    );
  }
}

WaiterSignup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    signup: auth => dispatch(signup(auth)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'waiterSignup', reducer });
const withSaga = injectSaga({ key: 'waiterSignup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WaiterSignup);
