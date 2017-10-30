import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  EXAMPLE_DATA_SUCCESS,
} from './constants';

const initialState = fromJS({
  exampleData: {},
});

export default handleActions({
  [EXAMPLE_DATA_SUCCESS]: (state, action) => state.set('exampleData', action.payload),
}, fromJS(initialState));
