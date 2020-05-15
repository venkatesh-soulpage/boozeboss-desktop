/**
 *
 * VerificationContainer
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
import makeSelectVerificationContainer, { makeSelectVerifications } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { VerificationSection } from './components';
import { getVerifications, updateVerificationStatus } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class VerificationContainer extends React.PureComponent {

  componentWillMount = () => {
    const {getVerifications} = this.props;
    getVerifications();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Users Verification</title>
          <meta
            name="description"
            content="Description of VerificationContainer"
          />
        </Helmet>
        <VerificationSection 
          {...this.props}
        />
      </div>
    );
  }
}

VerificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  verifications: makeSelectVerifications()
});

function mapDispatchToProps(dispatch) {
  return {
    getVerifications: () => dispatch(getVerifications()),
    updateVerificationStatus: (account_id, age_verification_status) => dispatch(updateVerificationStatus(account_id, age_verification_status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'verification', reducer });
const withSaga = injectSaga({ key: 'verification', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VerificationContainer);
