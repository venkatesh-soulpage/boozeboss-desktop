import { fromJS } from 'immutable';
import clientContainerReducer from '../reducer';

describe('clientContainerReducer', () => {
  it('returns the initial state', () => {
    expect(clientContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
