/*
 *
 * BriefPage reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  ADD_BRIEF_DRAFT,
  GET_BRIEFS_REQUEST, GET_BRIEFS_SUCCESS, GET_BRIEFS_ERROR, 
  CREATE_BRIEF_REQUEST,
  CREATE_BRIEF_SUCCESS,
  CREATE_BRIEF_ERROR
} from './constants';

export const initialState = fromJS({
  briefs: null,
});

function briefPageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BRIEF_DRAFT:
      return state.set('briefs', [{ isDraft: true }, ...state.get('briefs')]);
    case GET_BRIEFS_REQUEST:
      return state.set('isLoading', true);
    case GET_BRIEFS_SUCCESS:
      return state.set('briefs', action.briefs).set('isLoading', false);
    case GET_BRIEFS_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case CREATE_BRIEF_REQUEST:
      return state.set('isLoading', true);
    case CREATE_BRIEF_SUCCESS:
      const briefsOnly = state.get('briefs').filter(brief => !brief.isDraft);
      return state
        .set('briefs', [ ...briefsOnly, action.new_brief])
        .set('isLoading', false);
    case CREATE_BRIEF_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    default:
      return state;
  }
}

export default briefPageReducer;
