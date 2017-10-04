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
const makeSelectApp = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.get('app')
);

const makeSelectAppRoutes = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['app', 'routes']).toJS()
);

const makeSelectAppMeta = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['app', 'meta']).toJS()
);

// USER
const makeSelectUser = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.get('user').toJS()
);

const makeSelectUserSam = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.getIn(['user', 'sam'])
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
  makeSelectAppRoutes,
  makeSelectAppMeta,

  makeSelectUser,
  makeSelectUserSam,
};
