import { createSelector } from 'reselect';

const selectEvents = state => state.get('events');

const makeSelectEvents = () =>
  createSelector(selectEvents, eventsState =>
    eventsState.get('events'),
  );

const makeSelectSuccess = () =>
  createSelector(selectEvents, eventsState =>
    eventsState.get('success'),
  );

const makeSelectError = () =>
  createSelector(selectEvents, eventsState =>
    eventsState.get('error'),
  );

export { 
  makeSelectEvents,
  makeSelectSuccess,
  makeSelectError
};
