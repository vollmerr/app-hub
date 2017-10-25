import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { CLEAR_ERRORS } from 'containers/AppHub/constants';

import {
  EXAMPLE_DATA_REQUEST,
  EXAMPLE_DATA_SUCCESS,
  EXAMPLE_DATA_FAILURE,
} from './constants';

export const initialState = fromJS({
  data: null,
  loading: false,
  error: null,
});

const actions = {
  [EXAMPLE_DATA_REQUEST]: (state) => state.set('loading', true),

  [EXAMPLE_DATA_SUCCESS]: (state, action) => (
    state
      .set('loading', false)
      .set('data', fromJS(action.payload))
  ),

  [EXAMPLE_DATA_FAILURE]: (state, action) => (
    state
      .set('loading', false)
      .set('error', fromJS(action.payload))
  ),

  [CLEAR_ERRORS]: (state) => state.set('error', null),
};

export default handleActions(actions, initialState);
