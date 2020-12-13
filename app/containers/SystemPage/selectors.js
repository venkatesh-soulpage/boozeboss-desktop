import { createSelector } from 'reselect';

const selectSystem = state => state.get('system');

const makeSelectLocations = () =>
  createSelector(selectSystem, systemState => systemState.get('locations'));

const makeSelectSuccess = () =>
  createSelector(selectSystem, systemState => systemState.get('success'));

const makeSelectError = () =>
  createSelector(selectSystem, systemState => systemState.get('error'));

export { makeSelectLocations, makeSelectSuccess, makeSelectError };
