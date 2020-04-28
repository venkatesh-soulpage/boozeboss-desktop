/*
 *
 * Requisition actions
 *
 */

import { GET_REQUISITIONS_REQUEST, GET_REQUISITIONS_SUCCESS, GET_REQUISITIONS_ERROR } from './constants';

export function getRequisitions() {
  return {
    type: GET_REQUISITIONS_REQUEST,
  };
}

export function getRequisitionsSuccess(requisitions) {
  return {
    type: GET_REQUISITIONS_SUCCESS,
    requisitions
  };
}

export function getRequisitionsError(error) {
  return {
    type: GET_REQUISITIONS_ERROR,
    error
  };
}
