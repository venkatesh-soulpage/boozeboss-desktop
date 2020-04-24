import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_WAREHOUSES_REQUEST, GET_PRODUCTS_REQUEST, ADD_PRODUCT_STOCK_REQUEST, ADD_PRODUCT_STOCK_SUCCESS
} from './constants';

import {
  getWarehousesSuccess, getWarehousesError, 
  getProductsSuccess, getProductsError, addProductStockSuccess, addProductStockError
} from './actions';

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

function* getProductsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/products`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getProductsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getProductsError(jsonError));
  }
}

function* addProductStockSaga(params) {
  const {stock, warehouse_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/warehouses/${warehouse_id}/add-stock`;
  const options = {
    method: 'POST',
    body: JSON.stringify(stock)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addProductStockSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addProductStockError(jsonError));
  }
}

function* getWarehousesRequest() {
  yield takeLatest(GET_WAREHOUSES_REQUEST, getWarehousesSaga);
}

function* getProductsRequest() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsSaga);
}

function* addProductStockRequest() {
  yield takeLatest(ADD_PRODUCT_STOCK_REQUEST, addProductStockSaga);
}

// Reactive Saga
function* addProductStockSuccessRequest() {
  yield takeLatest(ADD_PRODUCT_STOCK_SUCCESS, getWarehousesSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getWarehousesRequest),
    fork(getProductsRequest),
    fork(addProductStockRequest),
    // Reactive
    fork(addProductStockSuccessRequest),
  ]);
}
