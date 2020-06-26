import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';
import filerequest from 'utils/filerequest';

import request from 'utils/request';

import { 
  GET_ORGANIZATION_ANALYTICS_REQUEST,
  GET_CLIENTS_REQUEST,
  GET_CLIENT_ANALYTICS_REQUEST,
  GET_ORGANIZATION_EVENTS_REQUEST,
  DOWNLOAD_EVENT_REPORT_REQUEST
} from './constants';

import {
  getOrganizationAnalyticsSuccess, getOrganizationAnalyticsError,
  getClientsSuccess, getClientsError,
  getClientsAnalyticsSuccess, getClientAnalyticsError, getOrganizationEventsSuccess, getOrganizationEventsError,
  downloadEventReportSuccess, downloadEventReportError,
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


function* getOrganizationAnalyticsSaga(params) {
  const {client_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/analytics${client_id ? `/client/${client_id}` : ''}`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getOrganizationAnalyticsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getOrganizationAnalyticsError(jsonError));
  }
}


function* getClientAnalyticsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/analytics/client`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getClientsAnalyticsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getClientAnalyticsError(jsonError));
  }
}

function* getOrganizationEventsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/organization`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getOrganizationEventsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getOrganizationEventsError(jsonError));
  }
}

function* downloadEventReportSaga(params) {
  const {event_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_id}/report`;
  const options = {
    method: 'GET',
    // responseType: 'blob' 
  };

  try {
    const response = yield call(filerequest, requestURL, options);
    console.log(typeof response)
  } catch (error) {
    console.log(error);
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(downloadEventReportError(jsonError));
  }
}

function* getOrganizationAnalyticsRequest() {
  yield takeLatest(GET_ORGANIZATION_ANALYTICS_REQUEST, getOrganizationAnalyticsSaga);
}

function* getClientsAnalyticsRequest() {
  yield takeLatest(GET_CLIENT_ANALYTICS_REQUEST, getClientAnalyticsSaga);
}

function* getClientsRequest() {
  yield takeLatest(GET_CLIENTS_REQUEST, getClientsSaga);
}

function* getOrganizationEventsRequest() {
  yield takeLatest(GET_ORGANIZATION_EVENTS_REQUEST, getOrganizationEventsSaga);
}

function* downloadEventReportRequest() {
  yield takeLatest(DOWNLOAD_EVENT_REPORT_REQUEST, downloadEventReportSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getOrganizationAnalyticsRequest),
    fork(getClientsAnalyticsRequest),
    fork(getClientsRequest),
    fork(getOrganizationEventsRequest),
    fork(downloadEventReportRequest),
  ]);
}
