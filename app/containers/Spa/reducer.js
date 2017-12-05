import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  INIT_DATA_SUCCESS,
  DISABLE_ACK_SUCCESS,
  GET_RECIPIENTS_SUCCESS,
  RECIPIENT,
  ACK,
  STATUS,
} from './constants';

export const initialState = {
  data: [],
  recipients: {},
};

export default handleActions({
  [INIT_DATA_SUCCESS]: (state, action) => state.set('data', fromJS(action.payload)),
  [DISABLE_ACK_SUCCESS]: (state, action) => state.update('data', (acks) => (
    acks.setIn(
      [acks.findIndex((x) => x.get(ACK.ID) === action.payload[ACK.ID]), ACK.STATUS],
      STATUS.DISABLED,
    )
  )),
  [GET_RECIPIENTS_SUCCESS]: (state, action) => {
    const id = action.payload[0] && action.payload[0][RECIPIENT.ACK_ID];
    if (id) {
      return state.setIn(['recipients', id], fromJS(action.payload));
    }
    return state;
  },
}, fromJS(initialState));
