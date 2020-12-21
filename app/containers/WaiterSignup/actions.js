/*
 *
 * OutletSignup actions
 *
 */

import status from 'utils/status';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR } from './constants';

export function signup(auth) {
  return {
    type: SIGNUP_REQUEST,
    auth,
  };
}

export function signupSuccess(credentials) {
  localStorage.setItem('jwt', credentials.token);
  localStorage.setItem('refresh_token', credentials.refresh_token);
  return {
    type: SIGNUP_SUCCESS,
  };
}

export function signupError(error) {
  status(error, 'error');
  return {
    type: SIGNUP_ERROR,
    error,
  };
}
