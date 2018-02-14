import { fromJS } from 'immutable';
import * as selectors from '../selectors';


const state = {
  appHub: {
    view: {
      isMobile: true,
      panel: {
        isOpen: true,
        name: 'test panel',
      },
    },
    app: {
      name: 'test name',
      routes: [{ name: 'test-route' }],
      meta: { desc: 'test desc' },
    },
    user: {
      name: 'test name',
      sid: 'testUser',
      roles: ['super duper admin', 'best admin ever'],
      routes: [{ name: 'route1' }],
    },
  },
};

const actual = fromJS(state);


describe('AppHub selectors', () => {
  describe('view selectors', () => {
    it('should select the entire state', () => {
      const selector = selectors.getView;
      const expected = fromJS(state.appHub.view);
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `panel`', () => {
      const selector = selectors.getViewPanel;
      const expected = fromJS(state.appHub.view.panel);
      expect(selector(actual)).toEqual(expected);
    });
  });


  describe('app selectors', () => {
    it('should select the entire state', () => {
      const selector = selectors.getApp;
      const expected = fromJS(state.appHub.app);
      expect(selector(actual)).toEqual(expected);
    });
  });


  describe('user selectors', () => {
    it('should select the entire state', () => {
      const selector = selectors.getUser;
      const expected = fromJS(state.appHub.user);
      expect(selector(actual)).toEqual(expected);
    });


    it('should select `sid`', () => {
      const selector = selectors.getUserSid;
      const expected = state.appHub.user.sid;
      expect(selector(actual)).toEqual(expected);
    });
  });
});
