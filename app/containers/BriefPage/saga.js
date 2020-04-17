import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_BRIEFS_REQUEST, 
  CREATE_BRIEF_REQUEST, 
  DELETE_BRIEF_REQUEST, DELETE_BRIEF_SUCCESS,
  GET_VENUES_REQUEST, 
  CREATE_BRIEF_EVENT_REQUEST, CREATE_BRIEF_EVENT_SUCCESS
} from './constants';

import {
  getBriefsSuccess, getBriefsError,
  createBriefSuccess, createBriefError, 
  deleteBriefSuccess, deleteBriefError, 
  getVenuesSuccess, getVenuesError,
  createBriefEventSuccess, createBriefEventError
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


function* createBriefEventSaga(params) {
  const {brief_id, briefEvent} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/addBriefEvent`;
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

function* createBriefEventRequest() {
  yield takeLatest(CREATE_BRIEF_EVENT_REQUEST, createBriefEventSaga);
}

// Reactive Saga
function* deleteBriefSuccessRequest() {
  yield takeLatest(DELETE_BRIEF_SUCCESS, getBriefsSaga);
}

function* createBriefEventSuccessRequest() {
  yield takeLatest(CREATE_BRIEF_EVENT_SUCCESS, getBriefsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getBriefsRequest),
    fork(createBriefRequest),
    fork(deleteBriefRequest),
    fork(getVenuesRequest),
    fork(createBriefEventRequest),
    // Reactive
    fork(deleteBriefSuccessRequest),
    fork(createBriefEventSuccessRequest)
  ]);
}
