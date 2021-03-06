/*
 *
 * BriefPage actions
 *
 */

import HelloSign from 'hellosign-embedded';

const hellosign_client = new HelloSign({
  clientId: process.env.HELLOSIGN_CLIENT_ID, 
});


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
  GET_AGENCIES_REQUEST,
  GET_AGENCIES_SUCCESS,
  GET_AGENCIES_ERROR,
  GET_BRANDS_REQUEST,
  GET_BRANDS_ERROR,
  GET_BRANDS_SUCCESS,
  DELETE_BRIEF_PRODUCT_REQUEST,
  DELETE_BRIEF_PRODUCT_SUCCESS,
  DELETE_BRIEF_PRODUCT_ERROR,
  CREATE_REQUISITION_REQUEST,
  CREATE_REQUISITION_SUCCESS,
  CREATE_REQUISITION_ERROR,
  UPLOAD_BRIEF_ATTACHMENT_REQUEST,
  UPLOAD_BRIEF_ATTACHMENT_SUCCESS,
  UPLOAD_BRIEF_ATTACHMENT_ERROR,
  DELETE_BRIEF_ATTACHMENT_REQUEST,
  DELETE_BRIEF_ATTACHMENT_SUCCESS,
  DELETE_BRIEF_ATTACHMENT_ERROR,
  UPDATE_BRIEF_EVENT_REQUEST,
  UPDATE_BRIEF_EVENT_SUCCESS,
  UPDATE_BRIEF_EVENT_ERROR,
  DELETE_BRIEF_EVENT_REQUEST,
  DELETE_BRIEF_EVENT_SUCCESS,
  DELETE_BRIEF_EVENT_ERROR,
  HELLOSIGN_GET_TEMPLATE_REQUEST,
  HELLOSIGN_GET_TEMPLATE_SUCCESS,
  HELLOSIGN_GET_TEMPLATE_ERROR,
  CREATE_BRIEF_BRAND_REQUEST,
  CREATE_BRIEF_BRAND_SUCCESS,
  CREATE_BRIEF_BRAND_ERROR,
  DELETE_BRIEF_BRAND_REQUEST,
  DELETE_BRIEF_BRAND_SUCCESS, 
} from './constants';

import status from 'utils/status';

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
  status(success, 'success');
  return {
    type: DELETE_BRIEF_SUCCESS,
    success
  };
}

