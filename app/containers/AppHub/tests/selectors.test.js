import { fromJS } from 'immutable';
import * as selectors from '../selectors';


const state = {
  appHub: {
    view: {
      isMobile: true,
      panel: {
        isOpen: true,
        selected: 'test panel',
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
  describe('selectAppHubDomain', () => {
    it('should select the entire state', () => {
      const expected = fromJS(state.appHub);
      expect(selectors.selectAppHubDomain(actual)).toEqual(expected);
    });
  });


  describe('view selectors', () => {
    it('should select the entire state', () => {
      const selector = selectors.makeSelectView();
      const expected = fromJS(state.appHub.view);
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `isMobile`', () => {
      const selector = selectors.makeSelectIsMobile();
      const expected = state.appHub.view.isMobile;
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `panel`', () => {
      const selector = selectors.makeSelectPanel();
      const expected = fromJS(state.appHub.view.panel);
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `panel.isOpen`', () => {
      const selector = selectors.makeSelectPanelIsOpen();
      const expected = state.appHub.view.panel.isOpen;
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `panel.selected`', () => {
      const selector = selectors.makeSelectPanelSelected();
      const expected = state.appHub.view.panel.selected;
      expect(selector(actual)).toEqual(expected);
    });
  });


  describe('app selectors', () => {
    it('should select the entire state', () => {
      const selector = selectors.makeSelectApp();
      const expected = fromJS(state.appHub.app);
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `name`', () => {
      const selector = selectors.makeSelectAppName();
      const expected = state.appHub.app.name;
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `routes`', () => {
      const selector = selectors.makeSelectAppRoutes();
      const expected = fromJS(state.appHub.app.routes);
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `meta`', () => {
      const selector = selectors.makeSelectAppMeta();
      const expected = fromJS(state.appHub.app.meta);
      expect(selector(actual)).toEqual(expected);
    });
  });


  describe('user selectors', () => {
    it('should select the entire state', () => {
      const selector = selectors.makeSelectUser();
      const expected = fromJS(state.appHub.user);
      expect(selector(actual)).toEqual(expected);
    });


    it('should select `sid`', () => {
      const selector = selectors.makeSelectUserSid();
      const expected = state.appHub.user.sid;
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `name`', () => {
      const selector = selectors.getUserName();
      const expected = state.appHub.user.name;
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `roles`', () => {
      const selector = selectors.makeSelectUserRoles();
      const expected = fromJS(state.appHub.user.roles);
      expect(selector(actual)).toEqual(expected);
    });

    it('should select `routes`', () => {
      const selector = selectors.getUserRoutes();
      const expected = fromJS(state.appHub.user.routes);
      expect(selector(actual)).toEqual(expected);
    });
  });
});
