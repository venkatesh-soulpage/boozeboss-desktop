import {
  call, put, select, takeLatest, fork, all
} from 'redux-saga/effects';

import request from 'utils/request'

import { GET_REQUISITIONS_REQUEST, GET_CLIENT_PRODUCTS_REQUEST, CREATE_REQUISITION_ORDER_REQUEST, CREATE_REQUISITION_ORDER_SUCCESS, DELETE_REQUISITION_ORDER_REQUEST, DELETE_REQUISITION_ORDER_SUCCESS } from './constants'
import { getRequisitionsSuccess, getRequisitionsError, getClientProductsSuccess, getClientProductsError, createRequisitionOrderSuccess, createRequisitionOrderError, deleteRequisitionOrderSuccess, deleteRequisitionOrderError } from './actions'

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

function* getClientProductsSaga(params) {
  const {client_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/products/${client_id}`;
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

function* getRequisitionsRequest() {
  yield takeLatest(GET_REQUISITIONS_REQUEST, getRequisitionsSaga);
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

// Reactive Saga
function* createRequisitionOrderSuccessRequest() {
  yield takeLatest(CREATE_REQUISITION_ORDER_SUCCESS, getRequisitionsSaga);
}

function* deleteRequisitionOrderSuccessRequest() {
  yield takeLatest(DELETE_REQUISITION_ORDER_SUCCESS, getRequisitionsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getRequisitionsRequest),
    fork(getClientProductsRequest),
    fork(createRequisitionOrderRequest),
    fork(deleteRequisitionOrderRequest),
    // Reactive
    fork(createRequisitionOrderSuccessRequest),
    fork(deleteRequisitionOrderSuccessRequest),
  ]);
}