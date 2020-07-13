/**
 *
 * ResetPassword
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
import makeSelectResetPassword, { makeSelectError, makeSelectSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { ResetPasswordForm } from './components';
import { reset } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ResetPassword extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Reset Password</title>
          <meta name="description" content="Description of ResetPassword" />
        </Helmet>
        <ResetPasswordForm 
          {...this.props}
        />
      </div>
    );
  }
}

ResetPassword.propTypes = {
  reset: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  success: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = dispatch => ({
  reset: (auth, history) => dispatch(reset(auth, history)),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'resetPassword', reducer });
const withSaga = injectSaga({ key: 'resetPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResetPassword);
