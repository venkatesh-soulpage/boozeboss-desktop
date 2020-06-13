import { fromJS } from 'immutable';
import organizationsPageReducer from '../reducer';

describe('organizationsPageReducer', () => {
  it('returns the initial state', () => {
    expect(organizationsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
