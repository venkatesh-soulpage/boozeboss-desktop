import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_PRODUCTS_REQUEST,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  GET_BRANDS_REQUEST
} from './constants';

import {
  getProductsSuccess, getProductsError, addProductSuccess, addProductError, getBrandsSuccess, getBrandsError
} from './actions';

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

function* addProductSaga(params) {
  const {product} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/products`;
  const options = {
    method: 'POST',
    body: JSON.stringify(product)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addProductSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addProductError(jsonError));
  }
}

function* getBrandsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/brands`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getBrandsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getBrandsError(jsonError));
  }
}


function* getProductsRequest() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsSaga);
}

function* addProductRequest() {
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga);
}

function* getBrandsRequest() {
  yield takeLatest(GET_BRANDS_REQUEST, getBrandsSaga);
}

// Reactive 
function* addProductSuccessRequest() {
  yield takeLatest(ADD_PRODUCT_SUCCESS, getProductsSaga)
}

export default function* rootSaga() {
  yield all([
    fork(getProductsRequest),
    fork(addProductRequest),
    fork(getBrandsRequest),
    // Reactive
    fork(addProductSuccessRequest),
  ]);
}
