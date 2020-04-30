/*
 *
 * Requisition actions
 *
 */

import { GET_REQUISITIONS_REQUEST, GET_REQUISITIONS_SUCCESS, GET_REQUISITIONS_ERROR, GET_CLIENT_PRODUCTS_SUCCESS, GET_CLIENT_PRODUCTS_REQUEST, GET_CLIENT_PRODUCTS_ERROR, CREATE_REQUISITION_ORDER_SUCCESS, CREATE_REQUISITION_ORDER_ERROR, CREATE_REQUISITION_ORDER_REQUEST, DELETE_REQUISITION_ORDER_REQUEST, DELETE_REQUISITION_ORDER_SUCCESS, DELETE_REQUISITION_ORDER_ERROR } from './constants';

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

export function getClientProducts(client_id) {
  return {
    type: GET_CLIENT_PRODUCTS_REQUEST,
    client_id
  };
}

export function getClientProductsSuccess(products) {
  return {
    type: GET_CLIENT_PRODUCTS_SUCCESS,
    products
  };
}

export function getClientProductsError(error) {
  return {
    type: GET_CLIENT_PRODUCTS_ERROR,
    error
  };
}

// Create requisition orders
export function createRequisitionOrder(requisition_id, order) {
  return {
    type: CREATE_REQUISITION_ORDER_REQUEST,
    requisition_id,
    order
  };
}

export function createRequisitionOrderSuccess(success) {
  return {
    type: CREATE_REQUISITION_ORDER_SUCCESS,
    success
  };
}

export function createRequisitionOrderError(error) {
  return {
    type: CREATE_REQUISITION_ORDER_ERROR,
    error
  };
}

// Delete requisition orders
export function deleteRequisitionOrder(requisition_id, requisition_order_id) {
  return {
    type: DELETE_REQUISITION_ORDER_REQUEST,
    requisition_id,
    requisition_order_id
  };
}

export function deleteRequisitionOrderSuccess(success) {
  return {
    type: DELETE_REQUISITION_ORDER_SUCCESS,
    success
  };
}

export function deleteRequisitionOrderError(error) {
  return {
    type: DELETE_REQUISITION_ORDER_ERROR,
    error
  };
}
