
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
      .setIn(['app', 'loading'], true)
      .setIn(['app', 'error'], null);
    let action = { type: CHANGE_APP_STATUS, payload: { loading: true } };

    expect(appHubReducer(undefined, action)).toEqual(expected);

    expected = expected
      .setIn(['app', 'loading'], false)
      .setIn(['app', 'error'], 'test error');
    action = { type: CHANGE_APP_STATUS, payload: { error: 'test error' } };
    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles AUTH_USER_DONE', () => {
    const sam = 'testSam';
    const roles = ['role1', 'role2'];
    expected = expected
      .setIn(['user', 'sam'], sam)
      .setIn(['user', 'roles'], fromJS(roles));
    const action = { type: AUTH_USER_DONE, payload: { sam, roles } };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });

  it('handles AUTH_USER_DONE with errors', () => {
    const error = new Error('test error');
    expected = expected
      .setIn(['app', 'error'], error)
      .setIn(['app', 'loading'], false);
    const action = { type: AUTH_USER_DONE, payload: error, error: true };

    expect(appHubReducer(undefined, action)).toEqual(expected);
  });
});
