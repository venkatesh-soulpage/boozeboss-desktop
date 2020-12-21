import { createSelector } from 'reselect';

const selectOutlet = state => state.get('waiterSignup');

const makeSelectError = () =>
  createSelector(selectOutlet, outletState => outletState.get('error'));

const makeSelectSuccess = () =>
  createSelector(selectOutlet, outletState => outletState.get('success'));

export { makeSelectError, makeSelectSuccess };
