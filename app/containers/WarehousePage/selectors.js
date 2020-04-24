import { createSelector } from 'reselect';

const selectWarehouses = state => state.get('warehouse');

const makeSelectWarehouses = () =>
  createSelector(selectWarehouses, warehousesState =>
    warehousesState.get('warehouses'),
  );

const makeSelectProducts = () =>
  createSelector(selectWarehouses, warehousesState =>
    warehousesState.get('products'),
  );

const makeSelectError = () =>
  createSelector(selectWarehouses, warehousesState =>
    warehousesState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectWarehouses, warehousesState =>
    warehousesState.get('success'),
  );

export { 
  makeSelectWarehouses,
  makeSelectProducts,
  makeSelectSuccess,
  makeSelectError
};
