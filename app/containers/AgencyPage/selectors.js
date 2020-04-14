import { createSelector } from 'reselect';

const selectAgencies = state => state.get('agencies');

const makeSelectAgencies = () =>
  createSelector(selectAgencies, agenciesState =>
    agenciesState.get('agencies'),
  );

const makeSelectRoles = () =>
  createSelector(selectAgencies, agenciesState =>
    agenciesState.get('roles'),
  );
  
const makeSelectError = () =>
  createSelector(selectAgencies, agenciesState =>
    agenciesState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectAgencies, agenciesState =>
    agenciesState.get('success'),
  );

export { 
  makeSelectAgencies,
  makeSelectRoles,
  makeSelectSuccess,
  makeSelectError
};
