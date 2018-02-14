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
    home: {},
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
    const home = routes.length ? routes[0] : {};
    return state
      .setIn(['app', 'name'], name)
      .setIn(['app', 'routes'], fromJS(routes))
      .setIn(['app', 'home'], fromJS(home))
      .setIn(['app', 'meta'], fromJS(meta))
      .setIn(['app', 'error'], null);
  },


  [C.CHANGE_APP_STATUS]: (state, action) => {
    const { error, loading } = action.payload;
    const newState = state.setIn(['app', 'loading'], loading || 0);

    if (error) {
      return newState.setIn(['app', 'error'], error);
    }

    return newState;
  },

  // USER
  [C.AUTH_USER_DONE]: (state, action) => {
    const { name, sam, sid, roles, expire } = action.payload;
    const rolesArray = typeof roles === 'string' ? [roles] : roles;

    let error = action.error;
    let errorMessage = fromJS(action.payload);
    // if not already an error and if not a AppHub User, generate error
    if (!action.error && !rolesArray.includes(C.ROLES.USER)) {
      error = true;
      errorMessage = new Error('Unauthorized');
    }

    if (error) {
      return state
        .setIn(['app', 'error'], errorMessage)
        .setIn(['user', 'isAuthenticated'], false);
    }

    const validRoutes = allRoutes.filter((route) => !unauthorizedRoute(route, rolesArray));
    const user = {
      sid,
      sam,
      name,
      expire,
      roles: rolesArray,
      routes: validRoutes,
      isAuthenticated: true,
    };

    return state.set('user', fromJS(user));
  },
}, fromJS(initialState));
