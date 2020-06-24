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
import { makeSelectError, makeSelectIsLoading, makeSelectSuccess, makeSelectEvents, makeSelectClients, makeSelectLastEvents} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { DashboardContainer, DrawerContainer } from './components';
import { getOrganizationAnalytics, getClients, getClientsAnalytics, getOrganizationEvents } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.Component {

  state = {
    show: false,
  }

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

  toggleDrawer = () => {
    if (!this.state.show) {
      this.props.getOrganizationEvents();
    }
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        <DashboardContainer 
          {...this.props}
          toggleDrawer={this.toggleDrawer}
        />
        <DrawerContainer 
          {...this.props}
          {...this.state}
          toggleDrawer={this.toggleDrawer}
        />
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
  last_events: makeSelectLastEvents(),
  clients: makeSelectClients(),
  isLoading: makeSelectIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOrganizationAnalytics: (client_id) => dispatch(getOrganizationAnalytics(client_id)),
    getClientsAnalytics: () => dispatch(getClientsAnalytics()),
    getClients: () => dispatch(getClients()),
    getOrganizationEvents: () => dispatch(getOrganizationEvents()),
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
