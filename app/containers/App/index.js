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
import PropTypes from 'prop-types';

import injectReducer from 'utils/injectReducer';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { makeSelectIsAuthenticated } from './selectors';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import ForgotPasswordPage from 'containers/ForgotPasswordPage/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import ClientPage from 'containers/ClientPage/Loadable';
import ClientSignupPage from 'containers/ClientSignupPage/Loadable';
import AgencyPage from 'containers/AgencyPage/Loadable';
import AgencySignupPage from 'containers/AgencySignupPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import GuardedRoute from 'components/GuardedRoute';

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
  render() {
    return (
      <AppWrapper>
        <Helmet titleTemplate="%s - Booze Boss" defaultTitle="Booze Boss">
          <meta name="description" content="Booze Boss" />
        </Helmet>
        <Header />
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={HomePage}
            scopesRequired={['ADMIN', 'BRAND', 'AGENCY']}
            rolesRequired={['ADMIN', 'MANAGER', 'OWNER']}
          />
          <PrivateRoute
            exact
            path="/clients"
            component={ClientPage}
            scopesRequired={['ADMIN']}
            rolesRequired={['ADMIN']}
          />
          <PrivateRoute
            exact
            path="/agencies"
            component={AgencyPage}
            scopesRequired={['ADMIN', 'BRAND']}
            rolesRequired={['ADMIN', 'OWNER']}
          />
          <GuardedRoute path="/login" component={LoginPage} />
          <GuardedRoute path="/client-signup" component={ClientSignupPage} />
          <GuardedRoute path="/agency-signup" component={AgencySignupPage} />
          <GuardedRoute path="/forgot" component={ForgotPasswordPage} />
          <GuardedRoute path="/reset" component={ResetPasswordPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

App.propTypes = {};

export default App;
