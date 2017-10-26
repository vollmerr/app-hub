import { createSelector } from 'reselect';

const selectTestAppDomain = (state) => state.get('testApp');

const makeSelectTestAppData = () => createSelector(
  selectTestAppDomain,
  (substate) => substate.get('data')
);

const makeSelectTestAppError = () => createSelector(
  selectTestAppDomain,
  (substate) => substate.get('error')
);

const makeSelectTestAppLoading = () => createSelector(
  selectTestAppDomain,
  (substate) => substate.get('loading')
);

const makeSelectTestApp = () => createSelector(
  selectTestAppDomain,
  (substate) => substate.toJS()
);

export default makeSelectTestApp;
export {
  selectTestAppDomain,
  makeSelectTestAppData,
  makeSelectTestAppError,
  makeSelectTestAppLoading,
};
