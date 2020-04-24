import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_BRIEFS_REQUEST, 
  CREATE_BRIEF_REQUEST, 
  DELETE_BRIEF_REQUEST, DELETE_BRIEF_SUCCESS,
  GET_VENUES_REQUEST, 
  CREATE_BRIEF_EVENT_REQUEST, CREATE_BRIEF_EVENT_SUCCESS, UPDATE_BRIEF_STATUS_REQUEST, UPDATE_BRIEF_STATUS_SUCCESS, GET_AGENCIES_REQUEST, CREATE_BRIEF_PRODUCT_REQUEST, CREATE_BRIEF_PRODUCT_SUCCESS, GET_PRODUCTS_REQUEST, DELETE_BRIEF_PRODUCT_REQUEST, DELETE_BRIEF_PRODUCT_SUCCESS
} from './constants';

import {
  getBriefsSuccess, getBriefsError,
  createBriefSuccess, createBriefError, 
  deleteBriefSuccess, deleteBriefError, 
  getVenuesSuccess, getVenuesError,
  createBriefEventSuccess, createBriefEventError, updateBriefStatusSuccess, updateBriefStatusError, getAgenciesSuccess, getAgenciesError, createBriefProductSuccess, createBriefProductError, getProductsSuccess, getProductsError, deleteBriefProductSuccess, deleteBriefProductError
} from './actions';

function* getBriefsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getBriefsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getBriefsError(jsonError));
  }
}

function* createBriefSaga(params) {
  const {brief} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs`;
  const options = {
    method: 'POST',
    body: JSON.stringify(brief)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createBriefSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createBriefError(jsonError));
  }
}

function* deleteBriefSaga(params) {
  const {brief_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(deleteBriefSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(deleteBriefError(jsonError));
  }
}

function* getVenuesSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/venues`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getVenuesSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getVenuesError(jsonError));
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

function* getAgenciesSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/agencies`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getAgenciesSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getAgenciesError(jsonError));
  }
}


function* createBriefEventSaga(params) {
  const {brief_id, briefEvent} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/add-event`;
  const options = {
    method: 'POST',
    body: JSON.stringify(briefEvent)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createBriefEventSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createBriefEventError(jsonError));
  }
}

function* createBriefProductSaga(params) {
  const {brief_id, briefProduct} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/add-product`;
  const options = {
    method: 'POST',
    body: JSON.stringify(briefProduct)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createBriefProductSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createBriefProductError(jsonError));
  }
}

function* deleteBriefProductSaga(params) {
  const {brief_id, brief_product_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/delete-product/${brief_product_id}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(deleteBriefProductSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(deleteBriefProductError(jsonError));
  }
}

function* updateBriefStatusSaga(params) {
  const {brief_id, status} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/update-status`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({status})
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateBriefStatusSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateBriefStatusError(jsonError));
  }
}

function* getBriefsRequest() {
  yield takeLatest(GET_BRIEFS_REQUEST, getBriefsSaga);
}

function* createBriefRequest() {
  yield takeLatest(CREATE_BRIEF_REQUEST, createBriefSaga);
}

function* deleteBriefRequest() {
  yield takeLatest(DELETE_BRIEF_REQUEST, deleteBriefSaga);
}

function* getVenuesRequest() {
  yield takeLatest(GET_VENUES_REQUEST, getVenuesSaga);
}

function* getProductsRequest() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsSaga);
}

function* getAgenciesRequest() {
  yield takeLatest(GET_AGENCIES_REQUEST, getAgenciesSaga);
}

function* createBriefEventRequest() {
  yield takeLatest(CREATE_BRIEF_EVENT_REQUEST, createBriefEventSaga);
}

function* createBriefProductRequest() {
  yield takeLatest(CREATE_BRIEF_PRODUCT_REQUEST, createBriefProductSaga);
}

function* deleteBriefProductRequest() {
  yield takeLatest(DELETE_BRIEF_PRODUCT_REQUEST, deleteBriefProductSaga);
}

function* updateBriefStatusRequest() {
  yield takeLatest(UPDATE_BRIEF_STATUS_REQUEST, updateBriefStatusSaga);
}

// Reactive Saga
function* deleteBriefSuccessRequest() {
  yield takeLatest(DELETE_BRIEF_SUCCESS, getBriefsSaga);
}

function* createBriefEventSuccessRequest() {
  yield takeLatest(CREATE_BRIEF_EVENT_SUCCESS, getBriefsSaga);
}

function* createBriefProductSuccessRequest() {
  yield takeLatest(CREATE_BRIEF_PRODUCT_SUCCESS, getBriefsSaga);
}

function* deleteBriefProductSuccessRequest() {
  yield takeLatest(DELETE_BRIEF_PRODUCT_SUCCESS, getBriefsSaga);
}

function* updateBriefStatusSuccessRequest() {
  yield takeLatest(UPDATE_BRIEF_STATUS_SUCCESS, getBriefsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getBriefsRequest),
    fork(createBriefRequest),
    fork(deleteBriefRequest),
    fork(getVenuesRequest),
    fork(getProductsRequest),
    fork(getAgenciesRequest),
    fork(createBriefEventRequest),
    fork(createBriefProductRequest),
    fork(deleteBriefProductRequest),
    fork(updateBriefStatusRequest),
    // Reactive
    fork(deleteBriefSuccessRequest),
    fork(createBriefEventSuccessRequest),
    fork(createBriefProductSuccessRequest),
    fork(deleteBriefProductSuccessRequest),
    fork(updateBriefStatusSuccessRequest),
  ]);
}
