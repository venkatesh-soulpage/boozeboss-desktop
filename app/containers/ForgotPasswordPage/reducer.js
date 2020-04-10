/*
 *
 * ForgotPassword reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR } from './constants';

export const initialState = fromJS({
  error: null,
  success: false,
});

function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return state;
    case FORGOT_PASSWORD_SUCCESS:
      return state.set('success', true);
    case FORGOT_PASSWORD_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default forgotPasswordReducer;
