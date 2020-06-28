/*
 *
 * Events actions
 *
 */

import { DEFAULT_ACTION, 
  GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_ERROR,
  INVITE_GUEST_REQUEST, INVITE_GUEST_SUCCESS, INVITE_GUEST_ERROR, 
  RESEND_EMAIL_REQUEST, RESEND_EMAIL_SUCCESS, RESEND_EMAIL_ERROR, 
  DELETE_GUEST_REQUEST, DELETE_GUEST_SUCCESS, DELETE_GUEST_ERROR, 
  GET_ROLES_REQUEST, GET_ROLES_SUCCESS, GET_ROLES_ERROR,
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, 
  ADD_EVENT_PRODUCTS_REQUEST, ADD_EVENT_PRODUCTS_SUCCESS, ADD_EVENT_PRODUCTS_ERROR, 
  REMOVE_EVENT_PRODUCTS_REQUEST, REMOVE_EVENT_PRODUCTS_SUCCESS, REMOVE_EVENT_PRODUCTS_ERROR, 
  ADD_EVENT_CONDITION_SUCCESS, ADD_EVENT_CONDITION_REQUEST, ADD_EVENT_CONDITION_ERROR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getEvents() {
  return {
    type: GET_EVENTS_REQUEST,
  };
}

export function getEventsSuccess(events) {
  return {
    type: GET_EVENTS_SUCCESS,
    events
  };
}

export function getEventsError(error) {
  return {
    type: GET_EVENTS_ERROR,
    error
  };
}

// Get roles
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

// Invite Guests
export function inviteGuest(guest) {
  return {
    type: INVITE_GUEST_REQUEST,
    guest
  };
}

export function inviteGuestSuccess(success) {
  return {
    type: INVITE_GUEST_SUCCESS,
    success
  };
}

export function inviteGuestError(error) {
  return {
    type: INVITE_GUEST_ERROR,
    error
  };
}

// Add event condition
export function addEventCondition(event_id, condition) {
  return {
    type: ADD_EVENT_CONDITION_REQUEST,
    event_id,
    condition
  };
}

export function addEventConditionSuccess(success) {
  return {
    type: ADD_EVENT_CONDITION_SUCCESS,
    success
  };
}

export function addEventConditionError(error) {
  return {
    type: ADD_EVENT_CONDITION_ERROR,
    error
  };
}

// Invite Guests
export function resendEmail(event_guest_id) {
  return {
    type: RESEND_EMAIL_REQUEST,
    event_guest_id
  };
}

export function resendEmailSuccess(success) {
  alert('Email succesfully sent.');
  return {
    type: RESEND_EMAIL_SUCCESS,
    success
  };
}

export function resendEmailError(error) {
  return {
    type: RESEND_EMAIL_ERROR,
    error
  };
}

// Invite Guests
export function deleteGuest(event_guest_id) {
  return {
    type: DELETE_GUEST_REQUEST,
    event_guest_id
  };
}

export function deleteGuestSuccess(success) {
  return {
    type: DELETE_GUEST_SUCCESS,
    success
  };
}

export function deleteGuestError(error) {
  return {
    type: DELETE_GUEST_ERROR,
    error
  };
}

// Get products
export function getProducts() {
  return {
    type: GET_PRODUCTS_REQUEST,
  };
}

export function getProductsSuccess(products) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    products
  };
}

export function getProductsError(error) {
  return {
    type: GET_PRODUCTS_ERROR,
    error
  };
}

// Add Event Product
export function addEventProduct(event_id, product) {
  return {
    type: ADD_EVENT_PRODUCTS_REQUEST,
    event_id,
    product
  };
}

export function addEventProductSuccess(success) {
  return {
    type: ADD_EVENT_PRODUCTS_SUCCESS,
    success
  };
}

export function addEventProductError(error) {
  return {
    type: ADD_EVENT_PRODUCTS_ERROR,
    error
  };
}

// Remove Event Product
export function removeEventProduct(event_id, event_product_id) {
  return {
    type: REMOVE_EVENT_PRODUCTS_REQUEST,
    event_id,
    event_product_id
  };
}

export function removeEventProductSuccess(success) {
  return {
    type: REMOVE_EVENT_PRODUCTS_SUCCESS,
    success
  };
}

export function removeEventProductError(error) {
  return {
    type: REMOVE_EVENT_PRODUCTS_ERROR,
    error
  };
}
