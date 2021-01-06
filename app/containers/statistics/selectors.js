import { createSelector } from 'reselect';

const selectStatistics = state => state.get('statistics');

const makeSelectVenuedata = () =>
  createSelector(selectStatistics, agenciesState =>
    agenciesState.get('venueData'),
  );
const makeSelectEventdata = () =>
  createSelector(selectStatistics, agenciesState =>
    agenciesState.get('eventData'),
  );

const makeSelectError = () =>
  createSelector(selectStatistics, agenciesState => agenciesState.get('error'));

const makeSelectSuccess = () =>
  createSelector(selectStatistics, agenciesState =>
    agenciesState.get('success'),
  );

const makeSelectIsLoading = () =>
  createSelector(selectStatistics, agenciesState =>
    agenciesState.get('isLoading'),
  );

export {
  makeSelectSuccess,
  makeSelectError,
  makeSelectIsLoading,
  makeSelectVenuedata,
  makeSelectEventdata,
};
