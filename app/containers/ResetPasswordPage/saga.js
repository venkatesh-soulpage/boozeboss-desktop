import {
  call, put, select, takeLatest, fork, all
} from 'redux-saga/effects';

import request from 'utils/request'

import { RESET_PASSWORD_REQUEST } from './constants'
import { resetSuccess, resetError } from './actions'

function* resetSaga(params) {
  const {auth} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/auth/reset`;
  const options = {
    method: 'POST',
    body: JSON.stringify(auth),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(resetSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(resetError(jsonError));
  }
}

function* resetRequest() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetSaga);
}

export default function* rootSaga() {
  yield all([
    fork(resetRequest),
  ]);
}