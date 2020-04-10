/*
 *
 * ClientSignup reducer
 *
 */

import { fromJS } from 'immutable';
import { CLIENT_SIGNUP_REQUEST, CLIENT_SIGNUP_SUCCESS, CLIENT_SIGNUP_ERROR } from './constants';

export const initialState = fromJS({
  error: null,
  isLoading: null,
});

function clientSignupReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_SIGNUP_REQUEST:
      return state.set('isLoading', true);
    case CLIENT_SIGNUP_SUCCESS:
      return state.set('isLoading', false);;
    case CLIENT_SIGNUP_ERROR:
      return state
        .set('error', action.error)
        .set('isLoading', false);;
    default:
      return state;
  }
}

export default clientSignupReducer;
