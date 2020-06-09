/*
 *
 * AgencyPage actions
 *
 */

import { 
  ADD_AGENCY_DRAFT,
  GET_AGENCIES_REQUEST, GET_AGENCIES_SUCCESS, GET_AGENCIES_ERROR,
  INVITE_AGENCY_REQUEST, INVITE_AGENCY_SUCCESS, INVITE_AGENCY_ERROR,
  INVITE_COLLABORATOR_REQUEST, INVITE_COLLABORATOR_SUCCESS, INVITE_COLLABORATOR_ERROR,
  GET_ROLES_REQUEST, GET_ROLES_SUCCESS, GET_ROLES_ERROR, 
  DISMISS,
  REVOKE_COLLABORATOR_INVITATION_REQUEST,
  REVOKE_COLLABORATOR_INVITATION_SUCCESS,
  REVOKE_COLLABORATOR_INVITATION_ERROR
 } from './constants';

 import { Alert } from 'rsuite';

 export function addAgencyDraft() {
  return {
    type: ADD_AGENCY_DRAFT,
  };
}

/* GET CLIENT AGENCIES */
export function getAgencies() {
  return {
    type: GET_AGENCIES_REQUEST,
  };
}

export function getAgenciesSuccess(agencies) {
  return {
    type: GET_AGENCIES_SUCCESS,
    agencies,
  };
}

export function getAgenciesError(error) {
  return {
    type: GET_AGENCIES_ERROR,
    error,
  };
}

/* CREATE AGENCY */
export function inviteAgency(agency) {
  return {
    type: INVITE_AGENCY_REQUEST,
    agency,
  };
}

export function inviteAgencySuccess(agency) {
  return {
    type: INVITE_AGENCY_SUCCESS,
    agency,
  };
}

export function inviteAgencyError(error) {
  Alert.error(error);
  return {
    type: INVITE_AGENCY_ERROR,
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

/* REVOKE COLLABORATOR */
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
  Alert.error(error);
  return {
    type: GET_ROLES_ERROR,
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

