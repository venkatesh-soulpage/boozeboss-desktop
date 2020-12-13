/*
 *
 * EventsPage actions
 *
 */
import status from 'utils/status';

import {
  ADD_VENUE_DRAFT,
  ADD_VENUE_REQUEST,
  ADD_VENUE_SUCCESS,
  ADD_VENUE_ERROR,
  GET_VENUES_REQUEST,
  GET_VENUES_SUCCESS,
  GET_VENUES_ERROR,
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  ADD_MENU_ERROR,
} from './constants';

export function addOutletVenueDraft() {
  return {
    type: ADD_VENUE_DRAFT,
  };
}

export function getVenuesRequest() {
  return {
    type: GET_VENUES_REQUEST,
  };
}

export function getVenuesSuccess(venues) {
  return {
    type: GET_VENUES_SUCCESS,
    venues,
  };
}

export function getVenuesError(error) {
  return {
    type: GET_VENUES_ERROR,
    error,
  };
}

export function addVenueRequest(venue) {
  return {
    type: ADD_VENUE_REQUEST,
    venue,
  };
}

export function addVenueSuccess(success) {
  status(success, 'success');
  return {
    type: ADD_VENUE_SUCCESS,
    success,
  };
}

export function addVenueError(error) {
  status(error, 'error');
  return {
    type: ADD_VENUE_ERROR,
    error,
  };
}

export function getLocationsRequest() {
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

export function addMenuRequest(venueId, menu) {
  return {
    type: ADD_MENU_REQUEST,
    venueId,
    menu,
  };
}

export function addMenuSuccess(menu) {
  status(menu, 'success');
  return {
    type: ADD_MENU_SUCCESS,
    menu,
  };
}

export function addMenuError(error) {
  status(error, 'error');
  return {
    type: ADD_MENU_ERROR,
    error,
  };
}
