import {
  initDataRequest,
  initDataSuccess,
  initDataFailure,
} from '../actions';

import {
  INIT_DATA_REQUEST,
  INIT_DATA_SUCCESS,
  INIT_DATA_FAILURE,
} from '../constants';

const payload = {
  data: 'test data',
};

describe('Paas actions', () => {
  describe('initial data Action', () => {
    it('has a type of INIT_DATA_REQUEST', () => {
      const expected = {
        type: INIT_DATA_REQUEST,
      };
      expect(initDataRequest()).toEqual(expected);
    });

    it('has a type of INIT_DATA_SUCCESS', () => {
      const expected = {
        payload,
        type: INIT_DATA_SUCCESS,
      };
      expect(initDataSuccess(payload)).toEqual(expected);
    });

    it('has a type of INIT_DATA_FAILURE', () => {
      const expected = {
        payload,
        type: INIT_DATA_FAILURE,
      };
      expect(initDataFailure(payload)).toEqual(expected);
    });
  });
});
