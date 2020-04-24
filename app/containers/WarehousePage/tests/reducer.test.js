import { fromJS } from 'immutable';
import warehouseReducer from '../reducer';

describe('warehouseReducer', () => {
  it('returns the initial state', () => {
    expect(warehouseReducer(undefined, {})).toEqual(fromJS({}));
  });
});
