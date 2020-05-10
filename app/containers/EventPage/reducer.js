/*
 *
 * Events reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_ERROR,
  GET_ROLES_REQUEST, GET_ROLES_SUCCESS, GET_ROLES_ERROR 
} from './constants';

export const initialState = fromJS({
  events: null
});

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return state;
    case GET_EVENTS_SUCCESS:
      return state.set('events', action.events);
    case GET_EVENTS_ERROR:
      return state;
    case GET_ROLES_REQUEST:
      return state;
    case GET_ROLES_SUCCESS:
      return state.set('roles', action.roles);
    case GET_ROLES_ERROR:
      return state;
    default:
      return state;
  }
}

export default eventsReducer;
