import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { unauthorizedRoute } from '../../utils/validate';

import allRoutes from './routes';
import * as C from './constants';


export const initialState = {
  user: {
    name: '',
    sam: '',
    sid: '',
    roles: [],
    routes: [],
    isAuthenticated: false,
  },
  app: {
    name: '',
    error: null,
    loading: 0,
    routes: [],
    meta: {},
  },
  view: {
    isMobile: false,
    subNav: false,
    panel: {
      isOpen: false,
      name: C.APPS_PANEL, // cannot be null/undefined or get error
    },
  },
};


export default handleActions({
  // VIEW
  [C.CHANGE_MOBILE]: (state, action) => state.setIn(['view', 'isMobile'], action.payload),

  [C.CHANGE_PANEL_OPEN]: (state, action) => state.setIn(['view', 'panel', 'isOpen'], action.payload),

  [C.CHANGE_PANEL_SELECTED]: (state, action) => state.setIn(['view', 'panel', 'name'], action.payload),

  // APP
  [C.CHANGE_APP]: (state, action) => {
    const { name, routes, meta } = action.payload;
    return state
      .setIn(['app', 'name'], name)
      .setIn(['app', 'routes'], fromJS(routes))
      .setIn(['app', 'meta'], fromJS(meta));
  },

  [C.CHANGE_APP_STATUS]: (state, action) => {
    const { error, loading } = action.payload;

    return state
      .setIn(['app', 'error'], error || null)
      .setIn(['app', 'loading'], loading || 0);
  },

  // USER
  [C.AUTH_USER_DONE]: (state, action) => {
    const { name, sam, sid, roles, expire } = action.payload;

    if (action.error) {
      return state
        .setIn(['app', 'error'], fromJS(action.payload))
        .setIn(['app', 'loading'], state.getIn(['app', 'loading']) - 1)
        .setIn(['user', 'isAuthenticated'], false);
    }

    const rolesArray = typeof roles === 'string' ? [roles] : roles;
    const validRoutes = allRoutes.filter((route) => !unauthorizedRoute(route, rolesArray));

    return state
      .setIn(['user', 'name'], name)
      .setIn(['user', 'sam'], sam)
      .setIn(['user', 'sid'], sid)
      .setIn(['user', 'roles'], fromJS(rolesArray))
      .setIn(['user', 'expire'], expire)
      .setIn(['user', 'routes'], fromJS(validRoutes))
      .setIn(['user', 'isAuthenticated'], true);
  },
}, fromJS(initialState));
