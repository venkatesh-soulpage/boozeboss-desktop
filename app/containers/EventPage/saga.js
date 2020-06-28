import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_EVENTS_REQUEST, 
  INVITE_GUEST_REQUEST, INVITE_GUEST_SUCCESS,
  DELETE_GUEST_REQUEST,
  DELETE_GUEST_SUCCESS,
  RESEND_EMAIL_REQUEST,
  GET_ROLES_REQUEST,
  GET_PRODUCTS_REQUEST,
  ADD_EVENT_PRODUCTS_REQUEST, ADD_EVENT_PRODUCTS_SUCCESS,
  REMOVE_EVENT_PRODUCTS_REQUEST, REMOVE_EVENT_PRODUCTS_SUCCESS,
  ADD_EVENT_CONDITION_REQUEST, ADD_EVENT_CONDITION_SUCCESS, 
  REMOVE_EVENT_CONDITION_REQUEST, REMOVE_EVENT_CONDITION_SUCCESS
} from './constants';

import {
  getEventsSuccess, getEventsError,
  inviteGuestSuccess, inviteGuestError, 
  resendEmailError, deleteGuestSuccess, 
  resendEmailSuccess, deleteGuestError, 
  getRolesSuccess, getRolesError, 
  getProductsSuccess, getProductsError, 
  addEventProductSuccess, addEventProductError,
  removeEventProductSuccess, removeEventProductError,
  addEventConditionSuccess, addEventConditionError, 
  removeEventConditionSuccess, removeEventConditionError
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

function* getRolesSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/roles?scope=GUEST`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getRolesSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getRolesError(jsonError));
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

function* addEventProductsSaga(params) {
  const {event_id, product} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_id}/add-product`;
  const options = {
    method: 'POST',
    body: JSON.stringify(product),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addEventProductSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addEventProductError(jsonError));
  }
}

function* removeEventProductsSaga(params) {
  const {event_id, event_product_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_id}/delete-product/${event_product_id}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(removeEventProductSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(removeEventProductError(jsonError));
  }
}

function* addEventConditionSaga(params) {
  const {event_id, condition} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_id}/condition`;
  const options = {
    method: 'POST',
    body: JSON.stringify(condition),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addEventConditionSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addEventConditionError(jsonError));
  }
}

function* removeEventConditionSaga(params) {
  const {event_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_id}/condition`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(removeEventConditionSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(removeEventConditionError(jsonError));
  }
}


function* getEventsRequest() {
  yield takeLatest(GET_EVENTS_REQUEST, getEventsSaga);
}

function* getRolesRequest() {
  yield takeLatest(GET_ROLES_REQUEST, getRolesSaga);
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

function* getProductsRequest() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsSaga);
}

function* addEventProductRequest() {
  yield takeLatest(ADD_EVENT_PRODUCTS_REQUEST, addEventProductsSaga);
}

function* removeEventProductRequest() {
  yield takeLatest(REMOVE_EVENT_PRODUCTS_REQUEST, removeEventProductsSaga);
}

function* addEventConditionRequest() {
  yield takeLatest(ADD_EVENT_CONDITION_REQUEST, addEventConditionSaga);
}

function* removeEventConditionRequest() {
  yield takeLatest(REMOVE_EVENT_CONDITION_REQUEST, removeEventConditionSaga);
}

// Reactive 
function* inviteGuestSuccessRequest() {
  yield takeLatest(INVITE_GUEST_SUCCESS, getEventsSaga);
}

function* deleteGuestSuccessRequest() {
  yield takeLatest(DELETE_GUEST_SUCCESS, getEventsSaga);
}

function* addEventProductSuccessRequest() {
  yield takeLatest(ADD_EVENT_PRODUCTS_SUCCESS, getEventsSaga);
}

function* removeEventProductSuccessRequest() {
  yield takeLatest(REMOVE_EVENT_PRODUCTS_SUCCESS, getEventsSaga);
}

function* addEventConditionSuccessRequest() {
  yield takeLatest(ADD_EVENT_CONDITION_SUCCESS, getEventsSaga);
}

function* removeEventConditionSuccessRequest() {
  yield takeLatest(REMOVE_EVENT_CONDITION_SUCCESS, getEventsSaga);
}


export default function* rootSaga() {
  yield all([
    fork(getEventsRequest),
    fork(getRolesRequest),
    fork(inviteGuestRequest),
    fork(resendEmailRequest),
    fork(deleteGuestRequest),
    fork(getProductsRequest),
    fork(addEventProductRequest),
    fork(removeEventProductRequest),
    fork(addEventConditionRequest),
    fork(removeEventConditionRequest),
    // Reactive
    fork(inviteGuestSuccessRequest),
    fork(deleteGuestSuccessRequest),
    fork(addEventProductSuccessRequest),
    fork(removeEventProductSuccessRequest),
    fork(addEventConditionSuccessRequest),
    fork(removeEventConditionSuccessRequest),
  ]);
}
