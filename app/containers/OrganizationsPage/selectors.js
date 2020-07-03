import { createSelector } from 'reselect';

const selectOrganizations = state => state.get('organizations');

const makeSelectOrganizations = () =>
  createSelector(selectOrganizations, organizationsState =>
    organizationsState.get('organizations'),
  );

  const makeSelectRoles = () =>
  createSelector(selectOrganizations, organizationsState =>
    organizationsState.get('roles'),
  );

const makeSelectLocations = () =>
  createSelector(selectOrganizations, organizationsState =>
    organizationsState.get('locations'),
  );
 
const makeSelectError = () =>
  createSelector(selectOrganizations, organizationsState =>
    organizationsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectOrganizations, organizationsState =>
    organizationsState.get('success'),
  );

const makeSelectIsLoading = () =>
  createSelector(selectOrganizations, organizationsState =>
    organizationsState.get('isLoading'),
  );

export { 
  makeSelectOrganizations,
  makeSelectRoles,
  makeSelectLocations,
  makeSelectError,
  makeSelectSuccess,
  makeSelectIsLoading
};
