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
  CREATE_BRIEF_ERROR,
  DELETE_BRIEF_REQUEST,
  DELETE_BRIEF_SUCCESS,
  DELETE_BRIEF_ERROR,
  DISMISS,
  DELETE_BRIEF_DRAFT,
  GET_VENUES_REQUEST,
  GET_VENUES_SUCCESS,
  GET_VENUES_ERROR,
  CREATE_BRIEF_EVENT_REQUEST,
  CREATE_BRIEF_EVENT_SUCCESS,
  CREATE_BRIEF_EVENT_ERROR,
  UPDATE_BRIEF_STATUS_REQUEST,
  UPDATE_BRIEF_STATUS_SUCCESS,
  UPDATE_BRIEF_STATUS_ERROR,
  GET_AGENCIES_REQUEST,
  GET_AGENCIES_SUCCESS,
  GET_AGENCIES_ERROR,
  CREATE_BRIEF_PRODUCT_REQUEST,
  CREATE_BRIEF_PRODUCT_SUCCESS,
  CREATE_BRIEF_PRODUCT_ERROR,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  DELETE_BRIEF_PRODUCT_REQUEST,
  DELETE_BRIEF_PRODUCT_SUCCESS,
  DELETE_BRIEF_PRODUCT_ERROR,
  CREATE_REQUISITION_REQUEST,
  CREATE_REQUISITION_SUCCESS,
  CREATE_REQUISITION_ERROR
} from './constants';

export const initialState = fromJS({
  briefs: null,
  venues: null,
  agencies: null,
  success: null,
  error: null,
});

function briefPageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BRIEF_DRAFT:
      return state.set('briefs', [{ isDraft: true }, ...state.get('briefs')]);
    case DELETE_BRIEF_DRAFT:
      const new_briefs = state.get('briefs').filter(brief => !brief.isDraft);
      return state.set('briefs', new_briefs);
    case GET_BRIEFS_REQUEST:
      return state.set('isLoading', true);
    case GET_BRIEFS_SUCCESS:
      return state.set('briefs', action.briefs).set('isLoading', false);
    case GET_BRIEFS_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case GET_AGENCIES_REQUEST:
      return state.set('isLoading', true);
    case GET_AGENCIES_SUCCESS:
      return state.set('agencies', action.agencies).set('isLoading', false);
    case GET_AGENCIES_ERROR:
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
    case DELETE_BRIEF_REQUEST:
      return state.set('isLoading', true);
    case DELETE_BRIEF_SUCCESS:
      return state
        .set('success', action.success)
        .set('isLoading', false);
    case DELETE_BRIEF_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case GET_VENUES_REQUEST:
      return state.set('isLoading', true);
    case GET_VENUES_SUCCESS:
      return state.set('venues', action.venues).set('isLoading', false);
    case GET_VENUES_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case GET_PRODUCTS_REQUEST:
      return state.set('isLoading', true);
    case GET_PRODUCTS_SUCCESS:
      return state.set('products', action.products).set('isLoading', false);
    case GET_PRODUCTS_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case CREATE_BRIEF_EVENT_REQUEST:
      return state.set('isLoading', true);
    case CREATE_BRIEF_EVENT_SUCCESS:
      return state.set('success', JSON.stringify(action.success)).set('isLoading', false);
    case CREATE_BRIEF_EVENT_ERROR:
      return state.set('error', JSON.stringify(action.error)).set('isLoading', false);
    case CREATE_BRIEF_PRODUCT_REQUEST:
      return state.set('isLoading', true);
    case CREATE_BRIEF_PRODUCT_SUCCESS:
      return state.set('success', JSON.stringify(action.success)).set('isLoading', false);
    case CREATE_BRIEF_PRODUCT_ERROR:
      return state.set('error', JSON.stringify(action.error)).set('isLoading', false);
    case DELETE_BRIEF_PRODUCT_REQUEST:
      return state.set('isLoading', true);
    case DELETE_BRIEF_PRODUCT_SUCCESS:
      return state.set('success', JSON.stringify(action.success)).set('isLoading', false);
    case DELETE_BRIEF_PRODUCT_ERROR:
      return state.set('error', JSON.stringify(action.error)).set('isLoading', false);
    case UPDATE_BRIEF_STATUS_REQUEST:
      return state.set('isLoading', true);
    case UPDATE_BRIEF_STATUS_SUCCESS:
      return state.set('success', JSON.stringify(action.success)).set('isLoading', false);
    case UPDATE_BRIEF_STATUS_ERROR:
      return state.set('error', JSON.stringify(action.error)).set('isLoading', false);
    case CREATE_REQUISITION_REQUEST:
      return state.set('isLoading', true);
    case CREATE_REQUISITION_SUCCESS:
      return state.set('success', JSON.stringify(action.success)).set('isLoading', false);
    case CREATE_REQUISITION_ERROR:
      return state.set('error', JSON.stringify(action.error)).set('isLoading', false);
    case DISMISS:
      return state.set(action.dismiss_type, null);
    default:
      return state;
  }
}

export default briefPageReducer;
