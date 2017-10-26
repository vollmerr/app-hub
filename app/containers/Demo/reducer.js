import { fromJS } from 'immutable';

import {
  EXAMPLE_DATA_SUCCESS,
} from './constants';

const initialState = fromJS({
  exampleData: {},
});

function demoReducer(state = initialState, action) {
  switch (action.type) {
    case EXAMPLE_DATA_SUCCESS:
      return state
        .set('exampleData', action.data);
    default:
      return state;
  }
}

export default demoReducer;
