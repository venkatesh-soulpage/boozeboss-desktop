/* eslint-disable camelcase */
import { call, put, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import {
  getVenuesSuccess,
  getVenuesError,
  addVenueSuccess,
  addVenueError,
  getLocationsSuccess,
  getLocationsError,
  addMenuError,
  addMenuSuccess,
  updateVenueSuccess,
  updateVenueError,
  deleteVenueSuccess,
  deleteVenueError,
} from './actions';

import {
  ADD_VENUE_REQUEST,
  ADD_VENUE_SUCCESS,
  GET_VENUES_REQUEST,
  GET_LOCATIONS_REQUEST,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  UPDATE_VENUE_REQUEST,
  DELETE_VENUE_REQUEST,
  UPDATE_VENUE_SUCCESS,
  DELETE_VENUE_SUCCESS,
} from './constants';

function* getVenuesSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletvenues`;
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

function* addVenueSaga(params) {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletvenues`;

  const options = {
    method: 'POST',
    body: JSON.stringify(params.venue),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addVenueSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addVenueError(jsonError));
  }
}

function* getLocationsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletlocations`;
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

function* addMenuSaga(params) {
  const { venueId, menu } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletvenues/${venueId}/menu`;
  const options = {
    method: 'POST',
    body: JSON.stringify(menu),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addMenuSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addMenuError(jsonError));
  }
}

function* updateEventSaga(params) {
  const { venueId, venue } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletvenues/${venueId}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(venue),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateVenueSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateVenueError(jsonError));
  }
}

function* deleteEventSaga(params) {
  const { venueId } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletvenues/${venueId}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(deleteVenueSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(deleteVenueError(jsonError));
  }
}

function* getVenuesRequest() {
  yield takeLatest(GET_VENUES_REQUEST, getVenuesSaga);
}

function* addVenuesSuccessRequest() {
  yield takeLatest(ADD_VENUE_SUCCESS, getVenuesSaga);
}

function* addVenueRequest() {
  yield takeLatest(ADD_VENUE_REQUEST, addVenueSaga);
}

function* getLocationsRequest() {
  yield takeLatest(GET_LOCATIONS_REQUEST, getLocationsSaga);
}

function* addMenuSuccessRequest() {
  yield takeLatest(ADD_MENU_SUCCESS, getVenuesSaga);
}

function* addMenuRequest() {
  yield takeLatest(ADD_MENU_REQUEST, addMenuSaga);
}

function* updateVenueRequest() {
  yield takeLatest(UPDATE_VENUE_REQUEST, updateEventSaga);
}

function* updateVenueSuccessRequest() {
  yield takeLatest(UPDATE_VENUE_SUCCESS, getVenuesSaga);
}

function* deleteVenueRequest() {
  yield takeLatest(DELETE_VENUE_REQUEST, deleteEventSaga);
}

function* deleteVenueSuccessRequest() {
  yield takeLatest(DELETE_VENUE_SUCCESS, getVenuesSaga);
}

export default function* rootSaga() {
  yield all([
    fork(addVenueRequest),
    fork(getVenuesRequest),
    fork(addVenuesSuccessRequest),
    fork(getLocationsRequest),
    fork(addMenuSuccessRequest),
    fork(addMenuRequest),
    fork(updateVenueRequest),
    fork(updateVenueSuccessRequest),
    fork(deleteVenueRequest),
    fork(deleteVenueSuccessRequest),
  ]);
}
