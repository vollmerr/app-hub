/*
 *
 * AppHub reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_MOBILE,
} from './constants';

const initialState = fromJS({
  isMobile: false,
});

function appHubReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MOBILE:
      return state
        .set('isMobile', action.isMobile);
    default:
      return state;
  }
}

export default appHubReducer;
