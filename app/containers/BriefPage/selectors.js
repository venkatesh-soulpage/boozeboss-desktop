import { createSelector } from 'reselect';

const selectBriefs = state => state.get('briefs');

const makeSelectBriefs = () =>
  createSelector(selectBriefs, briefsState =>
    briefsState.get('briefs'),
  );

const makeSelectVenues = () =>
  createSelector(selectBriefs, briefsState =>
    briefsState.get('venues'),
  );
  
const makeSelectProducts = () =>
  createSelector(selectBriefs, briefsState =>
    briefsState.get('products'),
  );
  
const makeSelectAgencies = () =>
  createSelector(selectBriefs, briefsState =>
    briefsState.get('agencies'),
  );
  
const makeSelectError = () =>
  createSelector(selectBriefs, briefsState =>
    briefsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectBriefs, briefsState =>
    briefsState.get('success'),
  );

export { 
  makeSelectBriefs,
  makeSelectVenues,
  makeSelectProducts,
  makeSelectAgencies,
  makeSelectSuccess,
  makeSelectError
};
