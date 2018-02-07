import { createSelector } from 'reselect';

import * as C from './constants';


const selectSpa = (state) => state.get('spa');
const selectUser = (state) => selectSpa(state).get('user');
const selectAdmin = (state) => selectSpa(state).get('admin');
const selectReport = (state) => selectSpa(state).get('report');
const selectRecipients = (state) => selectSpa(state).get('recipients');
const selectAcknowledgments = (state) => selectSpa(state).get('acknowledgments');
const selectGroups = (state) => selectSpa(state).get('groups');
const selectEnums = (state) => selectSpa(state).get('enums');

const selectById = (state) => state.get('byId');

// get an acknowledgment from the lookup by id
export const getAckById = (id) => createSelector(
  selectAcknowledgments,
  (ack) => selectById(ack).get(id)
);


// USER
export const getUser = createSelector(selectUser, (user) => user);
// selects array of users acknowlegments combined with recipient details based off type
export const getUserItems = (type) => createSelector(
  [selectUser, selectRecipients, selectAcknowledgments],
  (user, recipients, acks) => user.get(`${type}Ids`).map((id) => {
    const recipient = selectById(recipients).get(String(id));
    const ackId = String(recipient.get(C.RECIPIENT.ACK_ID));
    const ack = selectById(acks).get(ackId);
    return recipient.mergeDeep(ack).set('id', String(id));
  })
);


// ADMIN
export const getAdmin = createSelector(selectAdmin, (admin) => admin);
// selects array of users acknowlegments combined with recipient details based off type
export const geAdminItems = (type) => createSelector(
  [selectAdmin, selectAcknowledgments],
  (admin, acks) => admin.get(`${type}Ids`).map((id) => (
    selectById(acks).get(id)
  ))
);


// REPORT
export const getReport = createSelector(selectReport, (report) => report);
// get report data from the lookup by id
export const getReportData = createSelector(
  selectReport,
  (report) => selectById(report).get(report.get('id'))
);


// GROUPS
export const getGroups = createSelector(selectGroups, (groups) => groups);


// ENUMS
export const getEnums = createSelector(selectEnums, (enums) => enums);
