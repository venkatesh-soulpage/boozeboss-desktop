/*
 *
 * Product actions
 *
 */

import { 
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR,
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR, 
  GET_BRANDS_REQUEST, GET_BRANDS_SUCCESS, GET_BRANDS_ERROR
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
