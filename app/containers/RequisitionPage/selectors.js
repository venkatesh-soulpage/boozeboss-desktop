import { createSelector } from 'reselect';

const selectRequisitions = state => state.get('requisitions');

const makeSelectRequisitions = () =>
  createSelector(selectRequisitions, requisitionsState =>
    requisitionsState.get('requisitions'),
  );

const makeSelectProducts = () =>
  createSelector(selectRequisitions, requisitionsState =>
    requisitionsState.get('products'),
  );

  
const makeSelectError = () =>
  createSelector(selectRequisitions, requisitionsState =>
    requisitionsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectRequisitions, requisitionsState =>
    requisitionsState.get('success'),
  );

const makeSelectIsLoadingProducts = () =>
  createSelector(selectRequisitions, requisitionsState =>
    requisitionsState.get('isLoadingProducts'),
  );

export { 
  makeSelectRequisitions,
  makeSelectProducts,
  makeSelectIsLoadingProducts,
  makeSelectError,
  makeSelectSuccess
};
