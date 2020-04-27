/*
 *
 * Product actions
 *
 */

import { 
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR,
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR, 
  GET_BRANDS_REQUEST, GET_BRANDS_SUCCESS, GET_BRANDS_ERROR, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR, DISMISS, TOGGLE_FILTER
 } from './constants';

export function getProducts() {
  return {
    type: GET_PRODUCTS_REQUEST,
  };
}

export function getProductsSuccess(products) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    products
  };
}

export function getProductsError(error) {
  return {
    type: GET_PRODUCTS_ERROR,
    error,
  };
}

// Get brands
export function getBrands() {
  return {
    type: GET_BRANDS_REQUEST,
  };
}

export function getBrandsSuccess(brands) {
  return {
    type: GET_BRANDS_SUCCESS,
    brands
  };
}

export function getBrandsError(error) {
  return {
    type: GET_BRANDS_ERROR,
    error,
  };
}

export function addProduct(product) {
  return {
    type: ADD_PRODUCT_REQUEST,
    product
  };
}


export function addProductSuccess(success) {
  return {
    type: ADD_PRODUCT_SUCCESS,
    success
  };
}

export function addProductError(error) {
  return {
    type: ADD_PRODUCT_ERROR,
    error,
  };
}

// UPDATE PRODUCT

export function updateProduct(product_id, product) {
  return {
    type: UPDATE_PRODUCT_REQUEST,
    product_id,
    product
  };
}


export function updateProductSuccess(success) {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    success
  };
}

export function updateProductError(error) {
  return {
    type: UPDATE_PRODUCT_ERROR,
    error,
  };
}

export function toggleFilter(filter) {
  return {
    type: TOGGLE_FILTER,
    filter,
  };
}

export function dismiss(dismiss_type) {
  return {
    type: DISMISS,
    dismiss_type,
  };
}
