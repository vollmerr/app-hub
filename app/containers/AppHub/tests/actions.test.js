
import {
  changeMobile,
  changePanelOpen,
  changePanelSelected,
  changeApp,
  changeAppStatus,
  authUserRequest,
  authUserSuccess,
  authUserFailure,
} from '../actions';

import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  CHANGE_APP,
  CHANGE_APP_STATUS,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
} from '../constants';

describe('AppHub actions', () => {
  describe('view actions', () => {
    it('has a type of CHANGE_MOBILE', () => {
      const expected = {
        type: CHANGE_MOBILE,
      };
      expect(changeMobile(true)).toEqual({ ...expected, isMobile: true });
      expect(changeMobile(false)).toEqual({ ...expected, isMobile: false });
    });

    it('has a type of CHANGE_PANEL_OPEN', () => {
      const expected = {
        type: CHANGE_PANEL_OPEN,
      };
      expect(changePanelOpen(true)).toEqual({ ...expected, isOpen: true });
      expect(changePanelOpen(false)).toEqual({ ...expected, isOpen: false });
    });

    it('has a type of CHANGE_PANEL_SELECTED', () => {
      const expected = {
        type: CHANGE_PANEL_SELECTED,
      };
      expect(changePanelSelected('panel1')).toEqual({ ...expected, selected: 'panel1' });
      expect(changePanelSelected('panel2')).toEqual({ ...expected, selected: 'panel2' });
    });
  });

  describe('app actions', () => {
    it('has a type of CHANGE_APP', () => {
      const routes = [{ name: 'route 1', key: 1 }, { name: 'route 2', key: 2 }];
      const meta = { desc: 'test' };
      const expected = {
        meta,
        routes,
        type: CHANGE_APP,
      };
      expect(changeApp({ routes, meta })).toEqual(expected);
    });

    it('has a type of CHANGE_APP_STATUS', () => {
      const loading = true;
      const error = 'test error';
      const expected = {
        error,
        loading,
        type: CHANGE_APP_STATUS,
      };
      expect(changeAppStatus({ loading, error })).toEqual(expected);
    });
  });

  describe('user authenication actions', () => {
    it('has a type of AUTH_USER_REQUEST', () => {
      const expected = {
        type: AUTH_USER_REQUEST,
      };
      expect(authUserRequest()).toEqual(expected);
    });

    it('has a type of AUTH_USER_SUCCESS', () => {
      const sam = 'testSam';
      const roles = ['role1', 'role2'];
      const expected = {
        sam,
        roles,
        type: AUTH_USER_SUCCESS,
      };
      expect(authUserSuccess(sam, roles)).toEqual(expected);
    });

    it('has a type of AUTH_USER_FAILURE', () => {
      const expected = {
        type: AUTH_USER_FAILURE,
      };
      expect(authUserFailure()).toEqual(expected);
    });
  });
});
