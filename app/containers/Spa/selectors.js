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
const selectByAckId = (state, id) => selectById(state).filter((x) => (
  String(x.get(RECIPIENT.ACK_ID)) === String(id)
));
const selectIdExists = (state, id) => state.includes(String(id));
const selectCached = (state) => state.get('isCached');


const getSpa = () => createSelector(
  selectSpa,
  (substate) => substate
);


// selects if user data is cached
const getUserCached = () => createSelector(
  selectUser,
  (user) => selectCached(user)
);
// selects array of users acknowlegments combined with recipient details based off type
const getUserAcks = (type) => (
  (user, recipients, acks) => user.get(type).map((id) => {
    const recipient = selectById(recipients).get(String(id));
    const ackId = String(recipient.get(RECIPIENT.ACK_ID));
    const ack = selectById(acks).get(ackId);
    return recipient.mergeDeep(ack).set('id', String(id));
  })
);
// selects array of users pending acknowlegments combined with recipient details
const getUserPendingAcks = () => createSelector(
  [selectUser, selectRecipients, selectAcknowledgments],
  getUserAcks('recipientsPendingIds')
);
// selects array of users previous acknowlegments combined with recipient details
const getUserPreviousAcks = () => createSelector(
  [selectUser, selectRecipients, selectAcknowledgments],
  getUserAcks('recipientsPreviousIds')
);


// selects List of users acknowlegments based off type
const getAdminAcks = (type) => (
  (admin, acks) => admin.get(type).map((id) => (
    selectById(acks).get(id)
  ))
);
// selects if admin data is cached
const getAdminCached = () => createSelector(
  selectAdmin,
  (admin) => selectCached(admin)
);
const getAdminCachedIds = () => createSelector(
  selectAdmin,
  (admin) => admin.get('cachedIds')
);
// selects List of active acknowlegments
const getAdminActiveAcks = () => createSelector(
  [selectAdmin, selectAcknowledgments],
  getAdminAcks('acksActiveIds')
);
// selects List of previous acknowlegments
const getAdminPreviousAcks = () => createSelector(
  [selectAdmin, selectAcknowledgments],
  getAdminAcks('acksPreviousIds')
);


// selects 'recipients'
const getRecipients = () => createSelector(
  selectRecipients,
  (recipients) => recipients
);


// groups
const getGroups = () => createSelector(
  selectGroups,
  (groups) => groups
);


// enums
const getEnums = () => createSelector(
  selectEnums,
  (enums) => enums
);


export {
  // spa
  getSpa,
  // user
  getUserCached,
  getUserPendingAcks,
  getUserPreviousAcks,
  // admin
  getAdminCached,
  getAdminCachedIds,
  getAdminActiveAcks,
  getAdminPreviousAcks,
  // recipients
  getRecipients,
  // groups
  getGroups,
  // enums
  getEnums,
  // util selectors
  selectById,
  selectByAckId,
  selectIdExists,
};
