import { Map } from 'immutable';
import { createSelector } from 'reselect';


const selectPas = (state) => state.get('pas');
const selectAuthorizations = (state) => selectPas(state).get('authorizations');
const selectManager = (state) => selectPas(state).get('manager');
const selectReport = (state) => selectPas(state).get('report');

export const selectById = (state) => state.get('byId');

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
// get filtered report data
export const getReportData = createSelector(
  selectReport,
  (report) => {
    let filters = report.get('filters');
    filters = filters.filter((e) => e !== 'ALL');
    const data = report.get('data');
    // only filter if one is found (expensive operation...)
    if (data && filters.size) {
      return data.map((items) => (
        items.filter((item) => (
          filters.every((v, k) => (
            item.get(k) === v
          ))
        ))
      ));
    }
    // no filters, just return as is
    return data;
  }
);
