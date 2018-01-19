import { createSelector } from 'reselect';


export const selectAppHubDomain = (state) => state.get('appHub');
export const selectApp = (state) => selectAppHubDomain(state).get('app');

 // VIEW
export const makeSelectView = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.get('view')
);

export const makeSelectIsMobile = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['view', 'isMobile'])
);

export const makeSelectPanel = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['view', 'panel'])
);

export const makeSelectPanelIsOpen = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['view', 'panel', 'isOpen'])
);

export const makeSelectPanelSelected = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['view', 'panel', 'selected'])
);

// APP
export const makeSelectAppDomain = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.get('app')
);

export const makeSelectApp = () => createSelector(
  makeSelectAppDomain(),
  (substate) => substate
);

export const makeSelectAppName = () => createSelector(
  makeSelectAppDomain(),
  (substate) => substate.get('name')
);

export const makeSelectAppRoutes = () => createSelector(
  makeSelectAppDomain(),
  (substate) => substate.get('routes')
);

export const makeSelectAppMeta = () => createSelector(
  makeSelectAppDomain(),
  (substate) => substate.get('meta')
);

// USER
export const makeSelectUser = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.get('user')
);

export const makeSelectUserSid = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['user', 'sid'])
);

export const getUserName = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['user', 'name'])
);

export const makeSelectUserRoles = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['user', 'roles'])
);

export const getUserRoutes = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['user', 'routes'])
);

