import { testApiCall } from 'utils/testUtils';

import * as C from '../constants';
import * as actions from '../actions';


describe('Spa actions', () => {
  testApiCall('getManagerDataRequest', C.GET_MANAGER_DATA_REQUEST, actions);
  testApiCall('updateUsersRequest', C.UPDATE_USERS_REQUEST, actions);
  testApiCall('getReportDataRequest', C.GET_REPORT_DATA_REQUEST, actions);


  describe('setReportKey', () => {
    it('should set the report key', () => {
      const key = 'test';
      const expected = {
        type: C.SET_REPORT_KEY,
        payload: key,
      };
      expect(actions.setReportKey(key)).toEqual(expected);
    });
  });


  describe('setReportFilter', () => {
    it('should set the report filter', () => {
      const filter = {
        test: 'testing..',
      };
      const expected = {
        type: C.SET_REPORT_FILTER,
        payload: filter,
      };
      expect(actions.setReportFilter(filter)).toEqual(expected);
    });
  });
});

