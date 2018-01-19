
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

  it('handles `CHANGE_MOBILE`', () => {
    expected = expected.setIn(['view', 'isMobile'], true);
    const action = { type: C.CHANGE_MOBILE, payload: true };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles `CHANGE_PANEL_OPEN`', () => {
    expected = expected.setIn(['view', 'panel', 'isOpen'], true);
    const action = { type: C.CHANGE_PANEL_OPEN, payload: true };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles `CHANGE_PANEL_SELECTED`', () => {
    expected = expected.setIn(['view', 'panel', 'selected'], 'testPanel');
    const action = { type: C.CHANGE_PANEL_SELECTED, payload: 'testPanel' };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles `CHANGE_APP`', () => {
    const routes = [{ name: 'route1', key: 'test' }];
    const meta = { desc: 'test desc' };
    const name = 'test name';
    expected = expected
      .setIn(['app', 'routes'], fromJS(routes))
      .setIn(['app', 'meta'], fromJS(meta))
      .setIn(['app', 'name'], name);
    const action = { type: C.CHANGE_APP, payload: { routes, meta, name } };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles `CHANGE_APP_STATUS`', () => {
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

  it('handles `AUTH_USER_DONE`', () => {
    const name = 'test name';
    const sid = 'testSid';
    const sam = 'testSam';
    const roles = ['role1', 'role2'];
    const expire = 1234;
    expected = expected
      .setIn(['user', 'name'], name)
      .setIn(['user', 'sam'], sam)
      .setIn(['user', 'sid'], sid)
      .setIn(['user', 'roles'], fromJS(roles))
      .setIn(['user', 'expire'], expire)
      .setIn(['user', 'routes'], fromJS(allRoutes.filter((x) => !x.roles)));
    const action = { type: C.AUTH_USER_DONE, payload: { name, sam, sid, roles, expire } };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles `AUTH_USER_DONE` when strings passed (single value not in array)', () => {
    const name = 'test name';
    const sid = 'testSid';
    const sam = 'testSam';
    const roles = ['role1'];
    const expire = 1234;
    expected = expected
      .setIn(['user', 'name'], name)
      .setIn(['user', 'sam'], sam)
      .setIn(['user', 'sid'], sid)
      .setIn(['user', 'roles'], fromJS(roles))
      .setIn(['user', 'expire'], expire)
      .setIn(['user', 'routes'], fromJS(allRoutes.filter((x) => !x.roles)));
    const action = { type: C.AUTH_USER_DONE, payload: { name, sam, sid, roles: roles[0], expire } };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles `AUTH_USER_DONE` with errors', () => {
    const error = new Error('test error');
    expected = expected
      .setIn(['app', 'error'], error)
      .setIn(['app', 'loading'], initialState.app.loading - 1);
    const action = { type: C.AUTH_USER_DONE, payload: error, error: true };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });
});
