/*
 *
 * ForgotPassword actions
 *
 */

import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR } from './constants';

export function forgot(email) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    email
  };
}

export function forgotSuccess() {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
  };
}

export function forgotError(error) {
  return {
    type: FORGOT_PASSWORD_ERROR,
    error
  };
}
