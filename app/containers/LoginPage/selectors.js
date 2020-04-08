import { createSelector } from 'reselect';

const selectLogin = state => state.get('login');

const makeSelectError = () =>
  createSelector(selectLogin, loginState =>
    loginState.get('error'),
  );

export { 
  makeSelectError
};
