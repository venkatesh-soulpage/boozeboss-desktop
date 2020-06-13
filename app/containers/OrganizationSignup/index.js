/**
 *
 * OrganizationSignup
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
import { makeSelectError} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signup } from './actions';
import messages from './messages';
import { SignupForm } from './components';

/* eslint-disable react/prefer-stateless-function */
export class OrganizationSignup extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Organization Signup</title>
          <meta
            name="description"
            content="Description of OrganizationSignup"
          />
        </Helmet>
        <SignupForm {...this.props} />
      </div>
    );
  }
}

OrganizationSignup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    signup: (auth) => dispatch(signup(auth))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'organizationSignup', reducer });
const withSaga = injectSaga({ key: 'organizationSignup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrganizationSignup);
