import { createSelector } from 'reselect';

/**
 * Direct selector to the redux state domain
 */
const selectReduxDomain = (state) => state.get('widthRedux');

/**
 * Other specific selectors
 */


/**
 * Default selector used by WithRedux
 */

const makeSelectExampleData = () => createSelector(
  selectReduxDomain,
  (substate) => substate.get('exampleData')
);

export default makeSelectExampleData;
export {
  selectReduxDomain,
  makeSelectExampleData,
};
