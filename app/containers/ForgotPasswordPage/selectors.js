import { createSelector } from 'reselect';

const selectForgot = state => state.get('forgotPassword');

const makeSelectError = () =>
  createSelector(selectForgot, forgotState =>
    forgotState.get('error'),
);

const makeSelectSuccess = () =>
  createSelector(selectForgot, forgotState =>
    forgotState.get('success'),
  );

export { 
  makeSelectError, 
  makeSelectSuccess
};
