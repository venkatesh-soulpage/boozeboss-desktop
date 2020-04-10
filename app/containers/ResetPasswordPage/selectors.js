import { createSelector } from 'reselect';

const selectReset = state => state.get('resetPassword');

const makeSelectError = () =>
  createSelector(selectReset, resetState =>
    resetState.get('error'),
);

const makeSelectSuccess = () =>
  createSelector(selectReset, resetState =>
    resetState.get('success'),
  );

export { 
  makeSelectError, 
  makeSelectSuccess
};
