import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';
import filerequest from 'utils/filerequest';

import { 
  GET_CLIENTS_REQUEST, 
  INVITE_CLIENT_REQUEST,
  GET_ROLES_REQUEST, 
  INVITE_COLLABORATOR_REQUEST, INVITE_CLIENT_SUCCESS,
  CREATE_VENUE_REQUEST, CREATE_VENUE_SUCCESS, 
  DELETE_VENUE_REQUEST, DELETE_VENUE_SUCCESS, 
  GET_LOCATIONS_REQUEST, 
  CREATE_BRAND_REQUEST, CREATE_BRAND_SUCCESS,
  UPDATE_BRAND_REQUEST, UPDATE_BRAND_SUCCESS, 
  CREATE_WAREHOUSE_REQUEST, CREATE_WAREHOUSE_SUCCESS,
  ADD_LOCATION_REQUEST, ADD_LOCATION_SUCCESS, 
  UPDATE_SLA_REQUEST, UPDATE_SLA_SUCCESS, 
  INVITE_COLLABORATOR_SUCCESS, 
  UPLOAD_LOGO_REQUEST, UPLOAD_LOGO_SUCCESS, 
  REVOKE_COLLABORATOR_INVITATION_REQUEST, REVOKE_COLLABORATOR_INVITATION_SUCCESS, 
  RESEND_INVITE_REQUEST, RESEND_INVITE_SUCCESS,
  GET_ORGANIZATIONS_REQUEST,
  ADD_COLLABORATOR_CREDITS_REQUEST, ADD_COLLABORATOR_CREDITS_SUCCESS, 
  GET_VERIFICATION_LOGS_REQUEST
} from './constants';

const { Parser } = require('json2csv');

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
  updateBrandSuccess,
  updateBrandError,
  deleteVenueSuccess,
  deleteVenueError,
  getLocationsSuccess,
  getLocationsError,
  createBrandcSuccess,
  createBrandError,
  createWarehouseSuccess,
  createWarehouseError,
  addClientLocationSuccess,
  addClientLocationError,
  updateSlaSuccess,
  updateSlaError,
  uploadLogoSuccess,
  uploadLogoError,
  revokeCollaboratorInvitationSuccess,
  revokeCollaboratorInvitationError,
  resendInviteCollaboratorSuccess,
  resendInviteCollaboratorError,
  getOrganizationsSuccess,
  getOrganizationsError,
  addCollaboratorCreditsSuccess,
  addCollaboratorCreditsError,
  getVerificationLogsSuccess,
  getVerificationLogsError,
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

function* revokeCollaboratorInvitationSaga(params) {
  const { collaborator_invitation_id } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/clients/revoke-collaborator/${collaborator_invitation_id}`;
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

function* addClientLocationSaga(params) {
  const { client_id, location_id } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/clients/${client_id}/add-location`;
  const options = {
    method: 'POST',
    body: JSON.stringify({location_id}),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addClientLocationSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addClientLocationError(jsonError));
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

function* updateBrandSaga(params) {
  const { brand_id, brand } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/brands/${brand_id}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({brand}),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateBrandSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateBrandError(jsonError));
  }
}

