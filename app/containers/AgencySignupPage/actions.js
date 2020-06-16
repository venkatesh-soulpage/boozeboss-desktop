/*
 *
 * ClientSignup actions
 *
 */

import {
  AGENCY_SIGNUP_REQUEST,
  AGENCY_SIGNUP_SUCCESS,
  AGENCY_SIGNUP_ERROR,
  GET_SLA_REQUEST,
  GET_SLA_SUCCESS,
  GET_SLA_ERROR
} from './constants';

export function agencySignup(auth) {
  return {
    type: AGENCY_SIGNUP_REQUEST,
    auth,
  };
}

export function agencySignupSuccess(credentials) {
  localStorage.setItem('jwt', credentials.token);
  localStorage.setItem('refresh_token', credentials.refresh_token);
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


export function getSla(agency_id) {
  return {
    type: GET_SLA_REQUEST,
    agency_id,
  };
}

export function getSlaSuccess(sla) {
  return {
    type: GET_SLA_SUCCESS,
    sla,
  };
}

export function getSlaError(error) {
  return {
    type: GET_SLA_ERROR,
    error,
  };
}
