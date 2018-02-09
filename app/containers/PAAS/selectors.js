import { Map } from 'immutable';
import { createSelector } from 'reselect';


const selectPaas = (state) => state.get('paas');
const selectAuthorizations = (state) => selectPaas(state).get('authorizations');
const selectManager = (state) => selectPaas(state).get('manager');
const selectReport = (state) => selectPaas(state).get('report');

export const selectById = (state) => state.get('byId');
// export const selectAllIds = (state) => state.get('allIds');

// export const getAuthorizations = () => createSelector(
//   selectAuthorizations,
//   (auths) => auths,
// );

// export const getAuthorizationsById = () => createSelector(
//   selectAuthorizations,
//   (auths) => selectById(auths)
// );

// export const getAuthorizationItems = () => createSelector(
//   selectAuthorizations,
//   (auths) => selectAllIds(auths).map((authId) => (
//     selectById(auths).get(authId)
//   ))
// );


// MANAGER

export const getManager = createSelector(selectManager, (manager) => manager);

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

export const getManagerItems = (type) => createSelector(
  [selectManager, selectAuthorizations],
  (manager, auths) => {
    const authsById = selectById(auths);
    return manager.get(`${type}Ids`).map((id) => authsById.get(id));
  }
);


// REPORT
export const getReport = createSelector(selectReport, (report) => report);

// export const getReportItems = (type) => createSelector(
//   [selectReport, selectAuthorizations],
//   (report, auths) => {
//     const authsById = selectById(auths);
//     return report.get(`${type}Ids`).map((id) => authsById.get(id));
//   }
// );

export const getReportData = createSelector(
  selectReport,
  (report) => {
    const filters = report.get('filters');
    const data = report.get('data');
    // only filter if one is found (expensive operation...)
    if (filters.some((filter) => filter !== 'ALL')) {
      return data.map((items) => (
        items.filter((item) => (
          filters.some((v, k) => (
            item.get(k) === v
          ))
        ))
      ));
    }
    // no filters, just return as is
    return data;
  }
);
