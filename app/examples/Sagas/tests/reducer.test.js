
import { fromJS } from 'immutable';

import { CLEAR_ERRORS } from 'containers/AppHub/constants';
import sagasReducer, { initialState } from '../reducer';
import {
  EXAMPLE_DATA_REQUEST,
  EXAMPLE_DATA_SUCCESS,
  EXAMPLE_DATA_FAILURE,
} from '../constants';

const state = initialState.toJS();
const data = 'test data';
const error = { message: 'test error' };

describe('sagasReducer', () => {
  it('returns the initial state', () => {
    expect(sagasReducer(undefined, {})).toEqual(initialState);
  });

  it('handles EXAMPLE_DATA_REQUEST', () => {
    const expected = fromJS({ ...state, loading: true });
    const action = { type: EXAMPLE_DATA_REQUEST };
    expect(sagasReducer(undefined, action)).toEqual(expected);
  });

  it('handles EXAMPLE_DATA_SUCCESS', () => {
    const expected = fromJS({ ...state, loading: false, data });
    const action = { type: EXAMPLE_DATA_SUCCESS, payload: data };
    expect(sagasReducer(undefined, action)).toEqual(expected);
  });

  it('handles EXAMPLE_DATA_FAILURE', () => {
    const expected = fromJS({ ...state, loading: false, error });
    const action = { type: EXAMPLE_DATA_FAILURE, payload: error };
    expect(sagasReducer(undefined, action)).toEqual(expected);
  });

  it('handles CLEAR_ERRORS', () => {
    const expected = fromJS({ ...state, error: null });
    const action = { type: CLEAR_ERRORS };
    expect(sagasReducer(undefined, action)).toEqual(expected);
  });
});
