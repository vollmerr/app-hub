import { createSelector } from 'reselect';

/**
 * Direct selector to the spaHome state domain
 */
const selectSpaHomeDomain = (state) => state.get('spaHome');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SpaHome
 */

const makeSelectSpaHome = () => createSelector(
  selectSpaHomeDomain,
  (substate) => substate.toJS()
);

export default makeSelectSpaHome;
export {
  selectSpaHomeDomain,
};
