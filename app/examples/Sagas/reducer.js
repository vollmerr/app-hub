/*
 *
 * Sagas reducer
 *
 */

import { fromJS } from 'immutable';
import {
  EXAMPLE_DATA_SUCCESS,
} from './constants';

const initialState = fromJS({
  data: {},
});

function sagasReducer(state = initialState, action) {
  switch (action.type) {
    case EXAMPLE_DATA_SUCCESS:
      return state
        .set('data', action.data);
    default:
      return state;
  }
}

export default sagasReducer;
