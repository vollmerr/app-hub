
import { fromJS } from 'immutable';
import reduxReducer from '../reducer';

describe('reduxReducer', () => {
  it('returns the initial state', () => {
    expect(reduxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
