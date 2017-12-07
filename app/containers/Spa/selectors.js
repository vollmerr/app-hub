import { createSelector } from 'reselect';

import { STATUS, ACK, RECIPIENT } from './constants';

const selectSpa = (state) => state.get('spa');
const selectUser = (state) => selectSpa(state).get('user');
const selectAdmin = (state) => selectSpa(state).get('admin');
const selectRecipients = (state) => selectSpa(state).get('recipients');
const selectAcknowledgments = (state) => selectSpa(state).get('acknowledgments');

const selectById = (state) => state.get('byId');
const selectByAckId = (state, id) => selectById(state).filter((x) => String(x.get(RECIPIENT.ACK_ID)) === String(id));
const selectAllIds = (state) => state.get('allIds');
const selectIdExists = (state, id) => selectAllIds('allIds').includes(String(id));


const getSpa = () => createSelector(
  selectSpa,
  (substate) => substate
);


// selects if user data is cached
const getUserCached = () => createSelector(
  selectUser,
  (user) => user.get('isCached')
);
// selects array of users acknowlegments combined with recipient details based off type
const getUserAcks = (type) => (
  (user, recipients, acks) => user.get(type).map((id) => {
    const recipient = selectById(recipients).get(String(id));
    const ackId = String(recipient.get(RECIPIENT.ACK_ID));
    const ack = selectById(acks).get(ackId);
    return recipient.mergeDeep(ack);
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


// selects array of users acknowlegments combined with recipient details based off type
const getAdminAcks = (type) => (
  (admin, acks) => admin.get(type).map((id) => (
    selectById(acks).get(id)
  ))
);
// selects if admin data is cached
const getAdminCached = () => createSelector(
  selectAdmin,
  (admin) => admin.get('isCached')
);
// selects array of users pending acknowlegments combined with recipient details
const getAdminActiveAcks = () => createSelector(
  [selectAdmin, selectAcknowledgments],
  getAdminAcks('acksActiveIds')
);
// selects array of users previous acknowlegments combined with recipient details
const getAdminPreviousAcks = () => createSelector(
  [selectAdmin, selectAcknowledgments],
  getAdminAcks('acksPreviousIds')
);


// selects 'recipients'
const getRecipients = () => createSelector(
  selectRecipients,
  (recipients) => recipients
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
  getAdminActiveAcks,
  getAdminPreviousAcks,
  // recipients
  getRecipients,
  // util selectors
  selectById,
  selectByAckId,
  selectIdExists,
};
