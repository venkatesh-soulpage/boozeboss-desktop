/*
 *
 * Warehouse actions
 *
 */

import { GET_WAREHOUSES_REQUEST, GET_WAREHOUSES_SUCCESS, GET_WAREHOUSES_ERROR, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, ADD_PRODUCT_STOCK_REQUEST, ADD_PRODUCT_STOCK_SUCCESS, ADD_PRODUCT_STOCK_ERROR, DISMISS } from './constants';


// Get Warehouses
export function getWarehouses() {
  return {
    type: GET_WAREHOUSES_REQUEST,
  };
}

export function getWarehousesSuccess(warehouses) {
  return {
    type: GET_WAREHOUSES_SUCCESS,
    warehouses,
  };
}

export function getWarehousesError() {
  return {
    type: GET_WAREHOUSES_ERROR,
  };
}

// Get Products
export function getProducts() {
  return {
    type: GET_PRODUCTS_REQUEST,
  };
}

export function getProductsSuccess(products) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    products,
  };
}

export function getProductsError(error) {
  return {
    type: GET_PRODUCTS_ERROR,
    error
  };
}

// Create product stock
export function addProductStock(stock, warehouse_id) {
  return {
    type: ADD_PRODUCT_STOCK_REQUEST,
    stock,
    warehouse_id
  };
}

export function addProductStockSuccess(success) {
  return {
    type: ADD_PRODUCT_STOCK_SUCCESS,
    success,
  };
}

export function addProductStockError(error) {
  return {
    type: ADD_PRODUCT_STOCK_ERROR,
    error
  };
}

export function dismiss(dismiss_type) {
  return {
    type: DISMISS,
    dismiss_type
  };
}
