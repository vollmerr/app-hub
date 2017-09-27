
import { fromJS } from 'immutable';
import appHubHeaderReducer from '../reducer';

describe('appHubHeaderReducer', () => {
  it('returns the initial state', () => {
    expect(appHubHeaderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
