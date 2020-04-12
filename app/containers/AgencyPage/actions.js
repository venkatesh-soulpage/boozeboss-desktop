/*
 *
 * AgencyPage actions
 *
 */

import { 
  ADD_AGENCY_DRAFT,
  GET_AGENCIES_REQUEST, GET_AGENCIES_SUCCESS, GET_AGENCIES_ERROR,
  INVITE_AGENCY_REQUEST, INVITE_AGENCY_SUCCESS, INVITE_AGENCY_ERROR,
 } from './constants';

 export function addAgencyDraft() {
  return {
    type: ADD_AGENCY_DRAFT,
  };
}

/* GET CLIENT AGENCIES */
export function getAgencies() {
  return {
    type: GET_AGENCIES_REQUEST,
  };
}

export function getAgenciesSuccess(agencies) {
  return {
    type: GET_AGENCIES_SUCCESS,
    agencies,
  };
}

export function getAgenciesError(error) {
  return {
    type: GET_AGENCIES_ERROR,
    error,
  };
}

/* CREATE AGENCY */
export function inviteAgency(agency) {
  return {
    type: INVITE_AGENCY_REQUEST,
    agency,
  };
}

export function inviteAgencySuccess(agency) {
  return {
    type: INVITE_AGENCY_SUCCESS,
    agency,
  };
}

export function inviteAgencyError(error) {
  return {
    type: INVITE_AGENCY_ERROR,
    error,
  };
}
