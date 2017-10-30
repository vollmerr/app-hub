import { createSelector } from 'reselect';

/**
 * Direct selector to the DemoHome state domain
 */
const selectDemoDomain = (state) => state.get('demo');

/**
 * Other specific selectors
 */

const makeSelectExampleData = () => createSelector(
  selectDemoDomain,
  (substate) => substate.get('exampleData')
);

/**
 * Default selector used by DemoHome
 */

const makeSelectDemo = () => createSelector(
  selectDemoDomain,
  (substate) => substate.toJS()
);

export default makeSelectDemo;
export {
  selectDemoDomain,
  makeSelectExampleData,
};
