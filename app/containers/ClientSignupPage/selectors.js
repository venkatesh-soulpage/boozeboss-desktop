import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clientSignup state domain
 */

const selectClientSignupDomain = state =>
  state.get('clientSignup', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClientSignup
 */

const makeSelectClientSignup = () =>
  createSelector(selectClientSignupDomain, substate => substate.toJS());

export default makeSelectClientSignup;
export { selectClientSignupDomain };
