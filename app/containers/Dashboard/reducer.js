/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GET_ORGANIZATION_ANALYTICS_REQUEST, GET_ORGANIZATION_ANALYTICS_SUCCESS, GET_ORGANIZATION_ANALYTICS_ERROR, 
  GET_CLIENTS_REQUEST , GET_CLIENTS_SUCCESS, GET_CLIENTS_ERROR, 
  GET_CLIENT_ANALYTICS_REQUEST,
  GET_CLIENT_ANALYTICS_SUCCESS,
  GET_CLIENT_ANALYTICS_ERROR,
  GET_ORGANIZATION_EVENTS_REQUEST,
  GET_ORGANIZATION_EVENTS_SUCCESS,
  GET_ORGANIZATION_EVENTS_ERROR
} from './constants';

export const initialState = fromJS({
  events: null,
  last_events: null,
  clients: null
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORGANIZATION_ANALYTICS_REQUEST:
      return state;
    case GET_ORGANIZATION_ANALYTICS_SUCCESS:
      return state.set('events', action.analytics);
    case GET_ORGANIZATION_ANALYTICS_ERROR:
      return state;
    case GET_CLIENT_ANALYTICS_REQUEST:
      return state;
    case GET_CLIENT_ANALYTICS_SUCCESS:
      return state.set('events', action.analytics);
    case GET_ORGANIZATION_EVENTS_REQUEST:
      return state;
    case GET_ORGANIZATION_EVENTS_SUCCESS:
      return state.set('last_events', action.last_events);
    case GET_ORGANIZATION_EVENTS_ERROR:
      return state;
    case GET_CLIENT_ANALYTICS_ERROR:
      return state;
    case GET_CLIENTS_REQUEST:
      return state;
    case GET_CLIENTS_SUCCESS:
      return state.set('clients', action.clients);
    case GET_CLIENTS_ERROR:
      return state;
    default:
      return state;
  }
}

export default dashboardReducer;
