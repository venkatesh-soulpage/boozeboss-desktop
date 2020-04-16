import { fromJS } from 'immutable';
import briefPageReducer from '../reducer';

describe('briefPageReducer', () => {
  it('returns the initial state', () => {
    expect(briefPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
