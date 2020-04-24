/*
 *
 * Warehouse reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GET_WAREHOUSES_REQUEST, GET_WAREHOUSES_SUCCESS, GET_WAREHOUSES_ERROR, 
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, 
  ADD_PRODUCT_STOCK_REQUEST, ADD_PRODUCT_STOCK_SUCCESS, ADD_PRODUCT_STOCK_ERROR, 
  DISMISS 
} from './constants';

export const initialState = fromJS({
  warehouses: null,
  products: null,
  success: null,
  error: null,
});

function warehouseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WAREHOUSES_REQUEST:
      return state;
    case GET_WAREHOUSES_SUCCESS:
      return state
        .set('warehouses', action.warehouses);
    case GET_WAREHOUSES_ERROR:
      return state.set('warehouse', action.error);
    case GET_PRODUCTS_REQUEST:
      return state;
    case GET_PRODUCTS_SUCCESS:
      const filtered_products = action.products.filter(prod => !prod.is_cocktail);
      return state
        .set('products', filtered_products);
    case GET_PRODUCTS_ERROR:
      return state.set('error', action.error);
    case ADD_PRODUCT_STOCK_REQUEST:
      return state;
    case ADD_PRODUCT_STOCK_SUCCESS:
      return state
        .set('success', action.success);
    case ADD_PRODUCT_STOCK_ERROR:
      return state.set('error', action.error);
    case DISMISS:
      return state.set(action.dismiss_type, null);
    default:
      return state;
  }
}

export default warehouseReducer;
