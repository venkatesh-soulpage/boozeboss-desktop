import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { AGENCY_SIGNUP_REQUEST, GET_SLA_REQUEST } from './constants';
import { agencySignupSuccess, agencySignupError, getSlaSuccess, getSlaError } from './actions';
import { authenticate, getUser } from '../App/actions';

function* agencySignupSaga(params) {
  const { auth } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/auth/agency-signup`;
  const options = {
    method: 'POST',
    body: JSON.stringify(auth),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(agencySignupSuccess(response));
    yield put(getUser());
    yield put(authenticate(response.token));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(agencySignupError(jsonError));
  }
}

function* getSlaSaga(params) {
  const { agency_id } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/agencies/${agency_id}/sla`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getSlaSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getSlaError(jsonError));
  }
}

function* agencySignupRequest() {
  yield takeLatest(AGENCY_SIGNUP_REQUEST, agencySignupSaga);
}

function* getSlaRequest() {
  yield takeLatest(GET_SLA_REQUEST, getSlaSaga);
}

export default function* rootSaga() {
  yield all([
    fork(agencySignupRequest),
    fork(getSlaRequest),
  ]);
}
