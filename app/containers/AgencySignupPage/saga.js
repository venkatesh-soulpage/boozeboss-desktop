import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { AGENCY_SIGNUP_REQUEST } from './constants';
import { agencySignupSuccess, agencySignupError } from './actions';
import { authenticate } from '../App/actions';

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
    yield put(authenticate(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(agencySignupError(jsonError));
  }
}

function* agencySignupRequest() {
  yield takeLatest(AGENCY_SIGNUP_REQUEST, agencySignupSaga);
}

export default function* rootSaga() {
  yield all([fork(agencySignupRequest)]);
}
