import { fromJS } from 'immutable';
import eventsReducer from '../reducer';

describe('eventsReducer', () => {
  it('returns the initial state', () => {
    expect(eventsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
