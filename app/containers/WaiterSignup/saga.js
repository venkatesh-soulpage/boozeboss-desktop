/* eslint-disable camelcase */
import { call, put, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { SIGNUP_REQUEST } from './constants';
import { signupSuccess, signupError } from './actions';
// import { authenticate, getUser } from '../App/actions';

function* waiterSignupSaga(params) {
  const { auth } = params;
  const { outlet_event, outlet_venue } = auth;

  let requestURL;

  if (outlet_event) {
    requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
      process.env.API_PORT
    }/api/auth/outlet-event/${outlet_event}/waiter-signup`;
  } else if (outlet_venue) {
    requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
      process.env.API_PORT
    }/api/auth/outlet-venue/${outlet_venue}/waiter-signup`;
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(auth),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(signupSuccess(response));
    // yield put(getUser());
    // yield put(authenticate(response.token));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(signupError(jsonError));
  }
}

function* waiterSignupRequest() {
  yield takeLatest(SIGNUP_REQUEST, waiterSignupSaga);
}

export default function* rootSaga() {
  yield all([fork(waiterSignupRequest)]);
}
