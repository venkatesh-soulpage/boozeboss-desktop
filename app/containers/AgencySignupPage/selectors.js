import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clientSignup state domain
 */

const selectAgencySignupDomain = state =>
  state.get('agencySignup', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClientSignup
 */

const makeSelectAgencySignup = () =>
  createSelector(selectClientSignupDomain, substate => substate.toJS());

export default makeSelectAgencySignup;
export { selectAgencySignupDomain };
