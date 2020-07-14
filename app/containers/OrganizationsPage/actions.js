/*
 *
 * OrganizationsPage actions
 *
 */

import { 
  ADD_ORGANIZATION_DRAFT,
  GET_ORGANIZATIONS_REQUEST, GET_ORGANIZATIONS_SUCCESS, GET_ORGANIZATIONS_ERROR,
  GET_LOCATIONS_REQUEST, GET_LOCATIONS_SUCCESS, GET_LOCATIONS_ERROR, 
  INVITE_ORGANIZATIONS_REQUEST, INVITE_ORGANIZATIONS_SUCCESS, INVITE_ORGANIZATIONS_ERROR,
  RESEND_INVITE_REQUEST, RESEND_INVITE_SUCCESS, RESEND_INVITE_ERROR, 
  SELECT_PRIMARY_LOCATION_REQUEST, SELECT_PRIMARY_LOCATION_SUCCESS, SELECT_PRIMARY_LOCATION_ERROR,
  UPDATE_SLA_REQUEST, UPDATE_SLA_SUCCESS, UPDATE_SLA_ERROR,
  GET_ROLES_ERROR, GET_ROLES_REQUEST, GET_ROLES_SUCCESS,
  INVITE_COLLABORATOR_REQUEST, INVITE_COLLABORATOR_SUCCESS, INVITE_COLLABORATOR_ERROR,
  REVOKE_COLLABORATOR_INVITE_REQUEST, REVOKE_COLLABORATOR_INVITE_SUCCESS, REVOKE_COLLABORATOR_INVITE_ERROR,
  ADD_COLLABORATOR_CREDITS_REQUEST, ADD_COLLABORATOR_CREDITS_SUCCESS, ADD_COLLABORATOR_CREDITS_ERROR,
  UPDATE_COLLABORATOR_PRIMARY_LOCATION_REQUEST, UPDATE_COLLABORATOR_PRIMARY_LOCATION_SUCCESS, UPDATE_COLLABORATOR_PRIMARY_LOCATION_ERROR
} from './constants';

import status from 'utils/status';

export function addOrganizationDraft () {
  return {
    type: ADD_ORGANIZATION_DRAFT
  }
}

export function getOrganizations() {
  return {
    type: GET_ORGANIZATIONS_REQUEST,
  };
}

export function getOrganizationsSuccess(organizations) {
  return {
    type: GET_ORGANIZATIONS_SUCCESS,
    organizations
  };
}

export function getOrganizationsError(error) {
  return {
    type: GET_ORGANIZATIONS_ERROR,
    error
  };
}

// Invite a new regional Organization
export function inviteOrganization(organization) {
  return {
    type: INVITE_ORGANIZATIONS_REQUEST,
    organization
  };
}

export function inviteOrganizationSuccess(success) {
  status(success, 'success');
  return {
    type: INVITE_ORGANIZATIONS_SUCCESS,
    success
  };
}

export function inviteOrganizationError(error) {
  status(error, 'error');
  return {
    type: INVITE_ORGANIZATIONS_ERROR,
    error
  };
}

/* PUT -  Update Organization sla */
export function updateSla(regional_organization_id, sla) {
  return {
    type: UPDATE_SLA_REQUEST,
    regional_organization_id,
    sla
  };
}

export function updateSlaSuccess(success) {
  status(success, 'success');
  return {
    type: UPDATE_SLA_SUCCESS,
    success,
  };
}

export function updateSlaError(error) {
  status(error, 'error');
  return {
    type: UPDATE_SLA_ERROR,
    error,
  };
}

// Resend invite collaborator
export function resendInviteCollaborator(collaborator_invitation_id) {
  return {
    type: RESEND_INVITE_REQUEST,
    collaborator_invitation_id
  };
}

export function resendInviteCollaboratorSuccess(success) {
  status(success, 'success');
  return {
    type: RESEND_INVITE_SUCCESS,
    success
  };
}

export function resendInviteCollaboratorError(error) {
  status(error, 'error');
  return {
    type: RESEND_INVITE_ERROR,
    error
  };
}

// Select Primary Location
export function selectPrimaryLocation(regional_organization_id, regional_organization_location_id) {
  return {
    type: SELECT_PRIMARY_LOCATION_REQUEST,
    regional_organization_id,
    regional_organization_location_id
  };
}

export function selectPrimaryLocationSuccess(success) {
  status(success, 'success');
  return {
    type: SELECT_PRIMARY_LOCATION_SUCCESS,
    success
  };
}

export function selectPrimaryLocationError(error) {
  status(error, 'error');
  return {
    type: SELECT_PRIMARY_LOCATION_ERROR,
    error
  };
}

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

export function getRoles() {
  return {
    type: GET_ROLES_REQUEST,
  };
}

export function getRolesSuccess(roles) {
  return {
    type: GET_ROLES_SUCCESS,
    roles
  };
}

export function getRolesError(error) {
  return {
    type: GET_ROLES_ERROR,
    error
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
  status(success, 'success');
  return {
    type: INVITE_COLLABORATOR_SUCCESS,
    success
  };
}

export function inviteCollaboratorError(error) {
  status(error, 'error');
  return {
    type: INVITE_COLLABORATOR_ERROR,
    error,
  };
}

/* REVOKE COLLABORATOR INVITATION */
export function revokeCollaboratorInvitation(collaborator_invitation_id) {
  return {
    type: REVOKE_COLLABORATOR_INVITE_REQUEST,
    collaborator_invitation_id,
  };
}

export function revokeCollaboratorInvitationSuccess(success) {
  status(success, 'success');
  return {
    type: REVOKE_COLLABORATOR_INVITE_SUCCESS,
    success
  };
}

export function revokeCollaboratorInvitationError(error) {
  status(error, 'error');
  return {
    type: REVOKE_COLLABORATOR_INVITE_ERROR,
    error,
  };
}

/* PUT -  Add credits to an organization */
export function addCollaboratorCredits(collaborator_account_id, credits_amount) {
  return {
    type: ADD_COLLABORATOR_CREDITS_REQUEST,
    collaborator_account_id,
    credits_amount
  };
}

export function addCollaboratorCreditsSuccess(success) {
  status(success, 'success');
  return {
    type: ADD_COLLABORATOR_CREDITS_SUCCESS,
    success,
  };
}

export function addCollaboratorCreditsError(error) {
  status(error, 'error');
  return {
    type: ADD_COLLABORATOR_CREDITS_ERROR,
    error,
  };
}

/* PUT -  Add credits to an organization */
export function updateCollaboratorLocation(regional_organization_id, collaborator_id, location_id) {
  return {
    type: UPDATE_COLLABORATOR_PRIMARY_LOCATION_REQUEST,
    regional_organization_id,
    collaborator_id,
    location_id
  };
}

export function updateCollaboratorLocationSuccess(success) {
  status(success, 'success');
  return {
    type: UPDATE_COLLABORATOR_PRIMARY_LOCATION_SUCCESS,
    success,
  };
}

export function updateCollaboratorLocationError(error) {
  status(error, 'error');
  return {
    type: UPDATE_COLLABORATOR_PRIMARY_LOCATION_ERROR,
    error,
  };
}
