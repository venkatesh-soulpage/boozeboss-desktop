/*
 *
 * System reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GET_LOCATIONS_REQUEST, GET_LOCATIONS_SUCCESS, GET_LOCATIONS_ERROR,
  ADD_LOCATION_REQUEST, ADD_LOCATION_SUCCESS, ADD_LOCATION_ERROR, DISMISS
} from './constants';

export const initialState = fromJS({
  locations: null,
  success: null,
  error: null,
});

function systemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS_REQUEST:
      return state;
    case GET_LOCATIONS_SUCCESS:
      return state.set('locations', action.locations);
    case GET_LOCATIONS_ERROR:
      return state.set('error', action.error);
    case ADD_LOCATION_REQUEST:
      return state;
    case ADD_LOCATION_SUCCESS:
      return state.set('success', action.success);
    case ADD_LOCATION_ERROR:
      return state.set('error', action.error);
    case DISMISS: 
      return state.set(action.dismiss_type, null);
    default:
      return state;
  }
}

export default systemReducer;
