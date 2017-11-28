import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  INIT_DATA_SUCCESS,
} from './constants';

export const initialState = {
  data: [],
};

export default handleActions({
  [INIT_DATA_SUCCESS]: (state, action) => state.set('data', fromJS(action.payload)),
}, fromJS(initialState));
