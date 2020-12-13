import { createSelector } from 'reselect';

const selectOutlet = state => state.get('outletSignup');

const makeSelectError = () =>
  createSelector(selectOutlet, outletState => outletState.get('error'));

const makeSelectSuccess = () =>
  createSelector(selectOutlet, outletState => outletState.get('success'));

export { makeSelectError, makeSelectSuccess };
