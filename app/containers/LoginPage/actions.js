/*
 *
 * Login actions
 *
 */

import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
  DISMISS_ERRORS
} from './constants';

export function login(auth) {
  return {
    auth,
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(response) {
  localStorage.setItem('jwt', response.token);
  localStorage.setItem('refresh_token', response.refresh_token);
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginError(error) {
  return {
    error,
    type: LOGIN_ERROR,
  };
}

export function dismissErrors() {
  return {
    type: DISMISS_ERRORS,
  };
}
