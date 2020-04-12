import { fromJS } from 'immutable';
import clientSignupReducer from '../reducer';

describe('clientSignupReducer', () => {
  it('returns the initial state', () => {
    expect(clientSignupReducer(undefined, {})).toEqual(fromJS({}));
  });
});
