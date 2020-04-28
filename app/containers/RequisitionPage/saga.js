import {
  call, put, select, takeLatest, fork, all
} from 'redux-saga/effects';

import request from 'utils/request'

import { GET_REQUISITIONS_REQUEST } from './constants'
import { getRequisitionsSuccess, getRequisitionsError } from './actions'

function* getRequisitionsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/requisitions`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getRequisitionsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getRequisitionsError(jsonError));
  }
}

function* getRequisitionsRequest() {
  yield takeLatest(GET_REQUISITIONS_REQUEST, getRequisitionsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getRequisitionsRequest),
  ]);
}