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
  RESEND_INVITE_ORGANIZATIONS_REQUEST, RESEND_INVITE_ORGANIZATIONS_SUCCESS, RESEND_INVITE_ORGANIZATIONS_ERROR, 
  RESEND_INVITE_REQUEST, RESEND_INVITE_SUCCESS, RESEND_INVITE_ERROR
} from './constants';

import { Alert } from 'rsuite';

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
  Alert.success(success, 2000);
  return {
    type: INVITE_ORGANIZATIONS_SUCCESS,
    success
  };
}

export function inviteOrganizationError(error) {
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
  Alert.success(success, 2000);
  return {
    type: RESEND_INVITE_SUCCESS,
    success
  };
}

export function resendInviteCollaboratorError(error) {
  return {
    type: RESEND_INVITE_ERROR,
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
