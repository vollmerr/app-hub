import { createSelector } from 'reselect';

import { RECIPIENT } from './constants';


const selectSpa = (state) => state.get('spa');
const selectUser = (state) => selectSpa(state).get('user');
const selectAdmin = (state) => selectSpa(state).get('admin');
const selectRecipients = (state) => selectSpa(state).get('recipients');
const selectAcknowledgments = (state) => selectSpa(state).get('acknowledgments');
const selectGroups = (state) => selectSpa(state).get('groups');
const selectEnums = (state) => selectSpa(state).get('enums');

const selectById = (state) => state.get('byId');
const selectCached = (state) => state.get('isCached');


// selects if user data is cached
export const getUserIsCached = () => createSelector(
  selectUser,
  (user) => selectCached(user)
);
// selects array of users acknowlegments combined with recipient details based off type
const getUserItems = (type) => (
  (user, recipients, acks) => user.get(type).map((id) => {
    const recipient = selectById(recipients).get(String(id));
    const ackId = String(recipient.get(RECIPIENT.ACK_ID));
    const ack = selectById(acks).get(ackId);
    return recipient.mergeDeep(ack).set('id', String(id));
  })
);
// selects array of users pending acknowlegments combined with recipient details
export const getUserPendingItems = () => createSelector(
  [selectUser, selectRecipients, selectAcknowledgments],
  getUserItems('recipientsPendingIds')
);
// selects array of users previous acknowlegments combined with recipient details
export const getUserPreviousItems = () => createSelector(
  [selectUser, selectRecipients, selectAcknowledgments],
  getUserItems('recipientsPreviousIds')
);


// selects if admin data is cached
export const getAdminIsCached = () => createSelector(
  selectAdmin,
  (admin) => selectCached(admin)
);
export const getAdminCachedIds = () => createSelector(
  selectAdmin,
  (admin) => admin.get('cachedIds')
);
// selects List of users acknowlegments based off type
const getAdminItems = (type) => (
  (admin, acks) => admin.get(type).map((id) => (
    selectById(acks).get(id)
  ))
);
// selects List of active acknowlegments
export const getAdminActiveItems = () => createSelector(
  [selectAdmin, selectAcknowledgments],
  getAdminItems('acksActiveIds')
);
// selects List of previous acknowlegments
export const getAdminPreviousItems = () => createSelector(
  [selectAdmin, selectAcknowledgments],
  getAdminItems('acksPreviousIds')
);


// selects 'recipients.byId'
export const getRecipientsById = () => createSelector(
  selectRecipients,
  (recipients) => selectById(recipients)
);


// groups
export const getGroupsById = () => createSelector(
  selectGroups,
  (groups) => selectById(groups)
);
export const getTargetGroupIds = () => createSelector(
  selectGroups,
  (groups) => groups.get('targetIds')
);


// enums
export const getEnums = () => createSelector(
  selectEnums,
  (enums) => enums
);
