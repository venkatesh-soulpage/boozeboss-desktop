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
  UPDATE_SLA_REQUEST,
  UPDATE_SLA_SUCCESS,
  UPDATE_SLA_ERROR,
  UPLOAD_LOGO_REQUEST,
  UPLOAD_LOGO_SUCCESS,
  UPLOAD_LOGO_ERROR,
  REVOKE_COLLABORATOR_INVITATION_REQUEST,
  REVOKE_COLLABORATOR_INVITATION_SUCCESS,
  REVOKE_COLLABORATOR_INVITATION_ERROR
} from './constants';

import { Alert } from 'rsuite';

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

export function inviteClientSuccess(success) {
  Alert.success(success);
  return {
    type: INVITE_CLIENT_SUCCESS,
    success,
  };
}

export function inviteClientError(error) {
  Alert.error(error);
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
  Alert.success(success);
  return {
    type: INVITE_COLLABORATOR_SUCCESS,
    success
  };
}

export function inviteCollaboratorError(error) {
  Alert.error(error);
  return {
    type: INVITE_COLLABORATOR_ERROR,
    error,
  };
}

/* REVOKE COLLABORATOR INVITATION */
export function revokeCollaboratorInvitation(collaborator_invitation_id) {
  return {
    type: REVOKE_COLLABORATOR_INVITATION_REQUEST,
    collaborator_invitation_id,
  };
}

export function revokeCollaboratorInvitationSuccess(success) {
  Alert.success(success);
  return {
    type: REVOKE_COLLABORATOR_INVITATION_SUCCESS,
    success
  };
}

export function revokeCollaboratorInvitationError(error) {
  Alert.error(error);
  return {
    type: REVOKE_COLLABORATOR_INVITATION_ERROR,
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
  Alert.success(success);
  return {
    type: CREATE_VENUE_SUCCESS,
    success
  };
}

export function createVenueError(error) {
  Alert.error(error);
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
  Alert.success(success);
  return {
    type: CREATE_BRAND_SUCCESS,
    success
  };
}

export function createBrandError(error) {
  Alert.error(error);
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
  Alert.success(success);
  return {
    type: CREATE_WAREHOUSE_SUCCESS,
    success
  };
}

export function createWarehouseError(error) {
  Alert.error(error);
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
  Alert.success(success);
  return {
    type: DELETE_VENUE_SUCCESS,
    success
  };
}

export function deleteVenueError(error) {
  Alert.error(error);
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
  Alert.success(success);
  return {
    type: ADD_LOCATION_SUCCESS,
    success,
  };
}

export function addClientLocationError(error) {
  Alert.error(error);
  return {
    type: ADD_LOCATION_ERROR,
    error,
  };
}

/* PUT -  Update client sla */
export function updateSla(client_id, sla) {
  return {
    type: UPDATE_SLA_REQUEST,
    client_id,
    sla
  };
}

export function updateSlaSuccess(success) {
  Alert.success(success);
  return {
    type: UPDATE_SLA_SUCCESS,
    success,
  };
}

export function updateSlaError(error) {
  Alert.error(error);
  return {
    type: UPDATE_SLA_ERROR,
    error,
  };
}

/* PUT -  Upload a logo */
export function uploadLogo(client_id, file) {
  return {
    type: UPLOAD_LOGO_REQUEST,
    client_id,
    file
  };
}

export function uploadLogoSuccess(success) {
  Alert.success(success);
  return {
    type: UPLOAD_LOGO_SUCCESS,
    success,
  };
}

export function uploadLogoError(error) {
  Alert.error(error);
  return {
    type: UPLOAD_LOGO_ERROR,
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
