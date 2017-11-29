import { fromJS } from 'immutable';
import makeSelectAppHub, {
  selectAppHubDomain,
  makeSelectView,
  makeSelectIsMobile,
  makeSelectPanel,
  makeSelectPanelIsOpen,
  makeSelectPanelSelected,
  makeSelectApp,
  makeSelectAppName,
  makeSelectAppRoutes,
  makeSelectAppMeta,
  makeSelectUser,
  makeSelectUserSam,
  makeSelectUserRoles,
} from '../selectors';

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
      sam: 'testUser',
      roles: ['super duper admin', 'best admin ever'],
    },
  },
};

const actual = fromJS(state);

describe('selectAppHubDomain', () => {
  it('should select the entire state', () => {
    const expected = fromJS(state.appHub);
    expect(selectAppHubDomain(actual)).toEqual(expected);

    const selector = makeSelectAppHub();
    expect(selector(actual)).toEqual(state.appHub);
  });
});

describe('view selectors', () => {
  it('should select the entire state', () => {
    const selector = makeSelectView();
    const expected = fromJS(state.appHub.view);
    expect(selector(actual)).toEqual(expected);
  });

  it('should select `isMobile`', () => {
    const selector = makeSelectIsMobile();
    const expected = state.appHub.view.isMobile;
    expect(selector(actual)).toEqual(expected);
  });

  it('should select `panel`', () => {
    const selector = makeSelectPanel();
    const expected = fromJS(state.appHub.view.panel);
    expect(selector(actual)).toEqual(expected);
  });

  it('should select `panel.isOpen`', () => {
    const selector = makeSelectPanelIsOpen();
    const expected = state.appHub.view.panel.isOpen;
    expect(selector(actual)).toEqual(expected);
  });

  it('should select `panel.selected`', () => {
    const selector = makeSelectPanelSelected();
    const expected = state.appHub.view.panel.selected;
    expect(selector(actual)).toEqual(expected);
  });
});


describe('app selectors', () => {
  it('should select the entire state', () => {
    const selector = makeSelectApp();
    const expected = fromJS(state.appHub.app);
    expect(selector(actual)).toEqual(expected);
  });

  it('should select `name`', () => {
    const selector = makeSelectAppName();
    const expected = state.appHub.app.name;
    expect(selector(actual)).toEqual(expected);
  });

  it('should select `routes`', () => {
    const selector = makeSelectAppRoutes();
    const expected = fromJS(state.appHub.app.routes);
    expect(selector(actual)).toEqual(expected);
  });

  it('should select `meta`', () => {
    const selector = makeSelectAppMeta();
    const expected = fromJS(state.appHub.app.meta);
    expect(selector(actual)).toEqual(expected);
  });
});


describe('user selectors', () => {
  it('should select the entire state', () => {
    const selector = makeSelectUser();
    const expected = fromJS(state.appHub.user);
    expect(selector(actual)).toEqual(expected);
  });

  it('should select `sam`', () => {
    const selector = makeSelectUserSam();
    const expected = state.appHub.user.sam;
    expect(selector(actual)).toEqual(expected);
  });

  it('should select `roles`', () => {
    const selector = makeSelectUserRoles();
    const expected = fromJS(state.appHub.user.roles);
    expect(selector(actual)).toEqual(expected);
  });
});
