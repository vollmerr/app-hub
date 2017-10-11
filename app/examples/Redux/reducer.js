/*
 *
 * Redux reducer
 *
 */

import { fromJS } from 'immutable';
import {
  EXAMPLE_ACTION,
} from './constants';

export const initialState = fromJS({
  exampleData: null,
});

function reduxReducer(state = initialState, action) {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return state
        .set('exampleData', action.data);
    default:
      return state;
  }
}

export default reduxReducer;
