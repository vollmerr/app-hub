import { createSelector } from 'reselect';

/**
 * Direct selector to the spa state domain
 */
const selectSpaDomain = (state) => state.get('spa');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Spa
 */

const makeSelectSpa = () => createSelector(
  selectSpaDomain,
  (substate) => substate.toJS()
);

export default makeSelectSpa;
export {
  selectSpaDomain,
};
