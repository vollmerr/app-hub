import { createSelector } from 'reselect';

/**
 * Direct selector to the appHub state domain
 */
const selectAppHubDomain = (state) => state.get('appHub');

/**
 * Other specific selectors
 */

const makeSelectIsMobile = () => createSelector(
  selectAppHubDomain,
  (substate) => substate.get('isMobile')
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
  makeSelectIsMobile,
};
