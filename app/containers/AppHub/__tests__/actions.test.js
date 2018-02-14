import * as actions from '../actions';
import * as C from '../constants';


describe('AppHub actions', () => {
  describe('view actions', () => {
    it('has a type of `CHANGE_MOBILE`', () => {
      const expected = {
        type: C.CHANGE_MOBILE,
      };
      expect(actions.changeMobile(true)).toEqual({ ...expected, payload: true });
      expect(actions.changeMobile(false)).toEqual({ ...expected, payload: false });
    });

    it('has a type of `CHANGE_PANEL_OPEN`', () => {
      const expected = {
        type: C.CHANGE_PANEL_OPEN,
      };
      expect(actions.changePanelOpen(true)).toEqual({ ...expected, payload: true });
      expect(actions.changePanelOpen(false)).toEqual({ ...expected, payload: false });
    });

    it('has a type of `CHANGE_PANEL_SELECTED`', () => {
      const expected = {
        type: C.CHANGE_PANEL_SELECTED,
      };
      expect(actions.changePanelSelected('panel1')).toEqual({ ...expected, payload: 'panel1' });
      expect(actions.changePanelSelected('panel2')).toEqual({ ...expected, payload: 'panel2' });
    });
  });

  describe('app actions', () => {
    it('has a type of `CHANGE_APP`', () => {
      const routes = [{ name: 'route 1', key: 1 }, { name: 'route 2', key: 2 }];
      const meta = { desc: 'test' };
      const expected = {
        payload: { meta, routes },
        type: C.CHANGE_APP,
      };
      expect(actions.changeApp({ routes, meta })).toEqual(expected);
    });

    it('has a type of `CHANGE_APP_STATUS`', () => {
      const loading = true;
      const error = 'test error';
      const expected = {
        payload: { error, loading },
        type: C.CHANGE_APP_STATUS,
      };
      expect(actions.changeAppStatus({ loading, error })).toEqual(expected);
    });
  });

  describe('user authenication actions', () => {
    it('has a type of `AUTH_USER`', () => {
      const expected = {
        type: C.AUTH_USER,
      };
      expect(actions.authUser()).toEqual(expected);
    });

    it('has a type of `AUTH_USER_DONE`', () => {
      const sid = 'testSid';
      const roles = ['role1', 'role2'];
      const expected = {
        payload: { sid, roles },
        type: C.AUTH_USER_DONE,
      };
      expect(actions.authUserDone({ sid, roles })).toEqual(expected);
    });

    it('has a type of `AUTH_USER_DONE` for errors', () => {
      const error = new Error('test error');
      const expected = {
        type: C.AUTH_USER_DONE,
        error: true,
        payload: error,
      };
      expect(actions.authUserDone(error)).toEqual(expected);
    });
  });

  describe('render count (for d3)', () => {
    it('has a type of `INCREMENT_RENDER_COUNT`', () => {
      const component = 'test component';
      const mode = 'update';
      const expected = {
        type: C.INCREMENT_RENDER_COUNT,
        payload: { component, mode },
      };
      expect(actions.incrementRenderCount(component, mode)).toEqual(expected);
    });
  });
});
