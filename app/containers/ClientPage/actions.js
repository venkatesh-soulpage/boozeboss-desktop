/*
 *
 * ClientContainer actions
 *
 */

import {
  ADD_CLIENT_DRAFT,
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_ERROR,
  INVITE_CLIENT_REQUEST,
  INVITE_CLIENT_SUCCESS,
  INVITE_CLIENT_ERROR,
} from './constants';

export function addClientDraft() {
  return {
    type: ADD_CLIENT_DRAFT,
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

/* CREATE CLIENT */
export function inviteClient(client) {
  return {
    type: INVITE_CLIENT_REQUEST,
    client,
  };
}

export function inviteClientSuccess(client) {
  return {
    type: INVITE_CLIENT_SUCCESS,
    client,
  };
}

export function inviteClientError(error) {
  return {
    type: INVITE_CLIENT_ERROR,
    error,
  };
}
