/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin, { makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { login, dismissErrors } from './actions';
import { LoginForm } from './components';

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {

  componentWillMount = () => {
    const {dismissErrors} = this.props;
    dismissErrors();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        <LoginForm 
          {...this.props}
        />
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

const mapDispatchToProps = dispatch => ({
  login: (auth) => dispatch(login(auth)),
  dismissErrors: () => dispatch(dismissErrors()),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
