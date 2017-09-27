import { createSelector } from 'reselect';

/**
 * Direct selector to the appHubHome state domain
 */
const selectAppHubHomeDomain = (state) => state.get('appHubHome');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AppHubHome
 */

const makeSelectAppHubHome = () => createSelector(
  selectAppHubHomeDomain,
  (substate) => substate.toJS()
);

export default makeSelectAppHubHome;
export {
  selectAppHubHomeDomain,
};
