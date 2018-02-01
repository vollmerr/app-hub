import { fromJS } from 'immutable';
import appHubReducer, { initialState } from '../reducer';

import allRoutes from '../routes';
import * as C from '../constants';


describe('appHubReducer', () => {
  let expected;
  beforeEach(() => {
    expected = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(appHubReducer(undefined, {})).toEqual(expected);
  });


  describe('CHANGE_MOBILE', () => {
    it('should change if the viewport is mobile', () => {
      expected = expected.setIn(['view', 'isMobile'], true);
      const action = { type: C.CHANGE_MOBILE, payload: true };

      expect(appHubReducer(undefined, action)).toEqual(expected);
    });
  });


  describe('CHANGE_PANEL_OPEN', () => {
    it('should change if the panel is open', () => {
      expected = expected.setIn(['view', 'panel', 'isOpen'], true);
      const action = { type: C.CHANGE_PANEL_OPEN, payload: true };

      expect(appHubReducer(undefined, action)).toEqual(expected);
    });
  });


  describe('CHANGE_PANEL_SELECTED', () => {
    it('should change the name of the selected panel', () => {
      expected = expected.setIn(['view', 'panel', 'name'], 'testPanel');
      const action = { type: C.CHANGE_PANEL_SELECTED, payload: 'testPanel' };

      expect(appHubReducer(undefined, action)).toEqual(expected);
    });
  });


  describe('CHANGE_APP', () => {
    it('should set the apps data and clear errors', () => {
      const routes = [{ key: 'test', name: 'route1', path: '/test' }];
      const meta = { desc: 'test desc' };
      const name = 'test name';
      expected = expected
        .setIn(['app', 'routes'], fromJS(routes))
        .setIn(['app', 'meta'], fromJS(meta))
        .setIn(['app', 'name'], name)
        .setIn(['app', 'home'], fromJS(routes[0]))
        .setIn(['app', 'error'], null);
      const action = { type: C.CHANGE_APP, payload: { routes, meta, name } };

      expect(appHubReducer(undefined, action)).toEqual(expected);
    });

    it('should not set a home route if no routes provided', () => {
      const routes = [];
      const meta = { desc: 'test desc' };
      const name = 'test name';
      expected = expected
        .setIn(['app', 'routes'], fromJS(routes))
        .setIn(['app', 'meta'], fromJS(meta))
        .setIn(['app', 'name'], name)
        .setIn(['app', 'home'], fromJS({}));
      const action = { type: C.CHANGE_APP, payload: { routes, meta, name } };

      expect(appHubReducer(undefined, action)).toEqual(expected);
    });
  });


  describe('CHANGE_APP_STATUS', () => {
    it('should set the apps status', () => {
      expected = expected
        .setIn(['app', 'loading'], 1)
        .setIn(['app', 'error'], null);
      let action = { type: C.CHANGE_APP_STATUS, payload: { loading: 1 } };

      expect(appHubReducer(undefined, action)).toEqual(expected);

      expected = expected
        .setIn(['app', 'loading'], 0)
        .setIn(['app', 'error'], 'test error');
      action = { type: C.CHANGE_APP_STATUS, payload: { error: 'test error' } };
      expect(appHubReducer(undefined, action)).toEqual(expected);
    });
  });


  describe('AUTH_USER_DONE', () => {
    it('should set the authenicated users information', () => {
      const payload = {
        sid: 'testSid',
        sam: 'testSam',
        name: 'test name',
        expire: 1234,
        roles: ['role1', 'role2'],
      };
      const user = {
        ...payload,
        routes: allRoutes.filter((x) => !x.roles),
        isAuthenticated: true,
      };

      expected = expected.set('user', fromJS(user));
      const action = { type: C.AUTH_USER_DONE, payload };

      expect(appHubReducer(undefined, action)).toEqual(expected);
    });

    it('should handle roles passes as single strings instead of arrays', () => {
      const payload = {
        sid: 'testSid',
        sam: 'testSam',
        name: 'test name',
        expire: 1234,
        roles: 'role1',
      };
      const user = {
        ...payload,
        roles: [payload.roles],
        routes: allRoutes.filter((x) => !x.roles),
        isAuthenticated: true,
      };

      expected = expected.set('user', fromJS(user));
      const action = { type: C.AUTH_USER_DONE, payload };

      expect(appHubReducer(undefined, action)).toEqual(expected);
    });

    it('should change the apps status when there is an error', () => {
      const error = new Error('test error');
      expected = expected
        .setIn(['app', 'error'], error)
        .setIn(['app', 'loading'], initialState.app.loading - 1);
      const action = { type: C.AUTH_USER_DONE, payload: error, error: true };

      expect(appHubReducer(undefined, action)).toEqual(expected);
    });
  });
});
