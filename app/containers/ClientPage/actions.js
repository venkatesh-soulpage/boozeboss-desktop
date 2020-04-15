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

// Dismiss success and error messages
export function dismiss(dismiss_type) {
  return {
    type: DISMISS,
    dismiss_type,
  };
}
