import reduxReducer, { initialState } from '../reducer';
import { EXAMPLE_ACTION } from '../constants';

const testData = { data: 'test data' };

describe('reduxReducer', () => {
  it('returns the initial state', () => {
    expect(reduxReducer(undefined, {}).toJS()).toEqual(initialState);
  });

  it('handles EXAMPLE_ACTION', () => {
    const expected = { exampleData: testData };
    const action = { type: EXAMPLE_ACTION, payload: testData };
    expect(reduxReducer(undefined, action).toJS()).toEqual(expected);
  });
});
