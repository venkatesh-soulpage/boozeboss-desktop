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
import makeSelectClientSignup from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';



import {SignupForm} from './components'
import { clientSignup } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ClientSignup extends React.Component {

  render() {
    return (
      <div>
        <Helmet>
          <title>Client Signup</title>
          <meta name="description" content="Signup for clients" />
        </Helmet>
        <SignupForm 
          {...this.props}
        />
      </div>
    );
  }
}

ClientSignup.propTypes = {
  clientSignup: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    clientSignup: (auth) => dispatch(clientSignup(auth))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'clientSignup', reducer });
const withSaga = injectSaga({ key: 'clientSignup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClientSignup);
