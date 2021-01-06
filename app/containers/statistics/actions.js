/*
 *
 * AgencyPage actions
 *
 */

import {
  VENUE_COUNT_ERROR,
  VENUE_COUNT_SUCCESS,
  VENUE_COUNT_REQUEST,
} from './constants';
import status from 'utils/status';

/* GET Venue Statistics */
export function getVenueStatistics() {
  return {
    type: VENUE_COUNT_REQUEST,
  };
}

export function getVenueStatisticsSuccess(statistics) {
  return {
    type: VENUE_COUNT_SUCCESS,
    statistics,
  };
}

export function getVenueStatisticsError(error) {
  return {
    type: VENUE_COUNT_ERROR,
    error,
  };
}
