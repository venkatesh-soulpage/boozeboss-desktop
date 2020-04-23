import { createSelector } from 'reselect';

const selectProducts = state => state.get('products');

const makeSelectProducts = () =>
  createSelector(selectProducts, productsState =>
    productsState.get('products'),
  );

const makeSelectBrands = () =>
  createSelector(selectProducts, productsState =>
    productsState.get('brands'),
  );

export { 
  makeSelectProducts,
  makeSelectBrands
};
