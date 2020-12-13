/* eslint-disable camelcase */
/*
 *
 * System actions
 *
 */

import status from 'utils/status';

import {
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  UPDATE_LOCATION_RATE_SUCCESS,
  UPDATE_LOCATION_RATE_REQUEST,
  UPDATE_LOCATION_RATE_ERROR,
  INVITE_OUTLET_MANAGER_REQUEST,
  INVITE_OUTLET_MANAGER_SUCCESS,
  INVITE_OUTLET_MANAGER_ERROR,
  DISMISS,
} from './constants';

export function getLocations() {
  return {
    type: GET_LOCATIONS_REQUEST,
  };
}

export function getLocationsSuccess(locations) {
  return {
    type: GET_LOCATIONS_SUCCESS,
    locations,
  };
}

export function getLocationsError(error) {
  return {
    type: GET_LOCATIONS_ERROR,
    error,
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
    success,
  };
}

export function addLocationError(error) {
  return {
    type: ADD_LOCATION_ERROR,
    error,
  };
}

export function updateLocationRate(location_id, currency_conversion) {
  return {
    type: UPDATE_LOCATION_RATE_REQUEST,
    location_id,
    currency_conversion,
  };
}

export function updateLocationRateSuccess(success) {
  status(success, 'success');
  return {
    type: UPDATE_LOCATION_RATE_SUCCESS,
    success,
  };
}

export function updateLocationRateError(error) {
  status(error, 'error');
  return {
    type: UPDATE_LOCATION_RATE_ERROR,
    error,
  };
}

export function dismiss(dismiss_type) {
  return {
    type: DISMISS,
    dismiss_type,
  };
}

export function inviteOutletManager(outlet_manager) {
  return {
    type: INVITE_OUTLET_MANAGER_REQUEST,
    outlet_manager,
  };
}

export function inviteOutletManagerSuccess(success) {
  status(success, 'success');
  return {
    type: INVITE_OUTLET_MANAGER_SUCCESS,
    success,
  };
}

export function inviteOutletManagerError(error) {
  status(error, 'error');
  return {
    type: INVITE_OUTLET_MANAGER_ERROR,
    error,
  };
}
