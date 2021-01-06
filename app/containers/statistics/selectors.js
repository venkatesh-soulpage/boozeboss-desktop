import { createSelector } from 'reselect';

const selectAgencies = state => state.get('agencies');

const makeSelectVenuedata = () =>
  createSelector(selectAgencies, agenciesState =>
    agenciesState.get('venueData'),
  );
const makeSelectEventdata = () =>
  createSelector(selectAgencies, agenciesState =>
    agenciesState.get('eventData'),
  );

const makeSelectError = () =>
  createSelector(selectAgencies, agenciesState => agenciesState.get('error'));

const makeSelectSuccess = () =>
  createSelector(selectAgencies, agenciesState => agenciesState.get('success'));

const makeSelectIsLoading = () =>
  createSelector(selectAgencies, agenciesState =>
    agenciesState.get('isLoading'),
  );

export {
  makeSelectSuccess,
  makeSelectError,
  makeSelectIsLoading,
  makeSelectVenuedata,
  makeSelectEventdata,
};
