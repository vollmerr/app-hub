
import { fromJS } from 'immutable';
import appHubReducer from '../reducer';

describe('appHubReducer', () => {
  it('returns the initial state', () => {
    expect(appHubReducer(undefined, {})).toEqual(fromJS({}));
  });
});
