/*
 *
 * BriefPage actions
 *
 */

import { 
  ADD_BRIEF_DRAFT, 
  GET_BRIEFS_REQUEST, GET_BRIEFS_SUCCESS, GET_BRIEFS_ERROR, 
  CREATE_BRIEF_REQUEST, CREATE_BRIEF_SUCCESS, CREATE_BRIEF_ERROR,
} from './constants';

export function addBriefDraft() {
  return {
    type: ADD_BRIEF_DRAFT,
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
