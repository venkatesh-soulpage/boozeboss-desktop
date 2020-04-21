import { createSelector } from 'reselect';

const selectAgencySignup = state => state.get('agencySignup');

const makeSelectSla = () =>
  createSelector(selectAgencySignup, agencySignupState =>
    agencySignupState.get('sla'),
  );


export { 
  makeSelectSla
};
