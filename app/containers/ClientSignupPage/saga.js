import {
  call, put, select, takeLatest, fork, all
} from 'redux-saga/effects';

import request from 'utils/request'

import { CLIENT_SIGNUP_REQUEST } from './constants'
import { clientSignupSuccess, clientSignupError } from './actions'
import { authenticate, getUser } from '../App/actions'

function* clientSignupSaga(params) {
  const {auth} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/auth/client-signup`;
  const options = {
    method: 'POST',
    body: JSON.stringify(auth),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(clientSignupSuccess(response));
    yield put(getUser());
    yield put(authenticate(response.token));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(clientSignupError(jsonError));
  }
}

function* clientSignupRequest() {
  yield takeLatest(CLIENT_SIGNUP_REQUEST, clientSignupSaga);
}

export default function* rootSaga() {
  yield all([
    fork(clientSignupRequest),
  ]);
}