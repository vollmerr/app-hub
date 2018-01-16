import { Map } from 'immutable';
import { createSelector } from 'reselect';


const selectPaasDomain = (state) => state.get('paas');
const selectAuthorizations = (state) => selectPaasDomain(state).get('authorizations');
const selectManager = (state) => selectPaasDomain(state).get('manager');

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


export const getManagerAuths = (type) => createSelector(
  [selectManager, selectAuthorizations],
  (manager, auths) => {
    const authsById = selectById(auths);
    const managerIds = manager.get(type);
    const managerAuths = {};
    // for each auth id in manager[type] make an entry by looking up the authorization
    managerIds.forEach((id) => {
      managerAuths[id] = authsById.get(id);
    });
    return Map(managerAuths);
  }
);

export const getManagerAuthsList = (type) => createSelector(
  [selectManager, selectAuthorizations],
  (manager, auths) => {
    const authsById = selectById(auths);
    return manager.get(type).map((id) => authsById.get(id));
  }
);


export default makeSelectPaas;
export {
  selectPaasDomain,
  makeSelectPaasData,
};
