import { createSelector } from 'reselect';

import * as C from './constants';


const selectSpa = (state) => state.get('spa');
const selectUser = (state) => selectSpa(state).get('user');
const selectRecipients = (state) => selectSpa(state).get('recipients');
const selectAcknowledgments = (state) => selectSpa(state).get('acknowledgments');
const selectEnums = (state) => selectSpa(state).get('enums');

const selectById = (state) => state.get('byId');

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

export const getEnums = createSelector(selectEnums, (enums) => enums);
