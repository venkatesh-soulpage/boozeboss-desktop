import { createSelector } from 'reselect';

const selectDashboard = state => state.get('dashboard');

const makeSelectSuccess = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('success'),
  );

const makeSelectError = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('error'),
  );

const makeSelectIsLoading = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('isLoading'),
  );

const makeSelectEvents = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('events'),
  );

const makeSelectLastEvents = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('last_events'),
  );

const makeSelectClients = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('clients'),
  );

export { 
  makeSelectSuccess,
  makeSelectError, 
  makeSelectIsLoading,
  makeSelectEvents,
  makeSelectLastEvents,
  makeSelectClients
};
