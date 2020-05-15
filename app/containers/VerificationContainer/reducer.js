/*
 *
 * VerificationContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_VERIFICATIONS_REQUEST, GET_VERIFICATIONS_SUCCESS, GET_VERIFICATIONS_ERROR } from './constants';

export const initialState = fromJS({
  verifications: null,
});

function verificationContainerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VERIFICATIONS_REQUEST:
      return state;
    case GET_VERIFICATIONS_SUCCESS:
      return state.set('verifications', action.verifications);
    case GET_VERIFICATIONS_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default verificationContainerReducer;
