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

const makeSelectSuccess = () =>
  createSelector(selectProducts, productsState =>
    productsState.get('success'),
  );

const makeSelectError = () =>
  createSelector(selectProducts, productsState =>
    productsState.get('error'),
  );

export { 
  makeSelectProducts,
  makeSelectBrands,
  makeSelectSuccess,
  makeSelectError
};
