/*
 *
 * AgencyContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_AGENCY_DRAFT,
  GET_AGENCIES_REQUEST,
  GET_AGENCIES_SUCCESS,
  GET_AGENCIES_ERROR,
  INVITE_AGENCY_REQUEST,
  INVITE_AGENCY_SUCCESS,
  INVITE_AGENCY_ERROR,
  INVITE_COLLABORATOR_REQUEST,
  INVITE_COLLABORATOR_SUCCESS,
  INVITE_COLLABORATOR_ERROR,
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_ERROR,
  DISMISS
} from './constants';

export const initialState = fromJS({
  agencies: null,
  roles: null,
  isLoading: false,
  success: null,
  error: null,
});

function agencyPageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_AGENCY_DRAFT:
      return state.set('agencies', [{ isDraft: true }, ...state.get('agencies')]);
    case GET_AGENCIES_REQUEST:
      return state.set('isLoading', true);
    case GET_AGENCIES_SUCCESS:
      return state.set('agencies', action.agencies).set('isLoading', false);
    case GET_AGENCIES_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case INVITE_AGENCY_REQUEST:
      return state;
    case INVITE_AGENCY_SUCCESS:
      const current_agencies = state.get('agencies').splice();
      current_agencies[0] = action.agency;
      return state.set('agencies', current_agencies);
    case INVITE_AGENCY_ERROR:
      return state.set('error', action.error);
      case INVITE_COLLABORATOR_REQUEST:
      return state;
    case INVITE_COLLABORATOR_SUCCESS:
      return state
        .set('success', action.success);
    case INVITE_COLLABORATOR_ERROR:
      return state
        .set('error', action.error);
    case GET_ROLES_REQUEST:
      return state;
    case GET_ROLES_SUCCESS:
      return state
        .set('roles', action.roles);
    case GET_ROLES_ERROR:
      return state
        .set('error', action.error);
    case DISMISS: 
      return state.set(action.dismiss_type, null);
    default:
      return state;
  }
}

export default agencyPageReducer;
