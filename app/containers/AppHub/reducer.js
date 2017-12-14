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
    loading: 0,
    routes: [],
    meta: {},
  },
  user: {
    sid: '',
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
      .setIn(['app', 'loading'], 0)
      .setIn(['app', 'name'], name)
      .setIn(['app', 'routes'], fromJS(routes))
      .setIn(['app', 'meta'], fromJS(meta));
  },
  [CHANGE_APP_STATUS]: (state, action) => {
    const { error, loading } = action.payload;

    return state
      .setIn(['app', 'error'], error || null)
      .setIn(['app', 'loading'], loading || 0);
  },
  // USER
  [AUTH_USER_DONE]: (state, action) => {
    const { sid, roles, expire } = action.payload;

    if (action.error) {
      return state
        .setIn(['app', 'error'], fromJS(action.payload))
        .setIn(['app', 'loading'], state.getIn(['app', 'loading']) - 1);
    }

    const rolesArray = typeof roles === 'string' ? [roles] : roles;

    return state
      .setIn(['user', 'sid'], sid)
      .setIn(['user', 'roles'], fromJS(rolesArray))
      .setIn(['user', 'expire'], expire);
  },
}, fromJS(initialState));
