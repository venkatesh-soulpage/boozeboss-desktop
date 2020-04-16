import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { GET_BRIEFS_REQUEST, CREATE_BRIEF_REQUEST } from './constants';
import {
  getBriefsSuccess, getBriefsError,
  createBriefSuccess, createBriefError
} from './actions';

function* getBriefsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getBriefsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getBriefsError(jsonError));
  }
}

function* createBriefSaga(params) {
  const {brief} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/briefs`;
  const options = {
    method: 'POST',
    body: JSON.stringify(brief)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createBriefSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createBriefError(jsonError));
  }
}


function* getBriefsRequest() {
  yield takeLatest(GET_BRIEFS_REQUEST, getBriefsSaga);
}

function* createBriefRequest() {
  yield takeLatest(CREATE_BRIEF_REQUEST, createBriefSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getBriefsRequest),
    fork(createBriefRequest),
  ]);
}
