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

const makeSelectLocations = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('locations'),
  );

const makeSelectOrganizations = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('organizations'),
  );
  
const makeSelectError = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('success'),
  );

const makeSelectIsLoading = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('isLoading'),
  );

const makeSelectOrganizationFilter = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('organization_filter'),
  );

export { 
  makeSelectClients,
  makeSelectRoles,
  makeSelectLocations,
  makeSelectError,
  makeSelectSuccess,
  makeSelectIsLoading, 
  makeSelectOrganizations,
  makeSelectOrganizationFilter,
};
