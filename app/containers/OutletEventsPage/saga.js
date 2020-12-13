import { call, put, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import {
  getEventsSuccess,
  getEventsError,
  addEventSuccess,
  addEventError,
  getLocationsSuccess,
  getLocationsError,
  addMenuError,
  addMenuSuccess,
} from './actions';

import {
  GET_EVENTS_REQUEST,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  GET_LOCATIONS_REQUEST,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
} from './constants';

function* getEventsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletevents`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getEventsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getEventsError(jsonError));
  }
}

function* addEventSaga(params) {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletevents`;
  const options = {
    method: 'POST',
    body: JSON.stringify(params.event),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addEventSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addEventError(jsonError));
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
  console.log(params);
  const { eventId, menu } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletevents/${eventId}/menu`;
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

function* getEventsRequest() {
  yield takeLatest(GET_EVENTS_REQUEST, getEventsSaga);
}

function* addEventsSuccessRequest() {
  yield takeLatest(ADD_EVENT_SUCCESS, getEventsSaga);
}

function* addEventRequest() {
  yield takeLatest(ADD_EVENT_REQUEST, addEventSaga);
}

function* getLocationsRequest() {
  yield takeLatest(GET_LOCATIONS_REQUEST, getLocationsSaga);
}

function* addMenuSuccessRequest() {
  yield takeLatest(ADD_MENU_SUCCESS, getEventsSaga);
}

function* addMenuRequest() {
  yield takeLatest(ADD_MENU_REQUEST, addMenuSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getEventsRequest),
    fork(addEventRequest),
    fork(addEventsSuccessRequest),
    fork(getLocationsRequest),
    fork(addMenuSuccessRequest),
    fork(addMenuRequest),
  ]);
}
