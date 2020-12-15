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
  updateEventSuccess,
  updateEventError,
  deleteEventSuccess,
  deleteEventError,
} from './actions';

import {
  GET_EVENTS_REQUEST,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  GET_LOCATIONS_REQUEST,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  UPDATE_EVENT_REQUEST,
  DELETE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
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

function* updateEventSaga(params) {
  const { eventId, event } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletevents/${eventId}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(event),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateEventSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateEventError(jsonError));
  }
}

function* deleteEventSaga(params) {
  const { eventId } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletevents/${eventId}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(deleteEventSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(deleteEventError(jsonError));
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

function* updateEventRequest() {
  yield takeLatest(UPDATE_EVENT_REQUEST, updateEventSaga);
}

function* updateEventSuccessRequest() {
  yield takeLatest(UPDATE_EVENT_SUCCESS, getEventsSaga);
}

function* deleteEventRequest() {
  yield takeLatest(DELETE_EVENT_REQUEST, deleteEventSaga);
}

function* deleteEventSuccessRequest() {
  yield takeLatest(DELETE_EVENT_SUCCESS, getEventsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getEventsRequest),
    fork(addEventRequest),
    fork(addEventsSuccessRequest),
    fork(getLocationsRequest),
    fork(addMenuSuccessRequest),
    fork(addMenuRequest),
    fork(updateEventRequest),
    fork(deleteEventRequest),
    fork(updateEventSuccessRequest),
    fork(deleteEventSuccessRequest),
  ]);
}
