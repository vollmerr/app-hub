import { createSelector } from 'reselect';

const selectPaasDomain = (state) => state.get('paas');
const selectAuthorizations = (state) => selectPaasDomain(state).get('authorizations');

export const selectById = (state) => state.get('byId');
export const selectAllIds = (state) => state.get('allIds');

const makeSelectPaasData = () => createSelector(
  selectPaasDomain,
  (substate) => substate.get('data')
);

const makeSelectPaas = () => createSelector(
  selectPaasDomain,
  (substate) => substate.toJS()
);


export const getAuthorizations = () => createSelector(
  selectAuthorizations,
  (auths) => auths,
);

export const getAuthorizationList = () => createSelector(
  selectAuthorizations,
  (auths) => selectAllIds(auths).map((authId) => (
    selectById(auths).get(authId)
  ))
);

export default makeSelectPaas;
export {
  selectPaasDomain,
  makeSelectPaasData,
};
