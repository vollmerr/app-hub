import { createSelector } from 'reselect';

/**
 * Direct selector to the DemoHome state domain
 */
const selectDemoHomeDomain = (state) => state.get('demoHome');

/**
 * Other specific selectors
 */

const makeSelectExampleData = () => createSelector(
  selectDemoHomeDomain,
  (substate) => substate.get('exampleData')
);

const makeSelectError = () => createSelector(
  selectDemoHomeDomain,
  (substate) => substate.get('error')
);

const makeSelectLoading = () => createSelector(
  selectDemoHomeDomain,
  (substate) => substate.get('loading')
);


/**
 * Default selector used by DemoHome
 */

const makeSelectDemoHome = () => createSelector(
  selectDemoHomeDomain,
  (substate) => substate.toJS()
);

export default makeSelectDemoHome;
export {
  selectDemoHomeDomain,
  makeSelectExampleData,
  makeSelectError,
  makeSelectLoading,
};
