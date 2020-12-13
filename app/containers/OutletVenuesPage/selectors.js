import { createSelector } from 'reselect';

const selectEvents = state => state.get('outletvenues');

const makeSelectVenues = () =>
  createSelector(selectEvents, eventsState => eventsState.get('outletvenues'));

const makeSelectLocations = () =>
  createSelector(selectEvents, eventsState =>
    eventsState.get('outletlocations'),
  );

const makeSelectError = () =>
  createSelector(selectEvents, eventsState => eventsState.get('error'));

const makeSelectSuccess = () =>
  createSelector(selectEvents, eventsState => eventsState.get('success'));

const makeSelectIsLoading = () =>
  createSelector(selectEvents, eventsState => eventsState.get('isLoading'));

export {
  makeSelectError,
  makeSelectSuccess,
  makeSelectIsLoading,
  makeSelectVenues,
  makeSelectLocations,
};
