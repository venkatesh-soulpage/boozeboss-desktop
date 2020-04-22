import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { GET_CLIENTS_REQUEST, INVITE_CLIENT_REQUEST, GET_ROLES_REQUEST, INVITE_COLLABORATOR_REQUEST, CREATE_VENUE_REQUEST, CREATE_VENUE_SUCCESS, DELETE_VENUE_REQUEST, DELETE_VENUE_SUCCESS, GET_LOCATIONS_REQUEST, CREATE_BRAND_REQUEST, CREATE_BRAND_SUCCESS } from './constants';
import {
  getClientsSuccess,
  getClientsError,
  inviteClientSuccess,
  inviteClientError,
  getRolesSuccess,
  getRolesError,
  inviteCollaboratorSuccess,
  inviteCollaboratorError,
  createVenueSuccess,
  createVenueError,
  deleteVenueSuccess,
  deleteVenueError,
  getLocationsSuccess,
  getLocationsError,
  createBrandcSuccess,
  createBrandError,
} from './actions';

function* getClientsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/clients`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getClientsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getClientsError(jsonError));
  }
}

function* inviteClientSaga(params) {
  const { client } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/clients/invite`;
  const options = {
    method: 'POST',
    body: JSON.stringify(client),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(inviteClientSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(inviteClientError(jsonError));
  }
}

function* getRolesSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/roles?scope=BRAND`;
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

function* inviteCollaboratorSaga(params) {
  const { collaborator } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/clients/invite-collaborator`;
  const options = {
    method: 'POST',
    body: JSON.stringify(collaborator),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(inviteCollaboratorSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(inviteCollaboratorError(jsonError));
  }
}

function* createVenueSaga(params) {
  const { venue } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/venues`;
  const options = {
    method: 'POST',
    body: JSON.stringify(venue),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createVenueSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createVenueError(jsonError));
  }
}

function* createBrandSaga(params) {
  const { brand } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/brands`;
  const options = {
    method: 'POST',
    body: JSON.stringify(brand),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createBrandcSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createBrandError(jsonError));
  }
}

function* deleteVenueSaga(params) {
  const { venue_id } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/venues/${venue_id}`;
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

function* getClientsRequest() {
  yield takeLatest(GET_CLIENTS_REQUEST, getClientsSaga);
}

function* inviteClientRequest() {
  yield takeLatest(INVITE_CLIENT_REQUEST, inviteClientSaga);
}

function* inviteCollaboratorRequest() {
  yield takeLatest(INVITE_COLLABORATOR_REQUEST, inviteCollaboratorSaga);
}

function* getRolesRequest() {
  yield takeLatest(GET_ROLES_REQUEST, getRolesSaga);
}

function* getLocationsRequest() {
  yield takeLatest(GET_LOCATIONS_REQUEST, getLocationsSaga);
}

function* createVenueRequest() {
  yield takeLatest(CREATE_VENUE_REQUEST, createVenueSaga);
}

function* createBrandRequest() {
  yield takeLatest(CREATE_BRAND_REQUEST, createBrandSaga);
}

function* deleteVenueRequest() {
  yield takeLatest(DELETE_VENUE_REQUEST, deleteVenueSaga);
}

// Reactive saga
function* createVenueSuccessRequest() {
  yield takeLatest(CREATE_VENUE_SUCCESS, getClientsSaga);
}

function* createBrandSuccessRequest() {
  yield takeLatest(CREATE_BRAND_SUCCESS, getClientsSaga);
}

function* deleteVenueSuccessRequest() {
  yield takeLatest(DELETE_VENUE_SUCCESS, getClientsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getClientsRequest),
    fork(inviteClientRequest),
    fork(inviteCollaboratorRequest),
    fork(getRolesRequest),
    fork(getLocationsRequest),
    fork(createVenueRequest),
    fork(createBrandRequest),
    fork(deleteVenueRequest),
    // Reactive
    fork(createVenueSuccessRequest),
    fork(deleteVenueSuccessRequest),
    fork(createBrandSuccessRequest),
  ]);
}
