import { fromJS } from 'immutable';
import organizationSignupReducer from '../reducer';

describe('organizationSignupReducer', () => {
  it('returns the initial state', () => {
    expect(organizationSignupReducer(undefined, {})).toEqual(fromJS({}));
  });
});
