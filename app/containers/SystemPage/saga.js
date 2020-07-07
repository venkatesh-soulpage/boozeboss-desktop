import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_LOCATIONS_REQUEST, 
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  UPDATE_LOCATION_RATE_REQUEST,
  UPDATE_LOCATION_RATE_SUCCESS
} from './constants';

import {
  getLocationsSuccess, getLocationsError, 
  addLocationSuccess, addLocationError,
  updateLocationRateSuccess, updateLocationRateError
} from './actions';

function* getLocationsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/locations`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getLocationsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getLocationsError(jsonError));
  }
}

function* addLocationSaga(params) {
  const {location} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/locations`;
  const options = {
    method: 'POST',
    body: JSON.stringify(location)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addLocationSuccess(response));
  } catch (error) {
    console.log(error);
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addLocationError(jsonError));
  }
}

function* updateLocationRateSaga(params) {
  const {location_id, currency_conversion} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/locations/${location_id}/rate`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({currency_conversion})
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateLocationRateSuccess(response));
  } catch (error) {
    console.log(error);
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateLocationRateError(jsonError));
  }
}


function* getLocationsRequest() {
  yield takeLatest(GET_LOCATIONS_REQUEST, getLocationsSaga);
}

function* addLocationRequest() {
  yield takeLatest(ADD_LOCATION_REQUEST, addLocationSaga);
}

function* updateLocationRateRequest() {
  yield takeLatest(UPDATE_LOCATION_RATE_REQUEST, updateLocationRateSaga);
}

// Reactive
function* addLocationSuccessRequest() {
  yield takeLatest(ADD_LOCATION_SUCCESS, getLocationsSaga);
}

function* updateLocationRateSuccessRequest() {
  yield takeLatest(UPDATE_LOCATION_RATE_SUCCESS, getLocationsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getLocationsRequest),
    fork(addLocationRequest),
    fork(updateLocationRateRequest),
    // Reactive
    fork(addLocationSuccessRequest),
    fork(updateLocationRateSuccessRequest),
  ]);
}
