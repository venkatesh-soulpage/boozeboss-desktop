import { createSelector } from 'reselect';

const selectAgencies = state => state.get('agencies');

const makeSelectAgencies = () =>
  createSelector(selectAgencies, agenciesState =>
    agenciesState.get('agencies'),
  );

export { 
  makeSelectAgencies
};
