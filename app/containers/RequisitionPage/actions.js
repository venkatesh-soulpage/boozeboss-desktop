/*
 *
 * Requisition actions
 *
 */

import { GET_REQUISITIONS_REQUEST, GET_REQUISITIONS_SUCCESS, GET_REQUISITIONS_ERROR, GET_CLIENT_PRODUCTS_SUCCESS, GET_CLIENT_PRODUCTS_REQUEST, GET_CLIENT_PRODUCTS_ERROR, CREATE_REQUISITION_ORDER_SUCCESS, CREATE_REQUISITION_ORDER_ERROR, CREATE_REQUISITION_ORDER_REQUEST, DELETE_REQUISITION_ORDER_REQUEST, DELETE_REQUISITION_ORDER_SUCCESS, DELETE_REQUISITION_ORDER_ERROR, UPDATE_REQUISITION_ORDER_REQUEST, UPDATE_REQUISITION_STATUS_REQUEST, UPDATE_REQUISITION_STATUS_SUCCESS, UPDATE_REQUISITION_STATUS_ERROR, GET_WAREHOUSES_REQUEST, GET_WAREHOUSES_SUCCESS, UPDATE_REQUISITION_ORDERS_REQUEST, UPDATE_REQUISITION_ORDERS_SUCCESS, UPDATE_REQUISITION_ORDERS_ERROR, CREATE_REQUISITION_DELIVERY_REQUEST, CREATE_REQUISITION_DELIVERY_SUCCESS, CREATE_REQUISITION_DELIVERY_ERROR, UPDATE_REQUISITION_DELIVERY_REQUEST, UPDATE_REQUISITION_DELIVERY_SUCCESS, UPDATE_REQUISITION_DELIVERY_ERROR, REJECT_REQUISITION_STATUS_REQUEST, REJECT_REQUISITION_STATUS_SUCCESS, REJECT_REQUISITION_STATUS_ERROR, GET_WAREHOUSES_ERROR, REQUEST_REQUISITION_SIGN_REQUEST, REQUEST_REQUISITION_SIGN_SUCCESS, REQUEST_REQUISITION_SIGN_ERROR } from './constants';


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

//  Get warehouses
export function getWarehouses() {
  return {
    type: GET_WAREHOUSES_REQUEST,
  };
}

export function getWarehousesSuccess(warehouses) {
  return {
    type: GET_WAREHOUSES_SUCCESS,
    warehouses
  };
}

export function getWarehousesError(error) {
  return {
    type: GET_WAREHOUSES_ERROR,
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

// Update requisition status
export function updateRequisitionStatus(requisition_id, status, hellosign_signature_id) {
  return {
    type: UPDATE_REQUISITION_STATUS_REQUEST,
    requisition_id,
    status, 
    hellosign_signature_id
  };
}

export function updateRequisitionStatusSuccess(success) {
  return {
    type: UPDATE_REQUISITION_STATUS_SUCCESS,
    success
  };
}

export function updateRequisitionStatusError(error) {
  return {
    type: UPDATE_REQUISITION_STATUS_ERROR,
    error
  };
}

// Reject requisition status
export function rejectRequisition(requisition_id) {
  return {
    type: REJECT_REQUISITION_STATUS_REQUEST,
    requisition_id,
  };
}

export function rejectRequisitionSuccess(success) {
  return {
    type: REJECT_REQUISITION_STATUS_SUCCESS,
    success
  };
}

export function rejectRequisitionError(error) {
  return {
    type: REJECT_REQUISITION_STATUS_ERROR,
    error
  };
}

// Update requisition orders
export function updateRequisitionOrders(requisition_id, orders, waybill) {
  return {
    type: UPDATE_REQUISITION_ORDERS_REQUEST,
    requisition_id,
    orders,
    waybill,
  };
}

export function updateRequisitionOrdersSuccess(success) {
  return {
    type: UPDATE_REQUISITION_ORDERS_SUCCESS,
    success
  };
}

export function updateRequisitionOrdersError(error) {
  return {
    type: UPDATE_REQUISITION_ORDERS_ERROR,
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

// Create requisition orders
export function createRequisitionDelivery(requisition_id, delivery) {
  return {
    type: CREATE_REQUISITION_DELIVERY_REQUEST,
    requisition_id,
    delivery
  };
}

export function createRequisitionDeliverySuccess(success) {
  return {
    type: CREATE_REQUISITION_DELIVERY_SUCCESS,
    success
  };
}

export function createRequisitionDeliveryError(error) {
  return {
    type: CREATE_REQUISITION_DELIVERY_ERROR,
    error
  };
}

// Create requisition orders
export function updateRequisitionDelivery(requisition_id, requisition_delivery_id, delivery) {
  return {
    type: UPDATE_REQUISITION_DELIVERY_REQUEST,
    requisition_id,
    requisition_delivery_id,
    delivery
  };
}

export function updateRequisitionDeliverySuccess(success) {
  return {
    type: UPDATE_REQUISITION_DELIVERY_SUCCESS,
    success
  };
}

export function updateRequisitionDeliveryError(error) {
  return {
    type: UPDATE_REQUISITION_DELIVERY_ERROR,
    error
  };
}

// Request requisition sign
export function requestSign(requisition_id) {
  return {
    type: REQUEST_REQUISITION_SIGN_REQUEST,
    requisition_id,
  };
}

export function requestSignSuccess(signUrl) {
  return {
    type: REQUEST_REQUISITION_SIGN_SUCCESS,
    signUrl
  };
}

export function requestSignError(error) {
  return {
    type: REQUEST_REQUISITION_SIGN_ERROR,
    error
  };
}
