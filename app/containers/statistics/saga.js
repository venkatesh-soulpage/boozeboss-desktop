import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { VENUE_COUNT_REQUEST } from './constants';

import { getVenueStatisticsError, getVenueStatisticsSuccess } from './actions';

function* getVenueStatsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/statistics`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getVenueStatisticsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getVenueStatisticsError(jsonError));
  }
}

function* getVenueStatsRequest() {
  yield takeLatest(VENUE_COUNT_REQUEST, getVenueStatsSaga);
}

export default function* rootSaga() {
  yield all([fork(getVenueStatsRequest)]);
}
