/**
 *
 * ForgotPassword
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
import makeSelectForgotPassword, { makeSelectError, makeSelectSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { ForgotPasswordForm } from './components'
import { forgot } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ForgotPassword extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Forgot Password</title>
          <meta name="description" content="Description of ForgotPassword" />
        </Helmet>
        <ForgotPasswordForm 
          {...this.props}
        />
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  forgot: PropTypes.func.isRequired,
  error: PropTypes.bool,
  success: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess()
});

const mapDispatchToProps = dispatch => ({
  forgot: (email) => dispatch(forgot(email)),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forgotPassword', reducer });
const withSaga = injectSaga({ key: 'forgotPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForgotPassword);
