import { createSelector } from 'reselect';

const selectLogin = state => state.get('clients');

const makeSelectClients = () =>
  createSelector(selectLogin, loginState =>
    loginState.get('clients'),
  );

export { 
  makeSelectClients
};
