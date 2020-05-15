/*
 *
 * VerificationContainer actions
 *
 */

import { GET_VERIFICATIONS_REQUEST, GET_VERIFICATIONS_SUCCESS, GET_VERIFICATIONS_ERROR, UPDATE_VERIFICATION_STATUS_REQUEST, UPDATE_VERIFICATION_STATUS_SUCCESS, UPDATE_VERIFICATION_STATUS_ERROR } from './constants';

export function getVerifications() {
  return {
    type: GET_VERIFICATIONS_REQUEST,
  };
}

export function getVerificationsSuccess(verifications) {
  return {
    type: GET_VERIFICATIONS_SUCCESS,
    verifications
  };
}

export function getVerificationsError(error) {
  return {
    type: GET_VERIFICATIONS_ERROR,
    error
  };
}

export function updateVerificationStatus(account_id, age_verification_status) {
  return {
    type: UPDATE_VERIFICATION_STATUS_REQUEST,
    account_id,
    age_verification_status,
  };
}

export function updateVerificationStatusSuccess(success) {
  return {
    type: UPDATE_VERIFICATION_STATUS_SUCCESS,
    success
  };
}

export function updateVerificationStatusError(error) {
  return {
    type: UPDATE_VERIFICATION_STATUS_ERROR,
    error
  };
}
