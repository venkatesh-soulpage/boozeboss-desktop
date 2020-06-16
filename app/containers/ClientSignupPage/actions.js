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

export function clientSignupSuccess(credentials) {
  localStorage.setItem('jwt', credentials.token);
  localStorage.setItem('refresh_token', credentials.refresh_token);
  return {
    type: CLIENT_SIGNUP_SUCCESS,
  };
}

export function clientSignupError(error) {
  return {
    type: CLIENT_SIGNUP_ERROR,
    error
  };
}
