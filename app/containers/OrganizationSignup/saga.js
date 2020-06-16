import {
  call, put, select, takeLatest, fork, all
} from 'redux-saga/effects';

import request from 'utils/request'

import { SIGNUP_REQUEST } from './constants'
import { signupSuccess, signupError } from './actions'
import { authenticate, getUser } from '../App/actions'

function* organizationSignupSaga(params) {
  const {auth} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/auth/organization-signup`;
  const options = {
    method: 'POST',
    body: JSON.stringify(auth),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(signupSuccess(response));
    yield put(getUser());
    yield put(authenticate(response.token));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(signupError(jsonError));
  }
}

function* organizationSignupRequest() {
  yield takeLatest(SIGNUP_REQUEST, organizationSignupSaga);
}

export default function* rootSaga() {
  yield all([
    fork(organizationSignupRequest),
  ]);
}