import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  INIT_DATA_REQUEST,
  INIT_DATA_SUCCESS,
  INIT_DATA_FAILURE,
  CLEAR_ERRORS,
} from './constants';

export const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default handleActions({
  [INIT_DATA_REQUEST]: (state) => state.set('loading', true),

  [INIT_DATA_SUCCESS]: (state, action) => (
    state
      .set('loading', false)
      .set('data', fromJS(action.payload))
  ),

  [INIT_DATA_FAILURE]: (state, action) => (
    state
      .set('loading', false)
      .set('error', fromJS(action.payload))
  ),

  [CLEAR_ERRORS]: (state) => state.set('error', null),
}, fromJS(initialState));
