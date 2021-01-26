/*
 *
 * StatisticsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  VENUE_COUNT_REQUEST,
  VENUE_COUNT_SUCCESS,
  VENUE_COUNT_ERROR,
} from './constants';

export const initialState = fromJS({
  venueData: null,
  eventData: null,
  isLoading: false,
  success: null,
  error: null,
});

function statisticsPageReducer(state = initialState, action) {
  switch (action.type) {
    case VENUE_COUNT_REQUEST:
      return state;
    case VENUE_COUNT_SUCCESS:
      return state
        .set('venueData', action.statistics.venues)
        .set('eventData', action.statistics.events);
    case VENUE_COUNT_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default statisticsPageReducer;
