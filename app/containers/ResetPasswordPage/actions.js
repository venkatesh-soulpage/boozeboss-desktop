/*
 *
 * ResetPassword actions
 *
 */

import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from './constants';

export function reset(auth) {
  return {
    type: RESET_PASSWORD_REQUEST,
    auth
  };
}

export function resetSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
}

export function resetError(error) {
  return {
    type: RESET_PASSWORD_ERROR,
    error
  };
}
