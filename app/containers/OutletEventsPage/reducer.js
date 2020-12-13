/*
 *
 * Events reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_EVENT_DRAFT,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
} from './constants';

export const initialState = fromJS({
  outletevents: null,
  isLoading: null,
});

function outletEventsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT_DRAFT:
      return state.set('outletevents', [
        { isDraft: true },
        ...state.get('outletevents'),
      ]);
    case GET_EVENTS_REQUEST:
      return state.set('isLoading', true);
    case GET_EVENTS_SUCCESS:
      return state.set('outletevents', action.events).set('isLoading', false);
    case GET_EVENTS_ERROR:
      return state;
    case GET_LOCATIONS_REQUEST:
      return state.set('isLoading', true);
    case GET_LOCATIONS_SUCCESS:
      return state
        .set('outletlocations', action.locations)
        .set('isLoading', false);
    case GET_LOCATIONS_ERROR:
      return state;
    default:
      return state;
  }
}

export default outletEventsReducer;
