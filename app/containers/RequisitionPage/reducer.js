/*
 *
 * Requisition reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_REQUISITIONS_REQUEST, GET_REQUISITIONS_SUCCESS, GET_REQUISITIONS_ERROR } from './constants';

export const initialState = fromJS({
  requisitions: null,
});

function requisitionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REQUISITIONS_REQUEST:
      return state;
    case GET_REQUISITIONS_SUCCESS:
      return state.set('requisitions', action.requisitions);
    case GET_REQUISITIONS_ERROR:
      return state;
    default:
      return state;
  }
}

export default requisitionReducer;
