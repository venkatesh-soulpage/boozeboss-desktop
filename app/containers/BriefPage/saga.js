import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';
import filerequest from 'utils/filerequest';

import { 
  GET_BRIEFS_REQUEST, 
  CREATE_BRIEF_REQUEST, CREATE_BRIEF_SUCCESS,
  DELETE_BRIEF_REQUEST, DELETE_BRIEF_SUCCESS,
  GET_VENUES_REQUEST, 
  CREATE_BRIEF_EVENT_REQUEST, CREATE_BRIEF_EVENT_SUCCESS, 
  UPDATE_BRIEF_STATUS_REQUEST, UPDATE_BRIEF_STATUS_SUCCESS, 
  GET_AGENCIES_REQUEST, 
  GET_BRANDS_REQUEST, 
  CREATE_REQUISITION_REQUEST, CREATE_REQUISITION_SUCCESS, 
  UPLOAD_BRIEF_ATTACHMENT_REQUEST, UPLOAD_BRIEF_ATTACHMENT_SUCCESS, 
  DELETE_BRIEF_ATTACHMENT_REQUEST, DELETE_BRIEF_ATTACHMENT_SUCCESS, 
  UPDATE_BRIEF_EVENT_REQUEST, UPDATE_BRIEF_EVENT_SUCCESS, 
  DELETE_BRIEF_EVENT_REQUEST, DELETE_BRIEF_EVENT_SUCCESS, 
  HELLOSIGN_GET_TEMPLATE_REQUEST,
  CREATE_BRIEF_BRAND_REQUEST,CREATE_BRIEF_BRAND_SUCCESS,
  DELETE_BRIEF_BRAND_REQUEST, DELETE_BRIEF_BRAND_SUCCESS 
} from './constants';

import {
  getBriefsSuccess, getBriefsError,
  createBriefSuccess, createBriefError, 
  deleteBriefSuccess, deleteBriefError, 
  getVenuesSuccess, getVenuesError,
  createBriefEventSuccess, createBriefEventError, 
  updateBriefStatusSuccess, updateBriefStatusError, 
  getAgenciesSuccess, getAgenciesError, 
  createBriefProductSuccess, createBriefProductError, 
  getBrandsSuccess, getBrandsError, 
  deleteBriefProductSuccess, deleteBriefProductError, 
  createRequisitionSuccess, createRequisitionError, 
  uploadBriefAttachmentSuccess, uploadBriefAttachmentError, 
  deleteBriefAttachmentSuccess, deleteBriefAttachmentError,
  updateBriefEventSuccess, updateBriefEventError, 
  deleteBriefEventSuccess, deleteBriefEventError, hellosignGetTemplate, hellosignGetTemplateError, hellosignGetTemplateSuccess, createBriefBrandSuccess, createBriefBrandError, deleteBriefBrandSuccess, deleteBriefBrandError
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

function* getBrandsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/brands`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getBrandsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getBrandsError(jsonError));
  }
}

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


function* createBriefEventSaga(params) {
  const {brief_id, briefEvent} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/add-event`;
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

function* updateBriefEventSaga(params) {
  const {brief_id, brief_event_id, briefEvent} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/update-event/${brief_event_id}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(briefEvent)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateBriefEventSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateBriefEventError(jsonError));
  }
}

function* deleteBriefEventSaga(params) {
  const {brief_id, brief_event_id, briefEvent} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/delete-event/${brief_event_id}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(deleteBriefEventSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(deleteBriefEventError(jsonError));
  }
}

function* createBriefBrandSaga(params) {
  const {brief_id, briefBrand} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/add-brand`;
  const options = {
    method: 'POST',
    body: JSON.stringify(briefBrand)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createBriefBrandSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createBriefBrandError(jsonError));
  }
}

function* deleteBriefBrandSaga(params) {
  const {brief_id, brief_brand_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/delete-brand/${brief_brand_id}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(deleteBriefBrandSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(deleteBriefBrandError(jsonError));
  }
}

function* updateBriefStatusSaga(params) {
  const {brief_id, status} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/update-status`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({status})
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateBriefStatusSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateBriefStatusError(jsonError));
  }
}

