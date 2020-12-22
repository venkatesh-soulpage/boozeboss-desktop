/*
 *
 * waiterSignup reducer
 *
 */

import { fromJS } from 'immutable';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR } from './constants';

export const initialState = fromJS({
  success: null,
  error: null,
});

function waiterSignupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return state;
    case SIGNUP_SUCCESS:
      return state.set('success', action.success);
    case SIGNUP_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default waiterSignupReducer;
