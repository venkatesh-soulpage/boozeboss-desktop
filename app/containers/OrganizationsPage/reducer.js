/*
 *
 * OrganizationsPage reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GET_ORGANIZATIONS_REQUEST, GET_ORGANIZATIONS_ERROR, GET_ORGANIZATIONS_SUCCESS, ADD_ORGANIZATION_DRAFT, 
  GET_LOCATIONS_SUCCESS, GET_LOCATIONS_REQUEST, GET_LOCATIONS_ERROR, 
  GET_ROLES_REQUEST, GET_ROLES_SUCCESS, GET_ROLES_ERROR
 } from './constants';

export const initialState = fromJS({
  organizations: null, 
  locations: null, 
  error: null,
  success: null,
  roles: null,
});

function organizationsPageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORGANIZATION_DRAFT: 
       return state.set('organizations', [{ isDraft: true }, ...state.get('organizations')]);
    case GET_ORGANIZATIONS_REQUEST:
      return state.set('isLoading', true);
    case GET_ORGANIZATIONS_SUCCESS:
      return state
        .set('organizations', action.organizations)
        .set('isLoading', false);
    case GET_ORGANIZATIONS_ERROR:
      return state;
    case GET_LOCATIONS_REQUEST:
      return state.set('isLoading', true);
    case GET_LOCATIONS_SUCCESS:
      return state
        .set('locations', action.locations)
        .set('isLoading', false);
    case GET_LOCATIONS_ERROR:
      return state;
    case GET_ROLES_REQUEST:
      return state;
    case GET_ROLES_SUCCESS:
      return state
        .set('roles', action.roles);
    case GET_ROLES_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default organizationsPageReducer;
