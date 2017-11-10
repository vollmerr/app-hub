import { createSelector } from 'reselect';

const selectSpaDomain = (state) => state.get('spa');

const makeSelectSpaData = () => createSelector(
  selectSpaDomain,
  (substate) => substate.get('data')
);

const makeSelectPendingAcks = () => createSelector(
  makeSelectSpaData(),
  (substate) => substate.get('pendingAcks').toJS()
);

const makeSelectPreviousAcks = () => createSelector(
  makeSelectSpaData(),
  (substate) => substate.get('previousAcks').toJS()
);

const makeSelectSpa = () => createSelector(
  selectSpaDomain,
  (substate) => substate.toJS()
);

export default makeSelectSpa;
export {
  selectSpaDomain,
  makeSelectSpaData,
  makeSelectPendingAcks,
  makeSelectPreviousAcks,
};
