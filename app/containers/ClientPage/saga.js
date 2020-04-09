import {
  call, put, select, takeLatest, fork, all
} from 'redux-saga/effects';

import request from 'utils/request'

import { GET_CLIENTS_REQUEST, INVITE_CLIENT_REQUEST } from './constants'
import { getClientsSuccess, getClientsError, inviteClientSuccess, inviteClientError } from './actions'

function* getClientsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/clients`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getClientsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getClientsError(jsonError));
  }
}

function* inviteClientSaga(params) {
  const {client} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/clients/invite`;
  const options = {
    method: 'POST',
    body: JSON.stringify(client),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(inviteClientSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(inviteClientError(jsonError));
  }
}

function* getClientsRequest() {
  yield takeLatest(GET_CLIENTS_REQUEST, getClientsSaga);
}

function* inviteClientRequest() {
  yield takeLatest(INVITE_CLIENT_REQUEST, inviteClientSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getClientsRequest),
    fork(inviteClientRequest),
  ]);
}