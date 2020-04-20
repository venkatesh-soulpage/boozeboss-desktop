/*
 *
 * System actions
 *
 */

import { 
  GET_LOCATIONS_REQUEST, GET_LOCATIONS_SUCCESS, GET_LOCATIONS_ERROR,
  ADD_LOCATION_REQUEST, ADD_LOCATION_SUCCESS, ADD_LOCATION_ERROR,
  DISMISS
} from './constants';

export function getLocations() {
  return {
    type: GET_LOCATIONS_REQUEST,
  };
}

export function getLocationsSuccess(locations) {
  return {
    type: GET_LOCATIONS_SUCCESS,
    locations
  };
}

export function getLocationsError(error) {
  return {
    type: GET_LOCATIONS_ERROR,
    error
  };
}

export function addLocation(location) {
  return {
    type: ADD_LOCATION_REQUEST,
    location,
  };
}

export function addLocationSuccess(success) {
  return {
    type: ADD_LOCATION_SUCCESS,
    success
  };
}

export function addLocationError(error) {
  return {
    type: ADD_LOCATION_ERROR,
    error
  };
}

export function dismiss(dismiss_type) {
  return {
    type: DISMISS,
    dismiss_type
  };
}
