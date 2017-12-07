import { createSelector } from 'reselect';


/**
 * Direct selector to the appHub state domain
 */
const selectAppHubDomain = (state) => state.get('appHub');


/**
 * Other specific selectors
 */

 // VIEW
const makeSelectView = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.get('view')
);

const makeSelectIsMobile = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['view', 'isMobile'])
);

const makeSelectPanel = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['view', 'panel'])
);

const makeSelectPanelIsOpen = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['view', 'panel', 'isOpen'])
);

const makeSelectPanelSelected = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['view', 'panel', 'selected'])
);

// APP
const makeSelectAppDomain = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.get('app')
);

const makeSelectApp = () => createSelector(
  makeSelectAppDomain(),
  (substate) => substate
);

const makeSelectAppName = () => createSelector(
  makeSelectAppDomain(),
  (substate) => substate.get('name')
);

const makeSelectAppRoutes = () => createSelector(
  makeSelectAppDomain(),
  (substate) => substate.get('routes')
);

const makeSelectAppMeta = () => createSelector(
  makeSelectAppDomain(),
  (substate) => substate.get('meta')
);

// USER
const makeSelectUser = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.get('user')
);

const makeSelectUserSid = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['user', 'sid'])
);

const makeSelectUserRoles = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['user', 'roles'])
);

/**
 * Default selector used by AppHub
 */

const makeSelectAppHub = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.toJS()
);

export default makeSelectAppHub;
export {
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
  makeSelectUserSid,
  makeSelectUserRoles,
};
