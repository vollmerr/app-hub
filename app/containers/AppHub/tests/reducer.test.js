
import { fromJS } from 'immutable';
import appHubReducer, { initialState } from '../reducer';

import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  CHANGE_APP,
  AUTH_USER_SUCCESS,
} from '../constants';

describe('appHubReducer', () => {
  it('returns the initial state', () => {
    expect(appHubReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('handles CHANGE_MOBILE', () => {
    const expected = initialState;
    expected.view.isMobile = true;
    const action = { type: CHANGE_MOBILE, isMobile: true };

    expect(appHubReducer(undefined, action)).toEqual(fromJS(expected));
  });

  it('handles CHANGE_PANEL_OPEN', () => {
    const expected = initialState;
    expected.view.panel.isOpen = true;
    const action = { type: CHANGE_PANEL_OPEN, isOpen: true };

    expect(appHubReducer(undefined, action)).toEqual(fromJS(expected));
  });

  it('handles CHANGE_PANEL_SELECTED', () => {
    const expected = initialState;
    expected.view.panel.selected = 'testPanel';
    const action = { type: CHANGE_PANEL_SELECTED, selected: 'testPanel' };

    expect(appHubReducer(undefined, action)).toEqual(fromJS(expected));
  });

  it('handles CHANGE_APP', () => {
    const routes = [{ name: 'route1', key: 'test' }];
    const meta = { desc: 'test desc' };
    const expected = initialState;
    expected.app.routes = routes;
    expected.app.meta = meta;
    const action = { type: CHANGE_APP, routes, meta };

    expect(appHubReducer(undefined, action)).toEqual(fromJS(expected));
  });

  it('handles AUTH_USER_SUCCESS', () => {
    const sam = 'testSam';
    const roles = ['role1', 'role2'];
    const expected = initialState;
    expected.user.sam = sam;
    expected.user.roles = roles;
    const action = { type: AUTH_USER_SUCCESS, sam, roles };

    expect(appHubReducer(undefined, action)).toEqual(fromJS(expected));
  });
});
