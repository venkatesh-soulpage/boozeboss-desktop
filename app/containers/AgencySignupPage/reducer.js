/*
 *
 * ClientSignup reducer
 *
 */

import { fromJS } from 'immutable';
import {
  AGENCY_SIGNUP_REQUEST,
  AGENCY_SIGNUP_SUCCESS,
  AGENCY_SIGNUP_ERROR,
  GET_SLA_REQUEST,
  GET_SLA_SUCCESS,
  GET_SLA_ERROR,
} from './constants';

export const initialState = fromJS({
  sla: null,
  error: null,
  isLoading: null,
});

function agencySignupReducer(state = initialState, action) {
  switch (action.type) {
    case AGENCY_SIGNUP_REQUEST:
      return state.set('isLoading', true);
    case AGENCY_SIGNUP_SUCCESS:
      return state.set('isLoading', false);
    case AGENCY_SIGNUP_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case GET_SLA_REQUEST:
      return state.set('isLoading', true);
    case GET_SLA_SUCCESS:
      return state
        .set('sla', action.sla)
        .set('isLoading', false);
    case GET_SLA_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    default:
      return state;
  }
}

export default agencySignupReducer;
