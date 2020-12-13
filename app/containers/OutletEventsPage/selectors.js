import { createSelector } from 'reselect';

const selectEvents = state => state.get('outletevents');

const makeSelectEvents = () =>
  createSelector(selectEvents, eventsState => eventsState.get('outletevents'));

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
  makeSelectEvents,
  makeSelectError,
  makeSelectSuccess,
  makeSelectIsLoading,
  makeSelectLocations,
};
