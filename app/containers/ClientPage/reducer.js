/*
 *
 * ClientContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { ADD_CLIENT_DRAFT } from './constants';

export const initialState = fromJS({
  clients: null,
});

function clientContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CLIENT_DRAFT:
      return state
        .set('clients', [{isDraft: true}]);
    default:
      return state;
  }
}

export default clientContainerReducer;
