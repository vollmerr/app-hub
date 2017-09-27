
import { fromJS } from 'immutable';
import sagasReducer from '../reducer';

describe('sagasReducer', () => {
  it('returns the initial state', () => {
    expect(sagasReducer(undefined, {})).toEqual(fromJS({}));
  });
});
