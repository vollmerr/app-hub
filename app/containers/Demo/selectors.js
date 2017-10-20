import { createSelector } from 'reselect';

/**
 * Direct selector to the spa state domain
 */
const selectDemoDomain = (state) => state.get('demo');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Spa
 */

const makeSelectDemo = () => createSelector(
  selectDemoDomain,
  (substate) => substate.toJS()
);

export default makeSelectDemo;
export {
  selectDemoDomain,
};
