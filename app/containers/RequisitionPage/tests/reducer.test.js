import { fromJS } from 'immutable';
import requisitionReducer from '../reducer';

describe('requisitionReducer', () => {
  it('returns the initial state', () => {
    expect(requisitionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
