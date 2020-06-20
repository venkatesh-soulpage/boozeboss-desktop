/**
 *
 * Dashboard
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
import { makeSelectScope, makeSelectRole } from '../App/selectors'
import { makeSelectError, makeSelectIsLoading, makeSelectSuccess, makeSelectEvents, makeSelectClients} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { DashboardContainer } from './components';
import { getOrganizationAnalytics, getClients, getClientsAnalytics } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.Component {

  componentDidMount = () => {
    const {scope, getOrganizationAnalytics, getClientsAnalytics, getClients} = this.props;
    if (scope === 'REGION') {
      getOrganizationAnalytics();
      getClients();
    }
    if (scope === 'BRAND') {
      getClientsAnalytics();
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        <DashboardContainer {...this.props}/>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  scope: makeSelectScope(),
  role: makeSelectRole(),
  success: makeSelectSuccess(),
  error: makeSelectError(),
  events: makeSelectEvents(),
  clients: makeSelectClients(),
  isLoading: makeSelectIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOrganizationAnalytics: (client_id) => dispatch(getOrganizationAnalytics(client_id)),
    getClientsAnalytics: () => dispatch(getClientsAnalytics()),
    getClients: () => dispatch(getClients()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
