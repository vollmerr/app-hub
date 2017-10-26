import { fromJS } from 'immutable';

import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  APPS_PANEL,
  CHANGE_APP,
  CHANGE_APP_STATUS,
  AUTH_USER_SUCCESS,
} from './constants';

export const initialState = {
  view: {
    isMobile: false,
    panel: {
      isOpen: false,
      selected: APPS_PANEL, // cannot be null/undefined or get error
    },
  },
  app: {
    name: '',
    error: null,
    loading: false,
    routes: [],
    meta: {},
  },
  user: {
    sam: '',
    roles: [],
  },
};

function appHubReducer(state = fromJS(initialState), action) {
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
    case CHANGE_APP:
      return state
        .setIn(['app', 'error'], null)
        .setIn(['app', 'loading'], false)
        .setIn(['app', 'name'], action.name)
        .setIn(['app', 'routes'], fromJS(action.routes))
        .setIn(['app', 'meta'], fromJS(action.meta));
    case CHANGE_APP_STATUS:
      return state
        .setIn(['app', 'error'], fromJS(action.error))
        .setIn(['app', 'loading'], action.loading);
    case AUTH_USER_SUCCESS:
      return state
        .setIn(['user', 'sam'], action.sam)
        .setIn(['user', 'roles'], fromJS(action.roles));
    default:
      return state;
  }
}

export default appHubReducer;
