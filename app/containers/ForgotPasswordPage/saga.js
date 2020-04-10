import {
  call, put, select, takeLatest, fork, all
} from 'redux-saga/effects';

import request from 'utils/request'

import { FORGOT_PASSWORD_REQUEST } from './constants'
import { forgotSuccess, forgotError } from './actions'

function* forgotSaga(params) {
  const {email} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/auth/forgot`;
  const options = {
    method: 'POST',
    body: JSON.stringify({email}),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(forgotSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(forgotError(jsonError));
  }
}

function* forgotRequest() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotSaga);
}

export default function* rootSaga() {
  yield all([
    fork(forgotRequest),
  ]);
}