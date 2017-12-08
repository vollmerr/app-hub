import { testApiCall } from 'utils/testUtils';

import * as C from '../constants';
import * as actions from '../actions';


describe('Spa actions', () => {
  testApiCall('getUserDataRequest', C.GET_USER_DATA_REQUEST, actions);
  testApiCall('getAdminDataRequest', C.GET_ADMIN_DATA_REQUEST, actions);
  testApiCall('getAckRecipientsRequest', C.GET_ACK_RECIPIENTS_REQUEST, actions);
  testApiCall('newAckRequest', C.NEW_ACK_REQUEST, actions);
  testApiCall('disableAckRequest', C.DISABLE_ACK_REQUEST, actions);
});
