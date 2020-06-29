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
  SELECT_PRIMARY_LOCATION_REQUEST, SELECT_PRIMARY_LOCATION_SUCCESS, SELECT_PRIMARY_LOCATION_ERROR
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
