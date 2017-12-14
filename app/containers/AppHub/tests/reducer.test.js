
import { fromJS } from 'immutable';
import appHubReducer, { initialState } from '../reducer';

import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  CHANGE_APP,
  CHANGE_APP_STATUS,
  AUTH_USER_DONE,
} from '../constants';

describe('appHubReducer', () => {
  let expected;
  beforeEach(() => {
    expected = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(appHubReducer(undefined, {})).toEqual(expected);
  });

  it('handles CHANGE_MOBILE', () => {
    expected = expected.setIn(['view', 'isMobile'], true);
    const action = { type: CHANGE_MOBILE, payload: true };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles CHANGE_PANEL_OPEN', () => {
    expected = expected.setIn(['view', 'panel', 'isOpen'], true);
    const action = { type: CHANGE_PANEL_OPEN, payload: true };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles CHANGE_PANEL_SELECTED', () => {
    expected = expected.setIn(['view', 'panel', 'selected'], 'testPanel');
    const action = { type: CHANGE_PANEL_SELECTED, payload: 'testPanel' };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles CHANGE_APP', () => {
    const routes = [{ name: 'route1', key: 'test' }];
    const meta = { desc: 'test desc' };
    const name = 'test name';
    expected = expected
      .setIn(['app', 'routes'], fromJS(routes))
      .setIn(['app', 'meta'], fromJS(meta))
      .setIn(['app', 'name'], name);
    const action = { type: CHANGE_APP, payload: { routes, meta, name } };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles CHANGE_APP_STATUS', () => {
    expected = expected
      .setIn(['app', 'loading'], 1)
      .setIn(['app', 'error'], null);
    let action = { type: CHANGE_APP_STATUS, payload: { loading: 1 } };

    expect(appHubReducer(undefined, action)).toEqual(expected);

    expected = expected
      .setIn(['app', 'loading'], 0)
      .setIn(['app', 'error'], 'test error');
    action = { type: CHANGE_APP_STATUS, payload: { error: 'test error' } };
    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles AUTH_USER_DONE', () => {
    const sid = 'testSid';
    const roles = ['role1', 'role2'];
    const expire = 1234;
    expected = expected
      .setIn(['user', 'sid'], sid)
      .setIn(['user', 'roles'], fromJS(roles))
      .setIn(['user', 'expire'], expire);
    const action = { type: AUTH_USER_DONE, payload: { sid, roles, expire } };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles AUTH_USER_DONE when strings passed (single value not in array)', () => {
    const sid = 'testSid';
    const roles = ['role1'];
    const expire = 1234;
    expected = expected
      .setIn(['user', 'sid'], sid)
      .setIn(['user', 'roles'], fromJS(roles))
      .setIn(['user', 'expire'], expire);
    const action = { type: AUTH_USER_DONE, payload: { sid, roles: roles[0], expire } };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles AUTH_USER_DONE with errors', () => {
    const error = new Error('test error');
    expected = expected
      .setIn(['app', 'error'], error)
      .setIn(['app', 'loading'], initialState.app.loading - 1);
    const action = { type: AUTH_USER_DONE, payload: error, error: true };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });
});
