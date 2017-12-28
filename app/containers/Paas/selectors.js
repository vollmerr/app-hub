import { createSelector } from 'reselect';

const selectPaasDomain = (state) => state.get('paas');

const makeSelectPaasData = () => createSelector(
  selectPaasDomain,
  (substate) => substate.get('data')
);

const makeSelectPaas = () => createSelector(
  selectPaasDomain,
  (substate) => substate.toJS()
);

export default makeSelectPaas;
export {
  selectPaasDomain,
  makeSelectPaasData,
};
