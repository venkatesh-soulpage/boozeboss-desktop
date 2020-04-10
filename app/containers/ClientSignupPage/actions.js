/*
 *
 * ClientSignup actions
 *
 */

import { CLIENT_SIGNUP_REQUEST, CLIENT_SIGNUP_SUCCESS, CLIENT_SIGNUP_ERROR } from './constants';

export function clientSignup(auth) {
  return {
    type: CLIENT_SIGNUP_REQUEST,
    auth
  };
}

export function clientSignupSuccess(client) {
  return {
    type: CLIENT_SIGNUP_SUCCESS,
    client
  };
}

export function clientSignupError(error) {
  return {
    type: CLIENT_SIGNUP_ERROR,
    error
  };
}
