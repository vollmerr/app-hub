
import { fromJS } from 'immutable';
import spaReducer from '../reducer';

describe('spaReducer', () => {
  it('returns the initial state', () => {
    expect(spaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
