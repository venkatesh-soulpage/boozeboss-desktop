import { createSelector } from 'reselect';

const selectOrganization = state => state.get('organizationSignup');
  
const makeSelectError = () =>
  createSelector(selectOrganization, organizationState =>
    organizationState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectOrganization, organizationState =>
    organizationState.get('success'),
  );

export { 
  makeSelectError,
  makeSelectSuccess
};
