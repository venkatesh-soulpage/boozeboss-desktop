import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_ORGANIZATIONS_REQUEST, GET_LOCATIONS_REQUEST,
  INVITE_ORGANIZATIONS_REQUEST, INVITE_ORGANIZATIONS_SUCCESS, 
  RESEND_INVITE_REQUEST, RESEND_INVITE_SUCCESS
} from './constants';

import {
  getOrganizationsSuccess, getOrganizationsError,
  getLocationsSuccess, getLocationsError, inviteOrganizationSuccess, inviteOrganizationError, 
  resendInviteCollaboratorSuccess, resendInviteCollaboratorError
} from './actions';

function* getOrganizationsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/organizations`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getOrganizationsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getOrganizationsError(jsonError));
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

function* inviteOrganizationSaga(params) {
  const {organization} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/organizations`;
  const options = {
    method: 'POST',
    body: JSON.stringify(organization)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(inviteOrganizationSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(inviteOrganizationError(jsonError));
  }
}

function* resendInviteCollaboratorSaga(params) {
  const {collaborator_invitation_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/auth/resend-invitation`;
  const options = {
    method: 'POST',
    body: JSON.stringify({collaborator_invitation_id})
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(resendInviteCollaboratorSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(resendInviteCollaboratorError(jsonError));
  }
}


function* getOrganizationsRequest() {
  yield takeLatest(GET_ORGANIZATIONS_REQUEST, getOrganizationsSaga);
}

function* getLocationsRequest() {
  yield takeLatest(GET_LOCATIONS_REQUEST, getLocationsSaga);
}

function* inviteOrganizationRequest() {
  yield takeLatest(INVITE_ORGANIZATIONS_REQUEST, inviteOrganizationSaga);
}

function* resendInviteCollaboratorRequest() {
  yield takeLatest(RESEND_INVITE_REQUEST, resendInviteCollaboratorSaga);
}

// Reactive 
function* inviteOrganizationSuccessRequest() {
  yield takeLatest(INVITE_ORGANIZATIONS_SUCCESS, getOrganizationsSaga);
}

function* resendInviteCollaboratorSuccessRequest() {
  yield takeLatest(RESEND_INVITE_SUCCESS, getOrganizationsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getOrganizationsRequest),
    fork(getLocationsRequest),
    fork(inviteOrganizationRequest),
    fork(resendInviteCollaboratorRequest),
    // Reactive
    fork(inviteOrganizationSuccessRequest),
    fork(resendInviteCollaboratorSuccessRequest),
  ]);
}
