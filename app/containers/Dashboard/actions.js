/*
 *
 * Dashboard actions
 *
 */

import {
   GET_ORGANIZATION_ANALYTICS_REQUEST, GET_ORGANIZATION_ANALYTICS_SUCCESS, GET_ORGANIZATION_ANALYTICS_ERROR ,
   GET_CLIENTS_REQUEST, GET_CLIENTS_SUCCESS, GET_CLIENTS_ERROR, GET_CLIENT_ANALYTICS_REQUEST, GET_CLIENT_ANALYTICS_SUCCESS, GET_CLIENT_ANALYTICS_ERROR
} from './constants';

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
