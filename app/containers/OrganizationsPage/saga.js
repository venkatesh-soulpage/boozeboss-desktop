import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_ORGANIZATIONS_REQUEST, GET_LOCATIONS_REQUEST,
  INVITE_ORGANIZATIONS_REQUEST, INVITE_ORGANIZATIONS_SUCCESS, 
  RESEND_INVITE_REQUEST, RESEND_INVITE_SUCCESS, 
  SELECT_PRIMARY_LOCATION_REQUEST, SELECT_PRIMARY_LOCATION_SUCCESS,
  UPDATE_SLA_REQUEST, UPDATE_SLA_SUCCESS,
  GET_ROLES_REQUEST,
  INVITE_COLLABORATOR_REQUEST,
  REVOKE_COLLABORATOR_INVITE_REQUEST,
  REVOKE_COLLABORATOR_INVITE_SUCCESS,
  INVITE_COLLABORATOR_SUCCESS,
  ADD_COLLABORATOR_CREDITS_REQUEST, ADD_COLLABORATOR_CREDITS_SUCCESS,
  UPDATE_COLLABORATOR_PRIMARY_LOCATION_REQUEST, UPDATE_COLLABORATOR_PRIMARY_LOCATION_SUCCESS
} from './constants';

import {
  getOrganizationsSuccess, getOrganizationsError,
  getLocationsSuccess, getLocationsError, inviteOrganizationSuccess, inviteOrganizationError, 
  resendInviteCollaboratorSuccess, resendInviteCollaboratorError, 
  selectPrimaryLocationSuccess, selectPrimaryLocationError, 
  updateSlaSuccess, updateSlaError,
  getRolesSuccess, getRolesError,
  inviteCollaboratorSuccess, inviteCollaboratorError, 
  revokeCollaboratorInvitationSuccess, revokeCollaboratorInvitationError,
  addCollaboratorCreditsSuccess, addCollaboratorCreditsError,
  updateCollaboratorLocationSuccess, updateCollaboratorLocationError
} from './actions';

import {getUser} from '../App/actions'

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

function* selectPrimaryLocationSaga(params) {
  const {regional_organization_id, regional_organization_location_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/organizations/${regional_organization_id}/locations/select-primary`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({regional_organization_location_id})
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(selectPrimaryLocationSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(selectPrimaryLocationError(jsonError));
  }
}


function* updateSlaSaga(params) {
  const { regional_organization_id, sla } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/organizations/${regional_organization_id}/update-sla`;
  const options = {
    method: 'PATCH',
    body: JSON.stringify(sla)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateSlaSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateSlaError(jsonError));
  }
}

function* getRolesSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/roles?scope=REGION`;
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
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/organizations/invite-collaborator`;
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

function* revokeCollaboratorInvitationSaga(params) {
  const { collaborator_invitation_id } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/organizations/revoke-collaborator/${collaborator_invitation_id}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(revokeCollaboratorInvitationSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(revokeCollaboratorInvitationError(jsonError));
  }
}

function* addCollaboratorCreditsSaga(params) {
  const { collaborator_account_id, credits_amount } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/admin-transfer`;
  const options = {
    method: 'POST',
    body: JSON.stringify({collaborator_account_id, credits_amount}),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addCollaboratorCreditsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addCollaboratorCreditsError(jsonError));
  }
}

function* updateCollaboratorLocationSaga(params) {
  const { regional_organization_id, collaborator_id, location_id } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/organizations/${regional_organization_id}/collaborators/${collaborator_id}/update-location`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({location_id}),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateCollaboratorLocationSuccess(response));
    yield put(getUser());
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateCollaboratorLocationError(jsonError));
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

function* selectPrimaryLocationRequest() {
  yield takeLatest(SELECT_PRIMARY_LOCATION_REQUEST, selectPrimaryLocationSaga);
}

function* updateSLARequest() {
  yield takeLatest(UPDATE_SLA_REQUEST, updateSlaSaga);
}

function* getRolesRequest() {
  yield takeLatest(GET_ROLES_REQUEST, getRolesSaga);
}

function* inviteCollaboratorRequest() {
  yield takeLatest(INVITE_COLLABORATOR_REQUEST, inviteCollaboratorSaga);
}

function* revokeCollaboratorInviteRequest() {
  yield takeLatest(REVOKE_COLLABORATOR_INVITE_REQUEST, revokeCollaboratorInvitationSaga);
}

function* addCollaboratorCreditsRequest() {
  yield takeLatest(ADD_COLLABORATOR_CREDITS_REQUEST, addCollaboratorCreditsSaga);
}

function* updateCollaboratorLocationRequest() {
  yield takeLatest(UPDATE_COLLABORATOR_PRIMARY_LOCATION_REQUEST, updateCollaboratorLocationSaga);
}

// Reactive 
function* inviteOrganizationSuccessRequest() {
  yield takeLatest(INVITE_ORGANIZATIONS_SUCCESS, getOrganizationsSaga);
}

function* resendInviteCollaboratorSuccessRequest() {
  yield takeLatest(RESEND_INVITE_SUCCESS, getOrganizationsSaga);
}

function* selectPrimaryLocationSuccessRequest() {
  yield takeLatest(SELECT_PRIMARY_LOCATION_SUCCESS, getOrganizationsSaga);
}

function* updateSLASuccessRequest() {
  yield takeLatest(UPDATE_SLA_SUCCESS, getOrganizationsSaga);
}

function* inviteCollaboratorSuccessRequest() {
  yield takeLatest(INVITE_COLLABORATOR_SUCCESS, getOrganizationsSaga);
}

function* revokeCollaboratorInviteSuccessRequest() {
  yield takeLatest(REVOKE_COLLABORATOR_INVITE_SUCCESS, getOrganizationsSaga);
}

function* addCollaboratorCreditsSuccessRequest() {
  yield takeLatest(ADD_COLLABORATOR_CREDITS_SUCCESS, getOrganizationsSaga);
}

function* updateCollaboratorLocationSuccessRequest() {
  yield takeLatest(UPDATE_COLLABORATOR_PRIMARY_LOCATION_SUCCESS, getOrganizationsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getOrganizationsRequest),
    fork(getLocationsRequest),
    fork(inviteOrganizationRequest),
    fork(resendInviteCollaboratorRequest),
    fork(selectPrimaryLocationRequest),
    fork(updateSLARequest),
    fork(getRolesRequest),
    fork(inviteCollaboratorRequest),
    fork(revokeCollaboratorInviteRequest),
    fork(addCollaboratorCreditsRequest),
    fork(updateCollaboratorLocationRequest),
    // Reactive
    fork(inviteOrganizationSuccessRequest),
    fork(resendInviteCollaboratorSuccessRequest),
    fork(selectPrimaryLocationSuccessRequest),
    fork(updateSLASuccessRequest),
    fork(inviteCollaboratorSuccessRequest),
    fork(revokeCollaboratorInviteSuccessRequest),
    fork(addCollaboratorCreditsSuccessRequest),
    fork(updateCollaboratorLocationSuccessRequest),
  ]);
}
