import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { GET_AGENCIES_REQUEST, INVITE_AGENCY_REQUEST } from './constants';
import {
  getAgenciesSuccess, getAgenciesError,
  inviteAgencySuccess, inviteAgencyError
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

function* getAgenciesRequest() {
  yield takeLatest(GET_AGENCIES_REQUEST, getAgenciesSaga);
}

function* inviteAgencyRequest() {
  yield takeLatest(INVITE_AGENCY_REQUEST, inviteAgencySaga);
}

export default function* rootSaga() {
  yield all([
    fork(getAgenciesRequest),
    fork(inviteAgencyRequest)
  ]);
}
