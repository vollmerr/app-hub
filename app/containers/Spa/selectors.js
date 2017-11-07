import { createSelector } from 'reselect';

const selectSpaDomain = (state) => state.get('spa');

const makeSelectSpaData = () => createSelector(
  selectSpaDomain,
  (substate) => substate.get('data')
);

const makeSelectSpa = () => createSelector(
  selectSpaDomain,
  (substate) => substate.toJS()
);

export default makeSelectSpa;
export {
  selectSpaDomain,
  makeSelectSpaData,
};
