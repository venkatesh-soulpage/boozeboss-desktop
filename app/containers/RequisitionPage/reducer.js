/*
 *
 * Requisition reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GET_REQUISITIONS_REQUEST, GET_REQUISITIONS_SUCCESS, GET_REQUISITIONS_ERROR, 
  GET_CLIENT_PRODUCTS_REQUEST, GET_CLIENT_PRODUCTS_SUCCESS, GET_CLIENT_PRODUCTS_ERROR, 
  CREATE_REQUISITION_ORDER_REQUEST, CREATE_REQUISITION_ORDER_SUCCESS, CREATE_REQUISITION_ORDER_ERROR, 
  DELETE_REQUISITION_ORDER_REQUEST, DELETE_REQUISITION_ORDER_SUCCESS, DELETE_REQUISITION_ORDER_ERROR, 
  UPDATE_REQUISITION_STATUS_REQUEST, UPDATE_REQUISITION_STATUS_SUCCESS, UPDATE_REQUISITION_STATUS_ERROR, 
  GET_WAREHOUSES_REQUEST, GET_WAREHOUSES_SUCCESS, GET_WAREHOUSES_ERROR, 
  UPDATE_REQUISITION_ORDERS_REQUEST, UPDATE_REQUISITION_ORDERS_SUCCESS, UPDATE_REQUISITION_ORDERS_ERROR, 
  CREATE_REQUISITION_DELIVERY_REQUEST, CREATE_REQUISITION_DELIVERY_SUCCESS, CREATE_REQUISITION_DELIVERY_ERROR, 
  UPDATE_REQUISITION_DELIVERY_REQUEST, UPDATE_REQUISITION_DELIVERY_SUCCESS, UPDATE_REQUISITION_DELIVERY_ERROR, 
  REJECT_REQUISITION_STATUS_REQUEST, REJECT_REQUISITION_STATUS_SUCCESS, REJECT_REQUISITION_STATUS_ERROR 
} from './constants';

export const initialState = fromJS({
  requisitions: null,
  products: null,
  warehouses: null,
  success: null,
  error: null,
  isLoadingProducts: false,
});

function requisitionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REQUISITIONS_REQUEST:
      return state;
    case GET_REQUISITIONS_SUCCESS:
      return state.set('requisitions', action.requisitions);
    case GET_REQUISITIONS_ERROR:
      return state;
    case GET_WAREHOUSES_REQUEST:
      return state;
    case GET_WAREHOUSES_SUCCESS:
      return state.set('warehouses', action.warehouses);
    case GET_WAREHOUSES_ERROR:
      return state.set('error', action.error);
    case GET_CLIENT_PRODUCTS_REQUEST:
      return state.set('isLoadingProducts', true);
    case GET_CLIENT_PRODUCTS_SUCCESS:
      return state
          .set('isLoadingProducts', false)
          .set('products', action.products);
    case GET_CLIENT_PRODUCTS_ERROR:
      return state.set('isLoadingProducts', false)
    case CREATE_REQUISITION_ORDER_REQUEST:
      return state;
    case CREATE_REQUISITION_ORDER_SUCCESS:
      return state
          .set('success', action.success);
    case CREATE_REQUISITION_ORDER_ERROR:
      return state.set('error', action.error)
    case DELETE_REQUISITION_ORDER_REQUEST:
      return state;
    case DELETE_REQUISITION_ORDER_SUCCESS:
      return state
          .set('success', action.success);
    case DELETE_REQUISITION_ORDER_ERROR:
      return state.set('error', action.error)
    case UPDATE_REQUISITION_STATUS_REQUEST:
      return state;
    case UPDATE_REQUISITION_STATUS_SUCCESS:
      return state.set('success', action.success);
    case UPDATE_REQUISITION_STATUS_ERROR:
      return state.set('error', action.error)
    case REJECT_REQUISITION_STATUS_REQUEST:
      return state;
    case REJECT_REQUISITION_STATUS_SUCCESS:
      return state.set('success', action.success);
    case REJECT_REQUISITION_STATUS_ERROR:
      return state.set('error', action.error)
    case UPDATE_REQUISITION_ORDERS_REQUEST:
      return state;
    case UPDATE_REQUISITION_ORDERS_SUCCESS:
      return state.set('success', action.success);
    case UPDATE_REQUISITION_ORDERS_ERROR:
      return state.set('error', action.error)
    case CREATE_REQUISITION_DELIVERY_REQUEST:
      return state;
    case CREATE_REQUISITION_DELIVERY_SUCCESS:
      return state.set('success', action.success);
    case CREATE_REQUISITION_DELIVERY_ERROR:
      return state.set('error', action.error)
    case UPDATE_REQUISITION_DELIVERY_REQUEST:
      return state;
    case UPDATE_REQUISITION_DELIVERY_SUCCESS:
      return state.set('success', action.success);
    case UPDATE_REQUISITION_DELIVERY_ERROR:
      return state.set('error', action.error)
    default:
      return state;
  }
}

export default requisitionReducer;
