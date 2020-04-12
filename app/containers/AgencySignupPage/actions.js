/*
 *
 * ClientSignup actions
 *
 */

import {
  AGENCY_SIGNUP_REQUEST,
  AGENCY_SIGNUP_SUCCESS,
  AGENCY_SIGNUP_ERROR,
} from './constants';

export function agencySignup(auth) {
  return {
    type: AGENCY_SIGNUP_REQUEST,
    auth,
  };
}

export function agencySignupSuccess(agency) {
  return {
    type: AGENCY_SIGNUP_SUCCESS,
    agency,
  };
}

export function agencySignupError(error) {
  return {
    type: AGENCY_SIGNUP_ERROR,
    error,
  };
}
