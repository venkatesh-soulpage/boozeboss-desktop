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
} from './constants';

export const initialState = fromJS({
  agencies: null,
  isLoading: false,
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
      return state.set('isLoading', true);
    case INVITE_AGENCY_SUCCESS:
      const current_agencies = state.get('agencies').splice();
      current_agencies[0] = action.agency;
      return state.set('agencies', current_agencies).set('isLoading', false);
    case INVITE_AGENCY_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    default:
      return state;
  }
}

export default agencyPageReducer;
