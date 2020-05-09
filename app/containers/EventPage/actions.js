/*
 *
 * Events actions
 *
 */

import { DEFAULT_ACTION, 
  GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_ERROR,
  INVITE_GUEST_REQUEST, INVITE_GUEST_SUCCESS, INVITE_GUEST_ERROR, RESEND_EMAIL_REQUEST, RESEND_EMAIL_SUCCESS, RESEND_EMAIL_ERROR 
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
