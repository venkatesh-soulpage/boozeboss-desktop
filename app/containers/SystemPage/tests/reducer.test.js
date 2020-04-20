import { fromJS } from 'immutable';
import systemReducer from '../reducer';

describe('systemReducer', () => {
  it('returns the initial state', () => {
    expect(systemReducer(undefined, {})).toEqual(fromJS({}));
  });
});
