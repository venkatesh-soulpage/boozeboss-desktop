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
  
const makeSelectBrands = () =>
  createSelector(selectBriefs, briefsState =>
    briefsState.get('brands'),
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

const makeSelectIsLoading = () =>
  createSelector(selectBriefs, briefsState =>
    briefsState.get('isLoading'),
  );

export { 
  makeSelectBriefs,
  makeSelectVenues,
  makeSelectBrands,
  makeSelectAgencies,
  makeSelectSuccess,
  makeSelectError, 
  makeSelectIsLoading,
};
