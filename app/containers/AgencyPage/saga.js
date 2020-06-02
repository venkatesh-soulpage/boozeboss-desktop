import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { GET_AGENCIES_REQUEST, INVITE_AGENCY_REQUEST, GET_ROLES_REQUEST, INVITE_COLLABORATOR_REQUEST, INVITE_COLLABORATOR_SUCCESS } from './constants';
import {
  getAgenciesSuccess, getAgenciesError,
  inviteAgencySuccess, inviteAgencyError,
  inviteCollaboratorSuccess, inviteCollaboratorError,
  getRolesSuccess, getRolesError,
} from './actions';

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

function* inviteAgencySaga(params) {
  const { agency } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/agencies/invite`;
  const options = {
    method: 'POST',
    body: JSON.stringify(agency),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(inviteAgencySuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(inviteAgencyError(jsonError));
  }
}

function* getRolesSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/roles?scope=AGENCY`;
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

function* inviteCollaboratorSaga(params) {
  const { collaborator } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/agencies/invite-collaborator`;
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

function* getAgenciesRequest() {
  yield takeLatest(GET_AGENCIES_REQUEST, getAgenciesSaga);
}

function* inviteAgencyRequest() {
  yield takeLatest(INVITE_AGENCY_REQUEST, inviteAgencySaga);
}

function* inviteCollaboratorRequest() {
  yield takeLatest(INVITE_COLLABORATOR_REQUEST, inviteCollaboratorSaga);
}

function* getRolesRequest() {
  yield takeLatest(GET_ROLES_REQUEST, getRolesSaga);
}

// Reactive
function* inviteCollaboratorSuccessRequest() {
  yield takeLatest(INVITE_COLLABORATOR_SUCCESS, getAgenciesSaga);
}


export default function* rootSaga() {
  yield all([
    fork(getAgenciesRequest),
    fork(inviteAgencyRequest),
    fork(inviteCollaboratorRequest),
    fork(getRolesRequest),
    // Reactive
    fork(inviteCollaboratorSuccessRequest)
  ]);
}
