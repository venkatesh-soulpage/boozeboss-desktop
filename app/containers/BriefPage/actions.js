/*
 *
 * BriefPage actions
 *
 */

import { 
  ADD_BRIEF_DRAFT, DELETE_BRIEF_DRAFT,
  GET_BRIEFS_REQUEST, GET_BRIEFS_SUCCESS, GET_BRIEFS_ERROR, 
  CREATE_BRIEF_REQUEST, CREATE_BRIEF_SUCCESS, CREATE_BRIEF_ERROR,
  DELETE_BRIEF_REQUEST, DELETE_BRIEF_SUCCESS, DELETE_BRIEF_ERROR,
  GET_VENUES_REQUEST, GET_VENUES_SUCCESS, GET_VENUES_ERROR,
  DISMISS,
  CREATE_BRIEF_EVENT_SUCCESS,
  CREATE_BRIEF_EVENT_ERROR,
  CREATE_BRIEF_EVENT_REQUEST,
  UPDATE_BRIEF_STATUS_REQUEST,
  UPDATE_BRIEF_STATUS_SUCCESS,
  UPDATE_BRIEF_STATUS_ERROR, 
} from './constants';

export function addBriefDraft() {
  return {
    type: ADD_BRIEF_DRAFT,
  };
}

export function deleteBriefDraft() {
  return {
    type: DELETE_BRIEF_DRAFT,
  };
}

// GET Briefs
export function getBriefs() {
  return {
    type: GET_BRIEFS_REQUEST,
  };
}

export function getBriefsSuccess(briefs) {
  return {
    type: GET_BRIEFS_SUCCESS,
    briefs
  };
}

export function getBriefsError(error) {
  return {
    type: GET_BRIEFS_ERROR,
    error
  };
}

// CREATE Brief
export function createBrief(brief) {
  return {
    type: CREATE_BRIEF_REQUEST,
    brief
  };
}

export function createBriefSuccess(new_brief) {
  return {
    type: CREATE_BRIEF_SUCCESS,
    new_brief
  };
}

export function createBriefError(error) {
  return {
    type: CREATE_BRIEF_ERROR,
    error
  };
}

// DELETE Brief
export function deleteBrief(brief_id) {
  return {
    type: DELETE_BRIEF_REQUEST,
    brief_id
  };
}

export function deleteBriefSuccess(success) {
  return {
    type: DELETE_BRIEF_SUCCESS,
    success
  };
}

export function deleteBriefError(error) {
  return {
    type: DELETE_BRIEF_ERROR,
    error
  };
}

// GET Venues
export function getVenues() {
  return {
    type: GET_VENUES_REQUEST,
  };
}

export function getVenuesSuccess(venues) {
  return {
    type: GET_VENUES_SUCCESS,
    venues
  };
}

export function getVenuesError(error) {
  return {
    type: GET_VENUES_ERROR,
    error
  };
}

// CREATE Brief
export function createBriefEvent(brief_id, briefEvent) {
  return {
    type: CREATE_BRIEF_EVENT_REQUEST,
    brief_id,
    briefEvent,
  };
}

export function createBriefEventSuccess(success) {
  return {
    type: CREATE_BRIEF_EVENT_SUCCESS,
    success
  };
}

export function createBriefEventError(error) {
  return {
    type: CREATE_BRIEF_EVENT_ERROR,
    error
  };
}

// Update Brief status
export function updateBriefStatus(brief_id, status) {
  return {
    type: UPDATE_BRIEF_STATUS_REQUEST,
    brief_id,
    status
  };
}

export function updateBriefStatusSuccess(success) {
  return {
    type: UPDATE_BRIEF_STATUS_SUCCESS,
    success
  };
}

export function updateBriefStatusError(error) {
  return {
    type: UPDATE_BRIEF_STATUS_ERROR,
    error
  };
}


// Dismiss success and error messages
export function dismiss(dismiss_type) {
  return {
    type: DISMISS,
    dismiss_type,
  };
}

