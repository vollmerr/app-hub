import { createSelector } from 'reselect';

/**
 * Direct selector to the appHubHeader state domain
 */
const selectAppHubHeaderDomain = (state) => state.get('appHubHeader');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AppHubHeader
 */

const makeSelectAppHubHeader = () => createSelector(
  selectAppHubHeaderDomain,
  (substate) => substate.toJS()
);

export default makeSelectAppHubHeader;
export {
  selectAppHubHeaderDomain,
};
