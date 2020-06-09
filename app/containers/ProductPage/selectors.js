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

const makeSelectProductsEnabled = () =>
  createSelector(selectProducts, productsState =>
    productsState.get('productsEnabled'),
  );

const makeSelectSuccess = () =>
  createSelector(selectProducts, productsState =>
    productsState.get('success'),
  );

const makeSelectError = () =>
  createSelector(selectProducts, productsState =>
    productsState.get('error'),
  );

const makeSelectIsLoading = () =>
  createSelector(selectProducts, productsState =>
    productsState.get('isLoading'),
  );

export { 
  makeSelectProducts,
  makeSelectBrands,
  makeSelectProductsEnabled,
  makeSelectSuccess,
  makeSelectError, 
  makeSelectIsLoading
};
