import { createSelector } from 'reselect';

const selectVerification = state => state.get('verification');

const makeSelectVerifications = () =>
  createSelector(selectVerification, verificationState =>
    verificationState.get('verifications'),
  );

const makeSelectSuccess = () =>
  createSelector(selectVerification, verificationState =>
    verificationState.get('success'),
  );

const makeSelectError = () =>
  createSelector(selectVerification, verificationState =>
    verificationState.get('error'),
  );

export { 
  makeSelectVerifications,
  makeSelectSuccess,
  makeSelectError
};
