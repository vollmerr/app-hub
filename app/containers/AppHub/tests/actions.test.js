
import {
  changeMobile,
  changePanelOpen,
  changePanelSelected,
  changeApp,
  changeAppStatus,
  authUser,
  authUserDone,
} from '../actions';

import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  CHANGE_APP,
  CHANGE_APP_STATUS,
  AUTH_USER,
  AUTH_USER_DONE,
} from '../constants';

describe('AppHub actions', () => {
  describe('view actions', () => {
    it('has a type of CHANGE_MOBILE', () => {
      const expected = {
        type: CHANGE_MOBILE,
      };
      expect(changeMobile(true)).toEqual({ ...expected, payload: true });
      expect(changeMobile(false)).toEqual({ ...expected, payload: false });
    });

    it('has a type of CHANGE_PANEL_OPEN', () => {
      const expected = {
        type: CHANGE_PANEL_OPEN,
      };
      expect(changePanelOpen(true)).toEqual({ ...expected, payload: true });
      expect(changePanelOpen(false)).toEqual({ ...expected, payload: false });
    });

    it('has a type of CHANGE_PANEL_SELECTED', () => {
      const expected = {
        type: CHANGE_PANEL_SELECTED,
      };
      expect(changePanelSelected('panel1')).toEqual({ ...expected, payload: 'panel1' });
      expect(changePanelSelected('panel2')).toEqual({ ...expected, payload: 'panel2' });
    });
  });

  describe('app actions', () => {
    it('has a type of CHANGE_APP', () => {
      const routes = [{ name: 'route 1', key: 1 }, { name: 'route 2', key: 2 }];
      const meta = { desc: 'test' };
      const expected = {
        payload: { meta, routes },
        type: CHANGE_APP,
      };
      expect(changeApp({ routes, meta })).toEqual(expected);
    });

    it('has a type of CHANGE_APP_STATUS', () => {
      const loading = true;
      const error = 'test error';
      const expected = {
        payload: { error, loading },
        type: CHANGE_APP_STATUS,
      };
      expect(changeAppStatus({ loading, error })).toEqual(expected);
    });
  });

  describe('user authenication actions', () => {
    it('has a type of AUTH_USER', () => {
      const expected = {
        type: AUTH_USER,
      };
      expect(authUser()).toEqual(expected);
    });

    it('has a type of AUTH_USER_DONE', () => {
      const sid = 'testSid';
      const roles = ['role1', 'role2'];
      const expected = {
        payload: { sid, roles },
        type: AUTH_USER_DONE,
      };
      expect(authUserDone({ sid, roles })).toEqual(expected);
    });

    it('has a type of AUTH_USER_DONE for errors', () => {
      const error = new Error('test error');
      const expected = {
        type: AUTH_USER_DONE,
        error: true,
        payload: error,
      };
      expect(authUserDone(error)).toEqual(expected);
    });
  });
});
