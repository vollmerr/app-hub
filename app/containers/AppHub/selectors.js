import { createSelector } from 'reselect';

/**
 * Direct selector to the appHub state domain
 */
const selectAppHubDomain = (state) => state.get('appHub');

/**
 * Other specific selectors
 */

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
};
