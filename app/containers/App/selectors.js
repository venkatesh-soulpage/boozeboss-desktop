import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');
const selectGlobal = state => state.get('global');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectIsAuthenticated = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('isAuthenticated'),
  );

export { 
  makeSelectLocation,
  makeSelectIsAuthenticated
};
