/*
 *
 * Events reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_VENUE_DRAFT,
  GET_VENUES_REQUEST,
  GET_VENUES_SUCCESS,
  GET_VENUES_ERROR,
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
} from './constants';

export const initialState = fromJS({
  outletvenues: null,
  outletlocations: null,
  isLoading: null,
});

function outletVenuesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_VENUE_DRAFT:
      return state.set('outletvenues', [
        { isDraft: true },
        ...state.get('outletvenues'),
      ]);
    case GET_VENUES_REQUEST:
      return state.set('isLoading', true);
    case GET_VENUES_SUCCESS:
      return state.set('outletvenues', action.venues).set('isLoading', false);
    case GET_VENUES_ERROR:
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

export default outletVenuesReducer;
