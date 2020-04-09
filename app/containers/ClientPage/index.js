/**
 *
 * ClientContainer
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
import { makeSelectClients } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { ClientsContainer } from './components';
import { addClientDraft } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ClientContainer extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ClientContainer</title>
          <meta name="description" content="Description of ClientContainer" />
        </Helmet>
        <ClientsContainer 
          {...this.props}
        />
      </div>
    );
  }
}

ClientContainer.propTypes = {
  clients: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  addClientDraft: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  clients: makeSelectClients(),
});

function mapDispatchToProps(dispatch) {
  return {
    addClientDraft: () => dispatch(addClientDraft()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'clients', reducer });
const withSaga = injectSaga({ key: 'clients', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClientContainer);
