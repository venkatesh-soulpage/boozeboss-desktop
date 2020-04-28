/*
 *
 * ClientContainer actions
 *
 */

import {
  ADD_CLIENT_DRAFT,
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_ERROR,
  INVITE_CLIENT_REQUEST,
  INVITE_CLIENT_SUCCESS,
  INVITE_CLIENT_ERROR,
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_ERROR,
  INVITE_COLLABORATOR_REQUEST,
  INVITE_COLLABORATOR_SUCCESS,
  INVITE_COLLABORATOR_ERROR,
  DISMISS,
  CREATE_VENUE_REQUEST,
  CREATE_VENUE_SUCCESS,
  CREATE_VENUE_ERROR,
  DELETE_VENUE_REQUEST,
  DELETE_VENUE_SUCCESS,
  DELETE_VENUE_ERROR,
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_ERROR,
  CREATE_WAREHOUSE_REQUEST,
  CREATE_WAREHOUSE_SUCCESS,
  CREATE_WAREHOUSE_ERROR,
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
} from './constants';

export function addClientDraft() {
  return {
    type: ADD_CLIENT_DRAFT,
  };
}

/* GET CLIENTS */
export function getClients() {
  return {
    type: GET_CLIENTS_REQUEST,
  };
}

export function getClientsSuccess(clients) {
  return {
    type: GET_CLIENTS_SUCCESS,
    clients,
  };
}

export function getClientsError(error) {
  return {
    type: GET_CLIENTS_ERROR,
    error,
  };
}

/* CREATE CLIENT */
export function inviteClient(client) {
  return {
    type: INVITE_CLIENT_REQUEST,
    client,
  };
}

export function inviteClientSuccess(client) {
  return {
    type: INVITE_CLIENT_SUCCESS,
    client,
  };
}

export function inviteClientError(error) {
  return {
    type: INVITE_CLIENT_ERROR,
    error,
  };
}

/* INVITE COLLABORATOR */
export function inviteCollaborator(collaborator) {
  return {
    type: INVITE_COLLABORATOR_REQUEST,
    collaborator,
  };
}

export function inviteCollaboratorSuccess(success) {
  return {
    type: INVITE_COLLABORATOR_SUCCESS,
    success
  };
}

export function inviteCollaboratorError(error) {
  return {
    type: INVITE_COLLABORATOR_ERROR,
    error,
  };
}

/* GET ROLES */
export function getRoles() {
  return {
    type: GET_ROLES_REQUEST,
  };
}

export function getRolesSuccess(roles) {
  return {
    type: GET_ROLES_SUCCESS,
    roles,
  };
}

export function getRolesError(error) {
  return {
    type: GET_ROLES_ERROR,
    error,
  };
}

/* CREATE VENUE */
export function createVenue(venue) {
  return {
    type: CREATE_VENUE_REQUEST,
    venue
  };
}

export function createVenueSuccess(success) {
  return {
    type: CREATE_VENUE_SUCCESS,
    success
  };
}

export function createVenueError(error) {
  return {
    type: CREATE_VENUE_ERROR,
    error,
  };
}

/* CREATE BRAND */
export function createBrand(brand) {
  return {
    type: CREATE_BRAND_REQUEST,
    brand
  };
}

export function createBrandcSuccess(success) {
  return {
    type: CREATE_BRAND_SUCCESS,
    success
  };
}

export function createBrandError(error) {
  return {
    type: CREATE_BRAND_ERROR,
    error,
  };
}

/* CREATE WAREHOUSE */
export function createWarehouse(warehouse) {
  return {
    type: CREATE_WAREHOUSE_REQUEST,
    warehouse
  };
}

export function createWarehouseSuccess(success) {
  return {
    type: CREATE_WAREHOUSE_SUCCESS,
    success
  };
}

export function createWarehouseError(error) {
  return {
    type: CREATE_WAREHOUSE_ERROR,
    error,
  };
}

/* DELETE VENUE */
export function deleteVenue(venue_id) {
  return {
    type: DELETE_VENUE_REQUEST,
    venue_id
  };
}

export function deleteVenueSuccess(success) {
  return {
    type: DELETE_VENUE_SUCCESS,
    success
  };
}

export function deleteVenueError(error) {
  return {
    type: DELETE_VENUE_ERROR,
    error,
  };
}

/* GET Locations */
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

/* POST Locations */
export function addClientLocation(client_id, location_id) {
  return {
    type: ADD_LOCATION_REQUEST,
    client_id,
    location_id
  };
}

export function addClientLocationSuccess(success) {
  return {
    type: ADD_LOCATION_SUCCESS,
    success,
  };
}

export function addClientLocationError(error) {
  return {
    type: ADD_LOCATION_ERROR,
    error,
  };
}


// Dismiss success and error messages
export function dismiss(dismiss_type) {
  return {
    type: DISMISS,
    dismiss_type,
  };
}
