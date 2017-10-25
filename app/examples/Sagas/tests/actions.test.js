import {
  exampleRequest,
  exampleSuccess,
  exampleFailure,
  clearErrors,
} from '../actions';

import {
  EXAMPLE_DATA_REQUEST,
  EXAMPLE_DATA_SUCCESS,
  EXAMPLE_DATA_FAILURE,
  CLEAR_ERRORS,
} from '../constants';

const payload = {
  data: 'test data',
};

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
        payload,
        type: EXAMPLE_DATA_SUCCESS,
      };
      expect(exampleSuccess(payload)).toEqual(expected);
    });

    it('has a type of EXAMPLE_DATA_FAILURE', () => {
      const expected = {
        payload,
        type: EXAMPLE_DATA_FAILURE,
      };
      expect(exampleFailure(payload)).toEqual(expected);
    });

    it('has a type of CLEAR_ERRORS', () => {
      const expected = {
        type: CLEAR_ERRORS,
      };
      expect(clearErrors()).toEqual(expected);
    });
  });
});
