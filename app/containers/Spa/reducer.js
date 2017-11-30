import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  INIT_DATA_SUCCESS,
  DISABLE_ACK_SUCCESS,
  ACK,
  STATUS,
} from './constants';

export const initialState = {
  data: [],
};

export default handleActions({
  [INIT_DATA_SUCCESS]: (state, action) => state.set('data', fromJS(action.payload)),
  [DISABLE_ACK_SUCCESS]: (state, action) => state.update('data', (acks) => (
    acks.setIn(
      [acks.findIndex((x) => x.get(ACK.ID) === action.payload[ACK.ID]), ACK.STATUS],
      STATUS.DISABLED,
    )
  )),
}, fromJS(initialState));
