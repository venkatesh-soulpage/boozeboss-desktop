/*
 *
 * ResetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from './constants';

export const initialState = fromJS({
  success: null,
  error: null,
});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return state;
    case RESET_PASSWORD_SUCCESS:
      return state.set('success', true);
    case RESET_PASSWORD_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default resetPasswordReducer;
