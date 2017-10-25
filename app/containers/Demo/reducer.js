import { fromJS } from 'immutable';

import {
  EXAMPLE_DATA_REQUEST,
  EXAMPLE_DATA_SUCCESS,
  EXAMPLE_DATA_FAILURE,
  CLEAR_ERRORS,
} from './constants';

const initialState = fromJS({
  exampleData: {},
  error: null,
  loading: false,
});

function demoReducer(state = initialState, action) {
  switch (action.type) {
    case EXAMPLE_DATA_REQUEST:
      return state
        .set('loading', true)
        .set('error', null);
    case EXAMPLE_DATA_SUCCESS:
      return state
        .set('exampleData', action.data)
        .set('loading', false);
    case EXAMPLE_DATA_FAILURE:
      return state
        .set('loading', false)
        .set('error', action.error);
    case CLEAR_ERRORS:
      return state
        .set('error', null);
    default:
      return state;
  }
}

export default demoReducer;
