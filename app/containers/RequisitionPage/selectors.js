import { createSelector } from 'reselect';

const selectRequisitions = state => state.get('requisitions');

const makeSelectRequisitions = () =>
  createSelector(selectRequisitions, requisitionsState =>
    requisitionsState.get('requisitions'),
  );

  
const makeSelectError = () =>
  createSelector(selectRequisitions, requisitionsState =>
    requisitionsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectRequisitions, requisitionsState =>
    requisitionsState.get('success'),
  );

export { 
  makeSelectRequisitions,
  makeSelectError,
  makeSelectSuccess
};
