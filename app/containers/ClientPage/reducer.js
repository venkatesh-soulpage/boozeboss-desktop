/*
 *
 * ClientContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_CLIENT_DRAFT,
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_ERROR,
  INVITE_CLIENT_REQUEST,
  INVITE_CLIENT_SUCCESS,
  INVITE_CLIENT_ERROR,
  INVITE_COLLABORATOR_REQUEST,
  INVITE_COLLABORATOR_SUCCESS,
  INVITE_COLLABORATOR_ERROR,
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_ERROR,
  CREATE_VENUE_REQUEST,
  CREATE_VENUE_SUCCESS,
  CREATE_VENUE_ERROR,
  DISMISS,
  DELETE_VENUE_REQUEST,
  DELETE_VENUE_SUCCESS,
  DELETE_VENUE_ERROR,
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_ERROR,
  CREATE_WAREHOUSE_REQUEST,
  CREATE_WAREHOUSE_SUCCESS,
  CREATE_WAREHOUSE_ERROR,
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  UPLOAD_LOGO_REQUEST,
  UPLOAD_LOGO_SUCCESS,
  UPLOAD_LOGO_ERROR,
  GET_ORGANIZATIONS_REQUEST,
  GET_ORGANIZATIONS_SUCCESS,
  GET_ORGANIZATIONS_ERROR,
  CHANGE_ORGANIZATION_FILTER
} from './constants';

export const initialState = fromJS({
  clients: null,
  roles: null,
  locations: null,
  isLoading: false,
  error: null,
  success: null,
  organization_filter: null,
});

function clientContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CLIENT_DRAFT:
      return state.set('clients', [{ isDraft: true }, ...state.get('clients')]);
    case GET_CLIENTS_REQUEST:
      return state.set('isLoading', true);
    case GET_CLIENTS_SUCCESS:
      return state
              .set('clients', action.clients)
              .set('isLoading', false);
    case GET_CLIENTS_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case INVITE_CLIENT_REQUEST:
      return state.set('isLoading', true);
    case INVITE_CLIENT_SUCCESS:
      return state.set('success', action.success).set('isLoading', false);
    case INVITE_CLIENT_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case INVITE_COLLABORATOR_REQUEST:
      return state.set('isLoading', true);
    case INVITE_COLLABORATOR_SUCCESS:
      return state
        .set('isLoading', false)
        .set('success', action.success);
    case INVITE_COLLABORATOR_ERROR:
      return state
        .set('isLoading', false)
        .set('error', action.error);
    case GET_ROLES_REQUEST:
      return state;
    case GET_ROLES_SUCCESS:
      return state
        .set('roles', action.roles);
    case GET_ROLES_ERROR:
      return state
        .set('error', action.error);
    case GET_LOCATIONS_REQUEST:
      return state;
    case GET_LOCATIONS_SUCCESS:
      return state
        .set('locations', action.locations);
    case GET_LOCATIONS_ERROR:
      return state
        .set('isLoading', false)
        .set('error', action.error);
    case ADD_LOCATION_REQUEST:
      return state.set('isLoading', true);
    case ADD_LOCATION_SUCCESS:
      return state
        .set('isLoading', false).set('success', action.success);
    case ADD_LOCATION_ERROR:
      return state
        .set('isLoading', false)
        .set('error', action.error);
    case CREATE_VENUE_REQUEST:
      return state.set('isLoading', true);
    case CREATE_VENUE_SUCCESS:
      return state
        .set('success', action.success)
        .set('isLoading', false)
    case CREATE_VENUE_ERROR:
      return state
        .set('isLoading', false)
        .set('error', action.error);
    case CREATE_BRAND_REQUEST:
      return state.set('isLoading', true);
    case CREATE_BRAND_SUCCESS:
      return state
        .set('success', action.success)
        .set('isLoading', false)
    case CREATE_BRAND_ERROR:
      return state
        .set('isLoading', false)
        .set('error', action.error);
    case CREATE_WAREHOUSE_REQUEST:
      return state.set('isLoading', true);
    case CREATE_WAREHOUSE_SUCCESS:
      return state
        .set('success', action.success)
        .set('isLoading', false)
    case CREATE_WAREHOUSE_ERROR:
      return state
        .set('isLoading', false)
        .set('error', action.error);
    case DELETE_VENUE_REQUEST:
      return state.set('isLoading', true);
    case DELETE_VENUE_SUCCESS:
      return state
        .set('success', action.success)
        .set('isLoading', false)
    case DELETE_VENUE_ERROR:
      return state
        .set('isLoading', false)
        .set('error', action.error);
    case UPLOAD_LOGO_REQUEST:
      return state.set('isLoading', true);
    case UPLOAD_LOGO_SUCCESS:
      return state
        .set('success', action.success)
        .set('isLoading', false)
    case UPLOAD_LOGO_ERROR:
      return state
        .set('isLoading', false)
        .set('error', action.error);
    case GET_ORGANIZATIONS_REQUEST:
      return state.set('isLoading', true);
    case GET_ORGANIZATIONS_SUCCESS:
      return state
        .set('organizations', action.organizations)
    case GET_ORGANIZATIONS_ERROR:
      return state
        .set('isLoading', false)
        .set('error', action.error);
    case DISMISS: 
      return state.set(action.dismiss_type, null);
    case CHANGE_ORGANIZATION_FILTER: 
      return state.set('organization_filter', action.organization_id);
    default:
      return state;
  }
}

export default clientContainerReducer;
