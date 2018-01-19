import { Map } from 'immutable';
import { createSelector } from 'reselect';


const selectPaasDomain = (state) => state.get('paas');
const selectAuthorizations = (state) => selectPaasDomain(state).get('authorizations');
const selectManager = (state) => selectPaasDomain(state).get('manager');
const selectReport = (state) => selectPaasDomain(state).get('report');

export const selectById = (state) => state.get('byId');
export const selectAllIds = (state) => state.get('allIds');

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

export const getManagerById = (type) => createSelector(
  [selectManager, selectAuthorizations],
  (manager, auths) => {
    const authsById = selectById(auths);
    const managerIds = manager.get(`${type}Ids`);
    const managerAuths = {};
    // for each auth id in manager[type] make an entry by looking up the authorization
    managerIds.forEach((id) => {
      managerAuths[id] = authsById.get(id);
    });
    return Map(managerAuths);
  }
);

export const getManagerList = (type) => createSelector(
  [selectManager, selectAuthorizations],
  (manager, auths) => {
    const authsById = selectById(auths);
    return manager.get(`${type}Ids`).map((id) => authsById.get(id));
  }
);

export const getReportList = (type) => createSelector(
  [selectReport, selectAuthorizations],
  (report, auths) => {
    const authsById = selectById(auths);
    return report.get(`${type}Ids`).map((id) => authsById.get(id));
  }
);
