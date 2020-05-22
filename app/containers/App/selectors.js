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

const makeSelectScope = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('scope'),
  );

const makeSelectRole = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('role'),
  );

const makeSelectUser = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('user'),
  );

export { 
  makeSelectLocation,
  makeSelectIsAuthenticated,
  makeSelectScope,
  makeSelectRole,
  makeSelectUser
};
