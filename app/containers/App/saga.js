import { call, put, select, takeLatest, fork, all, delay, race, take } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_USER_REQUEST,
  REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR
} from './constants';

import {
  getUserSuccess, getUserError,
  refreshToken, refreshTokenSuccess, refreshTokenError,
  logout
} from './actions';

import { monitorableAction, getSuccessType, getFailType } from './monitor'

/* Monitor Saga*/
function* monitorSaga(monitoredAction) {

  const { fail } = yield race({
    success: take(getSuccessType(monitoredAction)),
    fail: take(getFailType(monitoredAction)),
  })

  if (fail && fail.error && fail.error.status === 401) {
    yield put(refreshToken())

    const { success } = yield race({
      success: take(REFRESH_TOKEN_SUCCESS),
      fail: take(REFRESH_TOKEN_ERROR),
    }) 

    if (success) {
      yield put(monitoredAction)
    } else {
      yield put(logout())
    }
  }
} 

/**
 * Refresh token handler
 */
export function* refreshTokenSaga() {
  
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/auth/refresh-token`;
  const refresh_token = localStorage.getItem('refresh_token');

  const options = {
    method: 'POST',
    body: JSON.stringify({refresh_token}),
  }

  try {
    const response = yield call(request, requestURL, options);
    yield put(refreshTokenSuccess(response));
  } catch (err) {
    yield put(refreshTokenError(err.response));
  }
}

function* getUserSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/accounts/me`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getUserSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getUserError(jsonError));
  }
}

/* Monitor */
function* monitorRequest() {
  yield takeLatest(monitorableAction, monitorSaga);
}

function* refreshTokenRequest() {
  yield takeLatest(REFRESH_TOKEN_REQUEST, refreshTokenSaga);
}

/* App */
function* getUserRequest() {
  yield takeLatest(GET_USER_REQUEST, getUserSaga);
}

export default function* rootSaga() {
  yield all([
    /* Monitor */
    fork(monitorRequest),
    fork(refreshTokenRequest),
    /* App */
    fork(getUserRequest)
  ]);
}