export function deleteBriefError(error) {
  status(error, 'error');
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

// GET Products
export function getBrands() {
  return {
    type: GET_BRANDS_REQUEST,
  };
}

export function getBrandsSuccess(brands) {
  return {
    type: GET_BRANDS_SUCCESS,
    brands
  };
}

export function getBrandsError(error) {
  return {
    type: GET_BRANDS_ERROR,
    error
  };
}

// CREATE Brief Event
export function createBriefEvent(brief_id, briefEvent) {
  return {
    type: CREATE_BRIEF_EVENT_REQUEST,
    brief_id,
    briefEvent,
  };
}

export function createBriefEventSuccess(success) {
  status(success, 'success');
  return {
    type: CREATE_BRIEF_EVENT_SUCCESS,
    success
  };
}

export function createBriefEventError(error) {
  status(error, 'error');
  return {
    type: CREATE_BRIEF_EVENT_ERROR,
    error
  };
}

// Update Brief event
export function updateBriefEvent(brief_id, brief_event_id, briefEvent) {
  return {
    type: UPDATE_BRIEF_EVENT_REQUEST,
    brief_id,
    brief_event_id,
    briefEvent
  };
}

export function updateBriefEventSuccess(success) {
  status(success, 'success');
  return {
    type: UPDATE_BRIEF_EVENT_SUCCESS,
    success
  };
}

export function updateBriefEventError(error) {
  status(error, 'error');
  return {
    type: UPDATE_BRIEF_EVENT_ERROR,
    error
  };
}

// Delete Brief event
export function deleteBriefEvent(brief_id, brief_event_id) {
  return {
    type: DELETE_BRIEF_EVENT_REQUEST,
    brief_id,
    brief_event_id,
  };
}

export function deleteBriefEventSuccess(success) {
  status(success, 'success');
  return {
    type: DELETE_BRIEF_EVENT_SUCCESS,
    success
  };
}

export function deleteBriefEventError(error) {
  status(error, 'error');
  return {
    type: DELETE_BRIEF_EVENT_ERROR,
    error
  };
}

// CREATE Product
export function createBriefBrand(brief_id, briefBrand) {
  return {
    type: CREATE_BRIEF_BRAND_REQUEST,
    brief_id,
    briefBrand,
  };
}

export function createBriefBrandSuccess(success) {
  status(success, 'success');
  return {
    type: CREATE_BRIEF_BRAND_SUCCESS,
    success
  };
}

export function createBriefBrandError(error) {
  status(error, 'error');
  return {
    type: CREATE_BRIEF_BRAND_ERROR,
    error
  };
}

// DELETE Brand
export function deleteBriefBrand(brief_id, brief_brand_id) {
  return {
    type: DELETE_BRIEF_BRAND_REQUEST,
    brief_id,
    brief_brand_id,
  };
}

export function deleteBriefBrandSuccess(success) {
  status(success, 'success');
  return {
    type: DELETE_BRIEF_BRAND_SUCCESS,
    success
  };
}

export function deleteBriefBrandError(error) {
  status(error, 'error');
  return {
    type: DELETE_BRIEF_BRAND_ERROR,
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
  status(success, 'success');
  return {
    type: UPDATE_BRIEF_STATUS_SUCCESS,
    success
  };
}

export function updateBriefStatusError(error) {
  status(error, 'error');
  return {
    type: UPDATE_BRIEF_STATUS_ERROR,
    error
  };
}

// Create a new requisition
export function createRequisition(brief_id, history) {
  return {
    type: CREATE_REQUISITION_REQUEST,
    brief_id,
    history
  };
}

export function createRequisitionSuccess(success) {
  status(success, 'success');
  return {
    type: CREATE_REQUISITION_SUCCESS,
    success
  };
}

export function createRequisitionError(error) {
  status(error, 'error');
  return {
    type: CREATE_REQUISITION_ERROR,
    error
  };
}

// Get Agencies
export function getAgencies() {
  return {
    type: GET_AGENCIES_REQUEST,
  };
}

export function getAgenciesSuccess(agencies) {
  return {
    type: GET_AGENCIES_SUCCESS,
    agencies
  };
}

export function getAgenciesError(error) {
  return {
    type: GET_AGENCIES_ERROR,
    error
  };
}

// Upload attachment
export function uploadBriefAttachment(brief_id, file) {
  return {
    type: UPLOAD_BRIEF_ATTACHMENT_REQUEST,
    brief_id,
    file
  };
}

export function uploadBriefAttachmentSuccess(success) {
  status(success, 'success');
  return {
    type: UPLOAD_BRIEF_ATTACHMENT_SUCCESS,
    success
  };
}

export function uploadBriefAttachmentError(error) {
  status(error, 'error');
  return {
    type: UPLOAD_BRIEF_ATTACHMENT_ERROR,
    error
  };
}

// Delete attachment
export function deleteBriefAttachment(brief_id, brief_attachment_id) {
  return {
    type: DELETE_BRIEF_ATTACHMENT_REQUEST,
    brief_id,
    brief_attachment_id
  };
}

export function deleteBriefAttachmentSuccess(success) {
  status(success, 'success');
  return {
    type: DELETE_BRIEF_ATTACHMENT_SUCCESS,
    success
  };
}

export function deleteBriefAttachmentError(error) {
  status(error, 'error');
  return {
    type: DELETE_BRIEF_ATTACHMENT_ERROR,
    error
  };
}

// Hellosign get template
export function hellosignGetTemplate() {
  return {
    type: HELLOSIGN_GET_TEMPLATE_REQUEST,
  };
}

export function hellosignGetTemplateSuccess(hs) {

  try {
    const {unclaimed_draft} = hs;

    console.log(hs)
    hellosign_client.open((unclaimed_draft.claim_url), {
      skipDomainVerification: true
    });

    return {
      type: HELLOSIGN_GET_TEMPLATE_SUCCESS,
    };
  } catch (e) {
    console.log(e)
  }
  
}

export function hellosignGetTemplateError(error) {
  return {
    type: HELLOSIGN_GET_TEMPLATE_ERROR,
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

