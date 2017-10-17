
import {
  exampleRequest,
  exampleSuccess,
  exampleFailure,
} from '../actions';

import {
  EXAMPLE_DATA_REQUEST,
  EXAMPLE_DATA_SUCCESS,
  EXAMPLE_DATA_FAILURE,
} from '../constants';


describe('actions', () => {
  describe('example Action', () => {
    it('has a type of EXAMPLE_DATA_REQUEST', () => {
      const expected = {
        type: EXAMPLE_DATA_REQUEST,
      };
      expect(exampleRequest()).toEqual(expected);
    });

    it('has a type of EXAMPLE_DATA_SUCCESS', () => {
      const expected = {
        type: EXAMPLE_DATA_SUCCESS,
      };
      expect(exampleSuccess()).toEqual(expected);
    });

    it('has a type of EXAMPLE_DATA_FAILURE', () => {
      const expected = {
        type: EXAMPLE_DATA_FAILURE,
      };
      expect(exampleFailure()).toEqual(expected);
    });
  });
});
