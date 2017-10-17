
import { fromJS } from 'immutable';
import sagasReducer, { initialState } from '../reducer';
import { EXAMPLE_DATA_SUCCESS } from '../constants';

const testData = { data: 'test data' };


describe('sagasReducer', () => {
  it('returns the initial state', () => {
    expect(sagasReducer(undefined, {})).toEqual(initialState);
  });

  it('handles EXAMPLE_DATA_SUCCESS', () => {
    const expected = fromJS(testData);
    const action = { type: EXAMPLE_DATA_SUCCESS, ...testData };
    expect(sagasReducer(undefined, action)).toEqual(expected);
  });
});