function* createRequisitionSaga(params) {
  const {brief_id, history} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/requisitions`;
  const options = {
    method: 'POST',
    body: JSON.stringify({brief_id})
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createRequisitionSuccess(response));
    history.push({
      pathname: '/requisitions',
    })
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createRequisitionError(jsonError));
  }
}

function* uploadBriefAttachmentSaga(params) {
  const {brief_id, file} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/upload-attachment`;

  const formData = new FormData();
  formData.append('file', file);

  const options = {
    method: 'POST',
    body: formData
  };

  try {
    const response = yield call(filerequest, requestURL, options);
    yield put(uploadBriefAttachmentSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(uploadBriefAttachmentError(jsonError));
  }
}

function* deleteBriefAttachmentSaga(params) {
  const {brief_id, brief_attachment_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/${brief_id}/delete-attachment/${brief_attachment_id}`;

  const options = {
    method: 'DELETE',
  };

  try {
    const response = yield call(filerequest, requestURL, options);
    yield put(deleteBriefAttachmentSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(deleteBriefAttachmentError(jsonError));
  }
}

function* hellosignGetTemplateSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs/hellosign`;

  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(filerequest, requestURL, options);
    yield put(hellosignGetTemplateSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(hellosignGetTemplateError(jsonError));
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

function* getBrandsRequest() {
  yield takeLatest(GET_BRANDS_REQUEST, getBrandsSaga);
}

function* getAgenciesRequest() {
  yield takeLatest(GET_AGENCIES_REQUEST, getAgenciesSaga);
}

function* createBriefEventRequest() {
  yield takeLatest(CREATE_BRIEF_EVENT_REQUEST, createBriefEventSaga);
}

function* deleteBriefEventRequest() {
  yield takeLatest(DELETE_BRIEF_EVENT_REQUEST, deleteBriefEventSaga);
}

function* updateBriefEventRequest() {
  yield takeLatest(UPDATE_BRIEF_EVENT_REQUEST, updateBriefEventSaga);
}

function* createBriefBrandRequest() {
  yield takeLatest(CREATE_BRIEF_BRAND_REQUEST, createBriefBrandSaga);
}

function* deleteBriefBrandRequest() {
  yield takeLatest(DELETE_BRIEF_BRAND_REQUEST, deleteBriefBrandSaga);
}

function* updateBriefStatusRequest() {
  yield takeLatest(UPDATE_BRIEF_STATUS_REQUEST, updateBriefStatusSaga);
}

function* createRequisitionRequest() {
  yield takeLatest(CREATE_REQUISITION_REQUEST, createRequisitionSaga);
}

function* uploadBriefAttachmentRequest() {
  yield takeLatest(UPLOAD_BRIEF_ATTACHMENT_REQUEST, uploadBriefAttachmentSaga);
}

function* deleteBriefAttachmentRequest() {
  yield takeLatest(DELETE_BRIEF_ATTACHMENT_REQUEST, deleteBriefAttachmentSaga);
}

function* hellosignGetTemplateRequest() {
  yield takeLatest(HELLOSIGN_GET_TEMPLATE_REQUEST, hellosignGetTemplateSaga);
}

// Reactive Saga
function* createBriefSuccessRequest() {
  yield takeLatest(CREATE_BRIEF_SUCCESS, getBriefsSaga);
}

function* deleteBriefSuccessRequest() {
  yield takeLatest(DELETE_BRIEF_SUCCESS, getBriefsSaga);
}

function* createBriefEventSuccessRequest() {
  yield takeLatest(CREATE_BRIEF_EVENT_SUCCESS, getBriefsSaga);
}

function* updateBriefEventSuccessRequest() {
  yield takeLatest(UPDATE_BRIEF_EVENT_SUCCESS, getBriefsSaga);
}

function* deleteBriefEventSuccessRequest() {
  yield takeLatest(DELETE_BRIEF_EVENT_SUCCESS, getBriefsSaga);
}

function* createBriefBrandSuccessRequest() {
  yield takeLatest(CREATE_BRIEF_BRAND_SUCCESS, getBriefsSaga);
}

function* deleteBriefBrandSuccessRequest() {
  yield takeLatest(DELETE_BRIEF_BRAND_SUCCESS, getBriefsSaga);
}

function* updateBriefStatusSuccessRequest() {
  yield takeLatest(UPDATE_BRIEF_STATUS_SUCCESS, getBriefsSaga);
}

function* createRequisitionSuccessRequest() {
  yield takeLatest(CREATE_REQUISITION_SUCCESS, getBriefsSaga);
}

function* uploadBriefAttachmentSuccessRequest() {
  yield takeLatest(UPLOAD_BRIEF_ATTACHMENT_SUCCESS, getBriefsSaga);
}

function* deleteBriefAttachmentSuccessRequest() {
  yield takeLatest(DELETE_BRIEF_ATTACHMENT_SUCCESS, getBriefsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(createBriefSuccessRequest),
    fork(getBriefsRequest),
    fork(createBriefRequest),
    fork(deleteBriefRequest),
    fork(getVenuesRequest),
    fork(getBrandsRequest),
    fork(getAgenciesRequest),
    fork(createBriefEventRequest),
    fork(updateBriefEventRequest),
    fork(deleteBriefEventRequest),
    fork(createBriefBrandRequest),
    fork(deleteBriefBrandRequest),
    fork(updateBriefStatusRequest),
    fork(createRequisitionRequest),
    fork(uploadBriefAttachmentRequest),
    fork(deleteBriefAttachmentRequest),
    fork(hellosignGetTemplateRequest),
    // Reactive
    fork(deleteBriefSuccessRequest),
    fork(createBriefEventSuccessRequest),
    fork(createBriefBrandSuccessRequest),
    fork(deleteBriefBrandSuccessRequest),
    fork(updateBriefStatusSuccessRequest),
    fork(createRequisitionSuccessRequest),
    fork(uploadBriefAttachmentSuccessRequest),
    fork(deleteBriefAttachmentSuccessRequest),
    fork(updateBriefEventSuccessRequest),
    fork(deleteBriefEventSuccessRequest),
  ]);
}
