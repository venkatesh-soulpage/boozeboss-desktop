/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';

// import { makeSelectIsAuthenticated } from './selectors';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import ForgotPasswordPage from 'containers/ForgotPasswordPage/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import OrganizationSignupPage from 'containers/OrganizationSignup/Loadable';
import OrganizationsPage from 'containers/OrganizationsPage/Loadable';
import ClientPage from 'containers/ClientPage/Loadable';
import ClientSignupPage from 'containers/ClientSignupPage/Loadable';
import VerificationContainer from 'containers/VerificationContainer/Loadable';
import AgencyPage from 'containers/AgencyPage/Loadable';
import AgencySignupPage from 'containers/AgencySignupPage/Loadable';
import BriefPage from 'containers/BriefPage/Loadable';
import RequisitionPage from 'containers/RequisitionPage/Loadable';
import WarehousePage from 'containers/WarehousePage/Loadable';
import ProductPage from 'containers/ProductPage/Loadable';
import EventPage from 'containers/EventPage/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SystemPage from 'containers/SystemPage/Loadable';
import OutletEventsPage from 'containers/OutletEventsPage/Loadable';
import OutletVenuesPage from 'containers/OutletVenuesPage/Loadable';
import OutletSignup from 'containers/OutletSignup/Loadable';
import WaiterSignup from 'containers/WaiterSignup/Loadable';
import Changelog from 'containers/Changelog';
import Privacy from 'containers/Privacy';
import Terms from 'containers/Terms';
import Help from 'containers/Help';
import Header from 'components/Header';
import VersioningMenu from 'components/VersioningMenu';
import IntercomChat from 'components/IntercomChat';
import PrivateRoute from 'components/PrivateRoute';
import GuardedRoute from 'components/GuardedRoute';
import saga from './saga';
import StatisticsPage from 'containers/statistics/Loadable';

import GlobalStyle from '../../global-styles';
// import default style
import 'rsuite/dist/styles/rsuite-default.css';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`;

class App extends React.Component {
  state = {};

  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Enterprise LiquidIntel"
          defaultTitle="Enterprise LiquidIntel"
        >
          <meta name="description" content="Enterprise LiquidIntel" />
        </Helmet>
        <Header />
        <Switch>
          <PrivateRoute
            exact
            path="/"
            scopesRequired={[]}
            rolesRequired={[]}
            component={HomePage}
          />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            scopesRequired={['REGION', 'BRAND']}
            rolesRequired={['MANAGER', 'OWNER']}
          />
          <PrivateRoute
            exact
            path="/system"
            component={SystemPage}
            scopesRequired={['ADMIN']}
            rolesRequired={['ADMIN']}
          />
          <PrivateRoute
            exact
            path="/organizations"
            component={OrganizationsPage}
            scopesRequired={['ADMIN', 'REGION']}
            rolesRequired={['ADMIN', 'OWNER', 'MANAGER']}
          />
          <PrivateRoute
            exact
            path="/teams"
            component={ClientPage}
            scopesRequired={['ADMIN', 'BRAND', 'REGION']}
            rolesRequired={['ADMIN', 'OWNER', 'MANAGER']}
          />
          <PrivateRoute
            exact
            path="/agencies"
            component={AgencyPage}
            scopesRequired={['ADMIN', 'REGION', 'BRAND', 'AGENCY']}
            rolesRequired={['ADMIN', 'OWNER', 'MANAGER', 'STAFF']}
          />
          <PrivateRoute
            exact
            path="/verification"
            component={VerificationContainer}
            scopesRequired={['ADMIN']}
            rolesRequired={['ADMIN']}
          />
          <PrivateRoute
            exact
            path="/briefs"
            component={BriefPage}
            scopesRequired={['BRAND', 'AGENCY', 'REGION']}
            rolesRequired={['OWNER', 'MANAGER']}
          />
          <PrivateRoute
            exact
            path="/requisitions"
            component={RequisitionPage}
            scopesRequired={['BRAND', 'AGENCY', 'REGION']}
            rolesRequired={['OWNER', 'MANAGER', 'WAREHOUSE_MANAGER']}
          />
          <PrivateRoute
            exact
            path="/events"
            component={EventPage}
            scopesRequired={['AGENCY']}
            rolesRequired={['OWNER', 'MANAGER']}
          />

          <PrivateRoute
            exact
            path="/products"
            component={ProductPage}
            scopesRequired={['BRAND', 'AGENCY', 'REGION']}
            rolesRequired={['OWNER', 'MANAGER', 'WAREHOUSE_MANAGER']}
          />
          <PrivateRoute
            exact
            path="/stock"
            component={WarehousePage}
            scopesRequired={['BRAND', 'REGION']}
            rolesRequired={['OWNER', 'WAREHOUSE_MANAGER']}
          />
          <PrivateRoute
            exact
            path="/outletevents"
            component={OutletEventsPage}
            scopesRequired={['OUTLET']}
            rolesRequired={['MANAGER', 'WAITER']}
          />
          <PrivateRoute
            exact
            path="/outletvenues"
            component={OutletVenuesPage}
            scopesRequired={['OUTLET']}
            rolesRequired={['MANAGER', 'WAITER']}
          />
          <GuardedRoute path="/login" component={LoginPage} />
          <GuardedRoute
            path="/organization-signup"
            component={OrganizationSignupPage}
          />
          <GuardedRoute path="/waiter-signup" component={WaiterSignup} />
          <GuardedRoute path="/client-signup" component={ClientSignupPage} />
          <GuardedRoute path="/agency-signup" component={AgencySignupPage} />
          <GuardedRoute path="/outlet-signup" component={OutletSignup} />
          <GuardedRoute path="/forgot" component={ForgotPasswordPage} />
          <GuardedRoute path="/reset" component={ResetPasswordPage} />
          <Route path="/statistics" component={StatisticsPage} />
          <Route path="/changelog" component={Changelog} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/help" component={Help} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
        <VersioningMenu />
        <IntercomChat />
      </AppWrapper>
    );
  }
}

App.propTypes = {};

const withSaga = injectSaga({ key: 'app', saga });

export default compose(withSaga)(App);
