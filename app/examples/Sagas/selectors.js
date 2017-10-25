import { createSelector } from 'reselect';

/**
 * Direct selector to the sagas state domain
 */
const selectSagasDomain = (state) => state.get('sagas');

/**
 * Other specific selectors
 */

const makeSelectSagasLoading = () => createSelector(
  selectSagasDomain,
  (substate) => substate.get('loading')
);

const makeSelectSagasError = () => createSelector(
  selectSagasDomain,
  (substate) => substate.get('error')
);

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
  makeSelectSagasLoading,
  makeSelectSagasError,
};
