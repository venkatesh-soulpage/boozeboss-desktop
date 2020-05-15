import { fromJS } from 'immutable';
import verificationContainerReducer from '../reducer';

describe('verificationContainerReducer', () => {
  it('returns the initial state', () => {
    expect(verificationContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
