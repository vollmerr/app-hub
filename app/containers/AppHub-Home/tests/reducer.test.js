
import { fromJS } from 'immutable';
import appHubHomeReducer from '../reducer';

describe('appHubHomeReducer', () => {
  it('returns the initial state', () => {
    expect(appHubHomeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
