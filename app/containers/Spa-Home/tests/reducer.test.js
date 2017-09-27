
import { fromJS } from 'immutable';
import spaHomeReducer from '../reducer';

describe('spaHomeReducer', () => {
  it('returns the initial state', () => {
    expect(spaHomeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
