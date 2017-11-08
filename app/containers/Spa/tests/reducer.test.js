
import { fromJS } from 'immutable';

import spaReducer, { initialState, mockData } from '../reducer';

import {
  INIT_DATA_SUCCESS,
} from '../constants';

const payload = {
  id: 1,
  data: 'test data',
};

describe('spaReducer', () => {
  let expected;
  beforeEach(() => {
    expected = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(spaReducer(undefined, {})).toEqual(expected);
  });

  it('handles INIT_DATA_SUCCESS [ TEMP - FOR MOCK DATA ]', () => {
    expected = expected.set('data', fromJS(mockData));
    const action = { type: INIT_DATA_SUCCESS, payload };
    expect(spaReducer(undefined, action)).toEqual(expected);
  });
});
