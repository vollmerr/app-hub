/*
 *
 * AppHub reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  APPS_PANEL,
} from './constants';

const initialState = fromJS({
  view: {
    isMobile: false,
    panel: {
      isOpen: true,
      selected: APPS_PANEL, // cannot be null/undefined or get error
    },
  },
});

function appHubReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MOBILE:
      return state
        .setIn(['view', 'isMobile'], action.isMobile);
    case CHANGE_PANEL_OPEN:
      return state
        .setIn(['view', 'panel', 'isOpen'], action.isOpen);
    case CHANGE_PANEL_SELECTED:
      return state
        .setIn(['view', 'panel', 'selected'], action.selected);
    default:
      return state;
  }
}

export default appHubReducer;
