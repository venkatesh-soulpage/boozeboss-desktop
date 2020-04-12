/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, DISMISS_ERRORS } from './constants';

export const initialState = fromJS({
  error: null,
  isLoading: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isLoading', true);
    case LOGIN_SUCCESS:
      return state.set('isLoading', false);
    case LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('isLoading', false);
    case DISMISS_ERRORS: 
      return state.set('error', null);
    default:
      return state;
  }
}

export default loginReducer;
