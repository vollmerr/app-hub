
import {
  exampleAction,
} from '../actions';
import {
  EXAMPLE_ACTION,
} from '../constants';

describe('Redux actions', () => {
  describe('Example Action', () => {
    it('has a type of EXAMPLE_ACTION', () => {
      const expected = {
        type: EXAMPLE_ACTION,
      };
      expect(exampleAction()).toEqual(expected);
    });
  });
});
