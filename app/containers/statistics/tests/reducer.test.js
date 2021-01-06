import { fromJS } from 'immutable';
import agencyPageReducer from '../reducer';

describe('agencyPageReducer', () => {
  it('returns the initial state', () => {
    expect(agencyPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
