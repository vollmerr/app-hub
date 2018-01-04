
import { fromJS } from 'immutable';

import paasReducer, { initialState } from '../reducer';

import {
  INIT_DATA_SUCCESS,
} from '../constants';

const payload = {
  id: 1,
  data: 'test data',
};

describe('paasReducer', () => {
  let expected;
  beforeEach(() => {
    expected = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(paasReducer(undefined, {})).toEqual(expected);
  });

  it('handles INIT_DATA_SUCCESS', () => {
    expected = expected.set('data', fromJS(payload));
    const action = { type: INIT_DATA_SUCCESS, payload };
    expect(paasReducer(undefined, action)).toEqual(expected);
  });
});
