/*
 *
 * Login actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export function login(auth) {
  return {
    auth,
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(token) {
  return {
    token,
    type: LOGIN_SUCCESS,
  };
}

export function loginError(error) {
  console.log(error);
  return {
    error,
    type: LOGIN_ERROR,
  };
}
