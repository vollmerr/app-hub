import { createSelector } from 'reselect';

/**
 * This selects the slice of the redux store for this container.
 * (immutable object, so must toJS() it if you want to use this directly).
 *
 * (named `redux` as this example is named redux, would normally
 * be the name lowercased of the container, ex: 'spa' for Spa)
 */
const selectReduxDomain = (state) => state.get('redux');

/**
 * Selects a section of the containers redux slice.
 *
 * Like this:
 *
 * {
 *  someOtherApp: {...},
 *  redux: { // entire `redux` slice selected in `selectReduxDomain`
 *    exampleData: { // just `redux.exampleData` from `makeSelectExampleData`
 *      stuff: {...}
 *    }
 *  }
 * }
 *
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
