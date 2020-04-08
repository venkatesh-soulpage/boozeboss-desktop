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

  render () {
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
          scopesRequired={['ADMIN', 'CLIENT', 'AGENCY']}
          rolesRequired={['ADMIN', 'MANAGER', 'OWNER']}
        />
        <GuardedRoute
          path="/login"
          component={LoginPage}
        />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  )
  }
};

App.propTypes = {
};


export default App;


