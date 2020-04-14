import { createSelector } from 'reselect';

const selectClients = state => state.get('clients');

const makeSelectClients = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('clients'),
  );

  const makeSelectRoles = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('roles'),
  );
  
const makeSelectError = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('success'),
  );

export { 
  makeSelectClients,
  makeSelectRoles,
  makeSelectError,
  makeSelectSuccess
};
