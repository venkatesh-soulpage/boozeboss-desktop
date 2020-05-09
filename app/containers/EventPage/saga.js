import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_EVENTS_REQUEST, 
  INVITE_GUEST_REQUEST, INVITE_GUEST_SUCCESS,
  DELETE_GUEST_REQUEST,
  DELETE_GUEST_SUCCESS,
  RESEND_EMAIL_REQUEST
} from './constants';

import {
  getEventsSuccess, getEventsError,
  inviteGuestSuccess, inviteGuestError, resendEmailError, deleteGuestSuccess, deleteGuestError
} from './actions';

function* getEventsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events`;
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

function* inviteGuestSaga(params) {
  const {guest} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/invite-guest`;
  const options = {
    method: 'POST',
    body: JSON.stringify(guest)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(inviteGuestSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(inviteGuestError(jsonError));
  }
}

function* resendEmailSaga(params) {
  const {event_guest_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_guest_id}/resend-email`;
  const options = {
    method: 'POST',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(resendEmailSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(resendEmailError(jsonError));
  }
}

function* deleteGuestSaga(params) {
  const {event_guest_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_guest_id}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(deleteGuestSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(deleteGuestError(jsonError));
  }
}


function* getEventsRequest() {
  yield takeLatest(GET_EVENTS_REQUEST, getEventsSaga);
}

function* inviteGuestRequest() {
  yield takeLatest(INVITE_GUEST_REQUEST, inviteGuestSaga);
}

function* resendEmailRequest() {
  yield takeLatest(RESEND_EMAIL_REQUEST, resendEmailSaga);
}

function* deleteGuestRequest() {
  yield takeLatest(DELETE_GUEST_REQUEST, deleteGuestSaga);
}

// Reactive 
function* inviteGuestSuccessRequest() {
  yield takeLatest(INVITE_GUEST_SUCCESS, getEventsSaga);
}

function* deleteGuestSuccessRequest() {
  yield takeLatest(DELETE_GUEST_SUCCESS, getEventsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getEventsRequest),
    fork(inviteGuestRequest),
    fork(resendEmailRequest),
    fork(deleteGuestRequest),
    // Reactive
    fork(inviteGuestSuccessRequest),
    fork(deleteGuestSuccessRequest)
  ]);
}
