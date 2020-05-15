import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_VERIFICATIONS_REQUEST, UPDATE_VERIFICATION_STATUS_REQUEST, UPDATE_VERIFICATION_STATUS_SUCCESS
} from './constants';

import {
  getVerificationsSuccess, getVerificationsError, updateVerificationStatusSuccess, updateVerificationStatusError
} from './actions';

function* getVerificationsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/verifications`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getVerificationsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getVerificationsError(jsonError));
  }
}

function* updateVerificationStatusSaga(params) {
  const {account_id, age_verification_status} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/verifications/${account_id}/update-status`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({age_verification_status}),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateVerificationStatusSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateVerificationStatusError(jsonError));
  }
}

function* getVerificationsRequest() {
  yield takeLatest(GET_VERIFICATIONS_REQUEST, getVerificationsSaga);
}

function* updateVerificationStatusRequest() {
  yield takeLatest(UPDATE_VERIFICATION_STATUS_REQUEST, updateVerificationStatusSaga);
}

//Reactive
function* updateVerificationStatusSuccessRequest() {
  yield takeLatest(UPDATE_VERIFICATION_STATUS_SUCCESS, getVerificationsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getVerificationsRequest),
    fork(updateVerificationStatusRequest),
    // Verification
    fork(updateVerificationStatusSuccessRequest),
  ]);
}
