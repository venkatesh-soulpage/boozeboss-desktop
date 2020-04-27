/*
 *
 * Product reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR,
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR, 
  GET_BRANDS_REQUEST, GET_BRANDS_SUCCESS, GET_BRANDS_ERROR, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR, DISMISS, TOGGLE_FILTER,
 } from './constants';

export const initialState = fromJS({
  products: null,
  brands: null,
  success: null,
  error: null,
  productsEnabled: ['Product', 'Cocktail'],
});

function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return state;
    case GET_PRODUCTS_SUCCESS:
      return state.set('products', action.products);
    case GET_PRODUCTS_ERROR:
      return state.set('error', action.error);
    case ADD_PRODUCT_REQUEST:
      return state;
    case ADD_PRODUCT_SUCCESS:
      return state
        .set('success', action.success);
    case ADD_PRODUCT_ERROR:
      return state.set('error', action.error);
    case UPDATE_PRODUCT_REQUEST:
      return state;
    case UPDATE_PRODUCT_SUCCESS:
      return state
        .set('success', action.success);
    case UPDATE_PRODUCT_ERROR:
      return state.set('error', action.error);
    case GET_BRANDS_REQUEST:
      return state;
    case GET_BRANDS_SUCCESS:
      return state.set('brands', action.brands);
    case GET_BRANDS_ERROR:
      return state.set('error', action.error);
    case TOGGLE_FILTER:
      const hasFilter = state.get('productsEnabled').indexOf(action.filter) > -1;
      if (hasFilter) {
        const removed = state.get('productsEnabled').filter(currentFilter => currentFilter !== action.filter);
        return state.set('productsEnabled', removed);
      } else {
        return state.set('productsEnabled', [...state.get('productsEnabled'), action.filter]);
      }
      
    case DISMISS:
      return state.set(action.dismiss_type, null);
    default:
      return state;
  }
}

export default productReducer;
