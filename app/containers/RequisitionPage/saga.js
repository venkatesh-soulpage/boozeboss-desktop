import {
  call, put, select, takeLatest, fork, all
} from 'redux-saga/effects';

import request from 'utils/request'

import { 
  GET_REQUISITIONS_REQUEST, 
  GET_CLIENT_PRODUCTS_REQUEST, 
  CREATE_REQUISITION_ORDER_REQUEST, CREATE_REQUISITION_ORDER_SUCCESS, 
  DELETE_REQUISITION_ORDER_REQUEST, DELETE_REQUISITION_ORDER_SUCCESS, 
  UPDATE_REQUISITION_STATUS_REQUEST, UPDATE_REQUISITION_STATUS_SUCCESS, GET_WAREHOUSES_REQUEST, UPDATE_REQUISITION_ORDERS_REQUEST, UPDATE_REQUISITION_ORDERS_SUCCESS, CREATE_REQUISITION_DELIVERY_REQUEST, CREATE_REQUISITION_DELIVERY_SUCCESS, UPDATE_REQUISITION_DELIVERY_REQUEST, UPDATE_REQUISITION_DELIVERY_SUCCESS 
} from './constants'

import { 
  getRequisitionsSuccess, getRequisitionsError,
  getClientProductsSuccess, getClientProductsError, 
  createRequisitionOrderSuccess, createRequisitionOrderError, 
  deleteRequisitionOrderSuccess, deleteRequisitionOrderError, 
  updateRequisitionStatusSuccess, updateRequisitionStatusError, getWarehousesSuccess, getWarehousesError, updateRequisitionOrdersSuccess, updateRequisitionOrdersError, createRequisitionDeliverySuccess, createRequisitionDeliveryError, updateRequisitionDeliverySuccess, updateRequisitionDeliveryError 
} from './actions'

function* getRequisitionsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/requisitions`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getRequisitionsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getRequisitionsError(jsonError));
  }
}

function* getWarehousesSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/warehouses`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getWarehousesSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getWarehousesError(jsonError));
  }
}

function* getClientProductsSaga(params) {
  const {client_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/products/client-products`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getClientProductsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getClientProductsError(jsonError));
  }
}

function* createRequisitionOrderSaga(params) {
  const {requisition_id, order} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/requisitions/${requisition_id}/add-order`;
  const options = {
    method: 'POST',
    body: JSON.stringify(order),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createRequisitionOrderSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createRequisitionOrderError(jsonError));
  }
}

function* deleteRequisitionOrderSaga(params) {
  const {requisition_id, requisition_order_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/requisitions/${requisition_id}/delete-order/${requisition_order_id}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(deleteRequisitionOrderSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(deleteRequisitionOrderError(jsonError));
  }
}

function* updateRequisitionStatusSaga(params) {
  const {requisition_id, status} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/requisitions/${requisition_id}/update-status`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({status})
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateRequisitionStatusSuccess(response));
  } catch (error) {
    console.log(error);
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateRequisitionStatusError(jsonError));
  }
}

function* updateRequisitionOrdersSaga(params) {
  const {requisition_id, orders, waybill} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/requisitions/${requisition_id}/deliver-orders`;
  const options = {
    method: 'POST',
    body: JSON.stringify({orders, waybill})
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateRequisitionOrdersSuccess(response));
  } catch (error) {
    console.log(error);
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateRequisitionOrdersError(jsonError));
  }
}

function* createRequisitionDeliverySaga(params) {
  const {requisition_id, delivery} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/requisitions/${requisition_id}/add-delivery`;
  const options = {
    method: 'POST',
    body: JSON.stringify(delivery)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createRequisitionDeliverySuccess(response));
  } catch (error) {
    console.log(error);
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createRequisitionDeliveryError(jsonError));
  }
}

function* updateRequisitionDeliverySaga(params) {
  const {requisition_id, requisition_delivery_id, delivery} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/requisitions/${requisition_id}/update-delivery/${requisition_delivery_id}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(delivery)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateRequisitionDeliverySuccess(response));
  } catch (error) {
    console.log(error);
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateRequisitionDeliveryError(jsonError));
  }
}

function* getRequisitionsRequest() {
  yield takeLatest(GET_REQUISITIONS_REQUEST, getRequisitionsSaga);
}

function* getWarehousesRequest() {
  yield takeLatest(GET_WAREHOUSES_REQUEST, getWarehousesSaga);
}

function* getClientProductsRequest() {
  yield takeLatest(GET_CLIENT_PRODUCTS_REQUEST, getClientProductsSaga);
}

function* createRequisitionOrderRequest() {
  yield takeLatest(CREATE_REQUISITION_ORDER_REQUEST, createRequisitionOrderSaga);
}

function* deleteRequisitionOrderRequest() {
  yield takeLatest(DELETE_REQUISITION_ORDER_REQUEST, deleteRequisitionOrderSaga);
}

function* updateRequisitionStatusRequest() {
  yield takeLatest(UPDATE_REQUISITION_STATUS_REQUEST, updateRequisitionStatusSaga);
}

function* updateRequisitionOrdersRequest() {
  yield takeLatest(UPDATE_REQUISITION_ORDERS_REQUEST, updateRequisitionOrdersSaga);
}

function* createRequisitionDeliveryRequest() {
  yield takeLatest(CREATE_REQUISITION_DELIVERY_REQUEST, createRequisitionDeliverySaga);
}

function* updateRequisitionDeliveryRequest() {
  yield takeLatest(UPDATE_REQUISITION_DELIVERY_REQUEST, updateRequisitionDeliverySaga);
}

// Reactive Saga
function* createRequisitionOrderSuccessRequest() {
  yield takeLatest(CREATE_REQUISITION_ORDER_SUCCESS, getRequisitionsSaga);
}

function* deleteRequisitionOrderSuccessRequest() {
  yield takeLatest(DELETE_REQUISITION_ORDER_SUCCESS, getRequisitionsSaga);
}

function* updateRequisitionStatusSuccessRequest() {
  yield takeLatest(UPDATE_REQUISITION_STATUS_SUCCESS, getRequisitionsSaga);
}

function* updateRequisitionOrdersSuccessRequest() {
  yield takeLatest(UPDATE_REQUISITION_ORDERS_SUCCESS, getRequisitionsSaga);
}

function* createRequisitionDeliverySuccessRequest() {
  yield takeLatest(CREATE_REQUISITION_DELIVERY_SUCCESS, getRequisitionsSaga);
}

function* updateRequisitionDeliverySuccessRequest() {
  yield takeLatest(UPDATE_REQUISITION_DELIVERY_SUCCESS, getRequisitionsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getRequisitionsRequest),
    fork(getClientProductsRequest),
    fork(getWarehousesRequest),
    fork(createRequisitionOrderRequest),
    fork(deleteRequisitionOrderRequest),
    fork(updateRequisitionStatusRequest),
    fork(updateRequisitionOrdersRequest),
    fork(createRequisitionDeliveryRequest),
    fork(updateRequisitionDeliveryRequest),
    // Reactive
    fork(createRequisitionOrderSuccessRequest),
    fork(deleteRequisitionOrderSuccessRequest),
    fork(updateRequisitionStatusSuccessRequest),
    fork(updateRequisitionOrdersSuccessRequest),
    fork(createRequisitionDeliverySuccessRequest),
    fork(updateRequisitionDeliverySuccessRequest),
  ]);
}