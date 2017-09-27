/*
 *
 * Redux reducer
 *
 */

import { fromJS } from 'immutable';
import {
  EXAMPLE_ACTION,
} from './constants';

const initialState = fromJS({});

function withReduxReducer(state = initialState, action) {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return state
        .set('exampleData', action.data);
    default:
      return state;
  }
}

export default withReduxReducer;
