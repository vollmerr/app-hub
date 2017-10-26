import { fromJS } from 'immutable';

import testAppReducer, { initialState } from '../reducer';

import {
  INIT_DATA_REQUEST,
  INIT_DATA_SUCCESS,
  INIT_DATA_FAILURE,
  CLEAR_ERRORS,
} from '../constants';

const state = initialState;
const data = 'test data';
const error = { message: 'test error' };

describe('testAppReducer', () => {
  it('returns the initial state', () => {
    const expected = fromJS(initialState);
    expect(testAppReducer(undefined, {})).toEqual(expected);
  });

  it('handles INIT_DATA_REQUEST', () => {
    const expected = fromJS({ ...state, loading: true });
    const action = { type: INIT_DATA_REQUEST };
    expect(testAppReducer(undefined, action)).toEqual(expected);
  });

  it('handles INIT_DATA_SUCCESS', () => {
    const expected = fromJS({ ...state, loading: false, data });
    const action = { type: INIT_DATA_SUCCESS, payload: data };
    expect(testAppReducer(undefined, action)).toEqual(expected);
  });

  it('handles INIT_DATA_FAILURE', () => {
    const expected = fromJS({ ...state, loading: false, error });
    const action = { type: INIT_DATA_FAILURE, payload: error };
    expect(testAppReducer(undefined, action)).toEqual(expected);
  });

  it('handles CLEAR_ERRORS', () => {
    const expected = fromJS({ ...state, error: null });
    const action = { type: CLEAR_ERRORS };
    expect(testAppReducer(undefined, action)).toEqual(expected);
  });
});
