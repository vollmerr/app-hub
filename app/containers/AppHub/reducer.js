import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  APPS_PANEL,
  CHANGE_APP,
  CHANGE_APP_STATUS,
  AUTH_USER_DONE,
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

export default handleActions({
  // VIEW
  [CHANGE_MOBILE]: (state, action) => state.setIn(['view', 'isMobile'], action.payload),
  [CHANGE_PANEL_OPEN]: (state, action) => state.setIn(['view', 'panel', 'isOpen'], action.payload),
  [CHANGE_PANEL_SELECTED]: (state, action) => state.setIn(['view', 'panel', 'selected'], action.payload),
  // APP
  [CHANGE_APP]: (state, action) => {
    const { name, routes, meta } = action.payload;
    return state
      .setIn(['app', 'error'], null)
      .setIn(['app', 'loading'], false)
      .setIn(['app', 'name'], name)
      .setIn(['app', 'routes'], fromJS(routes))
      .setIn(['app', 'meta'], fromJS(meta));
  },
  [CHANGE_APP_STATUS]: (state, action) => {
    const { error, loading } = action.payload;

    return state
      .setIn(['app', 'error'], error || null)
      .setIn(['app', 'loading'], loading || false);
  },
  // USER
  [AUTH_USER_DONE]: (state, action) => {
    const { sam, roles, expire } = action.payload;

    if (action.error) {
      return state
        .setIn(['app', 'error'], action.payload)
        .setIn(['app', 'loading'], false);
    }

    return state
      .setIn(['user', 'sam'], sam)
      .setIn(['user', 'roles'], fromJS(roles))
      .setIn(['user', 'expire'], expire);
  },
}, fromJS(initialState));
