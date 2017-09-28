import { createSelector } from 'reselect';

/**
 * Direct selector to the sagas state domain
 */
const selectSagasDomain = (state) => state.get('sagas');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Sagas
 */

const makeSelectSagasData = () => createSelector(
  selectSagasDomain,
  (substate) => substate.get('data')
);

export default makeSelectSagasData;
export {
  selectSagasDomain,
};
