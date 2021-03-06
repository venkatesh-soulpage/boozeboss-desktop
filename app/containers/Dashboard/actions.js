/*
 *
 * Dashboard actions
 *
 */

import {
   GET_ORGANIZATION_ANALYTICS_REQUEST, GET_ORGANIZATION_ANALYTICS_SUCCESS, GET_ORGANIZATION_ANALYTICS_ERROR ,
   GET_CLIENTS_REQUEST, GET_CLIENTS_SUCCESS, GET_CLIENTS_ERROR, 
   GET_CLIENT_ANALYTICS_REQUEST, GET_CLIENT_ANALYTICS_SUCCESS, GET_CLIENT_ANALYTICS_ERROR, 
   GET_ORGANIZATION_EVENTS_REQUEST, GET_ORGANIZATION_EVENTS_SUCCESS, GET_ORGANIZATION_EVENTS_ERROR, 
   DOWNLOAD_EVENT_REPORT_REQUEST, DOWNLOAD_EVENT_REPORT_SUCCESS, DOWNLOAD_EVENT_REPORT_ERROR,
   GET_CLIENT_EVENTS_REQUEST, GET_CLIENT_EVENTS_SUCCESS, GET_CLIENT_EVENTS_ERROR
} from './constants';

export function getOrganizationEvents() {
  return {
    type: GET_ORGANIZATION_EVENTS_REQUEST,
  };
}

export function getOrganizationEventsSuccess(last_events) {
  return {
    type: GET_ORGANIZATION_EVENTS_SUCCESS,
    last_events
  };
}

export function getOrganizationEventsError(error) {
  return {
    type: GET_ORGANIZATION_EVENTS_ERROR,
    error
  };
}

export function getClientEvents() {
  return {
    type: GET_CLIENT_EVENTS_REQUEST,
  };
}

export function getClientEventsSuccess(last_events) {
  return {
    type: GET_CLIENT_EVENTS_SUCCESS,
    last_events
  };
}

export function getClientEventsError(error) {
  return {
    type: GET_CLIENT_EVENTS_ERROR,
    error
  };
}

export function getOrganizationAnalytics(client_id) {
  return {
    type: GET_ORGANIZATION_ANALYTICS_REQUEST,
    client_id
  };
}

export function getOrganizationAnalyticsSuccess(analytics) {
  return {
    type: GET_ORGANIZATION_ANALYTICS_SUCCESS,
    analytics
  };
}

export function getOrganizationAnalyticsError(error) {
  return {
    type: GET_ORGANIZATION_ANALYTICS_ERROR,
    error
  };
}

export function getClientsAnalytics() {
  return {
    type: GET_CLIENT_ANALYTICS_REQUEST,
  };
}

export function getClientsAnalyticsSuccess(analytics) {
  return {
    type: GET_CLIENT_ANALYTICS_SUCCESS,
    analytics
  };
}

export function getClientAnalyticsError(error) {
  return {
    type: GET_CLIENT_ANALYTICS_ERROR,
    error
  };
}

/* DOWNLOAD EVENT REPORT */ 


export function downloadEventReportRequest(event_id) {
  return {
    type: DOWNLOAD_EVENT_REPORT_REQUEST,
    event_id
  };
}

export function downloadEventReportSuccess() {
  return {
    type: DOWNLOAD_EVENT_REPORT_SUCCESS,
  };
}

export function downloadEventReportError(error) {
  return {
    type: DOWNLOAD_EVENT_REPORT_ERROR,
    error
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
