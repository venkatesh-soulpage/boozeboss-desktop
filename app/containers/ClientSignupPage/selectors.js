import { createSelector } from 'reselect';

const selectClients = state => state.get('clientSignup');
  
const makeSelectError = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectClients, clientsState =>
    clientsState.get('success'),
  );

export { 
  makeSelectError,
  makeSelectSuccess
};
