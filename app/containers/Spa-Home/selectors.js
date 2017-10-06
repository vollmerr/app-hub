import { createSelector } from 'reselect';

/**
 * Direct selector to the spaHome state domain
 */
const selectSpaHomeDomain = (state) => state.get('spaHome');

/**
 * Other specific selectors
 */

const makeSelectExampleData = () => createSelector(
  selectSpaHomeDomain,
  (substate) => substate.get('exampleData')
);

const makeSelectError = () => createSelector(
  selectSpaHomeDomain,
  (substate) => substate.get('error')
);

const makeSelectLoading = () => createSelector(
  selectSpaHomeDomain,
  (substate) => substate.get('loading')
);


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
  makeSelectExampleData,
  makeSelectError,
  makeSelectLoading,
};