function* createWarehouseSaga(params) {
  const { warehouse } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/warehouses`;
  const options = {
    method: 'POST',
    body: JSON.stringify(warehouse),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createWarehouseSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createWarehouseError(jsonError));
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

function* updateSlaSaga(params) {
  const { client_id, sla } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/clients/${client_id}/update-sla`;
  const options = {
    method: 'PUT',
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

function* getOrganizationsSaga(params) {
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

function* uploadLogoSaga(params) {
  const {client_id, file} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/clients/${client_id}/upload-logo`;

  const formData = new FormData();
  formData.append('file', file);

  const options = {
    method: 'PUT',
    body: formData
  };

  try {
    const response = yield call(filerequest, requestURL, options);
    yield put(uploadLogoSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(uploadLogoError(jsonError));
  }
}

function* resendInviteSaga(params) {
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

function* getVerificationLogsSaga(params) {
  const { client_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/verifications/client-logs/${client_id}`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);

    const fields = ['index', 'account_name', 'account_email', 'event', 'verified_at'];
    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(response);
    
    const fileTitle = `verification_logs_organization`
    var exportedFilenmae = fileTitle + '.csv' || 'export.csv'

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae)
    } else {
      var link = document.createElement('a')
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', exportedFilenmae)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }

    // yield put(getVerificationLogsSuccess(response));
  } catch (error) {
    console.log(error)
    //const jsonError = yield error.response ? error.response.json() : error;
    yield put(getVerificationLogsError('Error'));
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

function* revokeCollaboratorInvitationRequest() {
  yield takeLatest(REVOKE_COLLABORATOR_INVITATION_REQUEST, revokeCollaboratorInvitationSaga);
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

function* updateBrandRequest() {
  yield takeLatest(UPDATE_BRAND_REQUEST, updateBrandSaga);
}

function* addClientLocationRequest() {
  yield takeLatest(ADD_LOCATION_REQUEST, addClientLocationSaga);
}

function* createWarehouseRequest() {
  yield takeLatest(CREATE_WAREHOUSE_REQUEST, createWarehouseSaga);
}

function* deleteVenueRequest() {
  yield takeLatest(DELETE_VENUE_REQUEST, deleteVenueSaga);
}

function* updateSlaRequest() {
  yield takeLatest(UPDATE_SLA_REQUEST, updateSlaSaga);
}

function* uploadLogoRequest() {
  yield takeLatest(UPLOAD_LOGO_REQUEST, uploadLogoSaga);
}

function* resendInviteRequest() {
  yield takeLatest(RESEND_INVITE_REQUEST, resendInviteSaga);
}

function* getOrganizationsRequest() {
  yield takeLatest(GET_ORGANIZATIONS_REQUEST, getOrganizationsSaga);
}

function* addCollaboratorCreditsRequest() {
  yield takeLatest(ADD_COLLABORATOR_CREDITS_REQUEST, addCollaboratorCreditsSaga);
}

function* getVerificationLogsRequest() {
  yield takeLatest(GET_VERIFICATION_LOGS_REQUEST, getVerificationLogsSaga);
}

// Reactive saga
function* inviteClientSuccessRequest() {
  yield takeLatest(INVITE_CLIENT_SUCCESS, getClientsSaga);
}

function* createVenueSuccessRequest() {
  yield takeLatest(CREATE_VENUE_SUCCESS, getClientsSaga);
}

function* createBrandSuccessRequest() {
  yield takeLatest(CREATE_BRAND_SUCCESS, getClientsSaga);
}

function* updateBrandSuccessRequest() {
  yield takeLatest(UPDATE_BRAND_SUCCESS, getClientsSaga);
}

function* inviteCollaboratorSuccessRequest() {
  yield takeLatest(INVITE_COLLABORATOR_SUCCESS, getClientsSaga);
}

function* revokeCollaboratorInvitationSuccessRequest() {
  yield takeLatest(REVOKE_COLLABORATOR_INVITATION_SUCCESS, getClientsSaga);
}

function* deleteVenueSuccessRequest() {
  yield takeLatest(DELETE_VENUE_SUCCESS, getClientsSaga);
}

function* createWarehouseSuccesRequest() {
  yield takeLatest(CREATE_WAREHOUSE_SUCCESS, getClientsSaga);
}

function* addClientLocationSuccessRequest() {
  yield takeLatest(ADD_LOCATION_SUCCESS, getClientsSaga);
}

function* updateSlaSuccessRequest() {
  yield takeLatest(UPDATE_SLA_SUCCESS, getClientsSaga);
}

function* uploadLogoSuccessRequest() {
  yield takeLatest(UPLOAD_LOGO_SUCCESS, getClientsSaga);
}

function* resendInviteSuccessRequest() {
  yield takeLatest(RESEND_INVITE_SUCCESS, getClientsSaga);
}

function* addCollaboratorCreditsSuccessRequest() {
  yield takeLatest(ADD_COLLABORATOR_CREDITS_SUCCESS, getClientsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getClientsRequest),
    fork(inviteClientRequest),
    fork(inviteCollaboratorRequest),
    fork(revokeCollaboratorInvitationRequest),
    fork(getRolesRequest),
    fork(getLocationsRequest),
    fork(createVenueRequest),
    fork(updateBrandRequest),
    fork(createBrandRequest),
    fork(createWarehouseRequest),
    fork(deleteVenueRequest),
    fork(addClientLocationRequest),
    fork(updateSlaRequest),
    fork(uploadLogoRequest),
    fork(resendInviteRequest),
    fork(getOrganizationsRequest),
    fork(addCollaboratorCreditsRequest),
    fork(getVerificationLogsRequest),
    // Reactive
    fork(inviteClientSuccessRequest),
    fork(createVenueSuccessRequest),
    fork(inviteCollaboratorSuccessRequest),
    fork(revokeCollaboratorInvitationSuccessRequest),
    fork(deleteVenueSuccessRequest),
    fork(updateBrandSuccessRequest),
    fork(createBrandSuccessRequest),
    fork(createWarehouseSuccesRequest),
    fork(addClientLocationSuccessRequest),
    fork(updateSlaSuccessRequest),
    fork(uploadLogoSuccessRequest),
    fork(resendInviteSuccessRequest),
    fork(addCollaboratorCreditsSuccessRequest),
  ]);
}
