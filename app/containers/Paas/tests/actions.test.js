import * as actions from '../actions';
import * as C from '../constants';


const payload = {
  data: 'test data',
};


describe('Paas actions', () => {
  describe('initial data Action', () => {
    it('has a type of `GET_MANAGER_DATA_REQUEST`', () => {
      const expected = {
        type: C.GET_MANAGER_DATA_REQUEST,
      };
      expect(actions.getManagerDataRequest()).toEqual(expected);
    });

    it('has a type of `GET_MANAGER_DATA_SUCCESS`', () => {
      const expected = {
        payload,
        type: C.GET_MANAGER_DATA_SUCCESS,
      };
      expect(actions.getManagerDataSuccess(payload)).toEqual(expected);
    });

    it('has a type of `GET_MANAGER_DATA_FAILURE`', () => {
      const expected = {
        payload,
        type: C.GET_MANAGER_DATA_FAILURE,
      };
      expect(actions.getManagerDataFailure(payload)).toEqual(expected);
    });
  });
});
