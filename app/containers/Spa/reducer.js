import { fromJS, Set } from 'immutable';
import { handleActions } from 'redux-actions';

import { normalizeById } from 'utils/request';

import {
  GET_USER_DATA_SUCCESS,
  GET_ADMIN_DATA_SUCCESS,
  GET_ACK_RECIPIENTS_SUCCESS,
  DISABLE_ACK_SUCCESS,
  RECIPIENT,
  ACK,
  STATUS,
} from './constants';

export const initialState = {
  user: {
    isCached: false, // determine if should fetch user data
    recipientsPendingIds: [], // [home page] ids of pending 'recipients' objects
    recipientsPreviousIds: [], // [home page] ids of previous 'recipients' objects
  },
  admin: {
    isCached: false, // determine if should fetch admin data
    acksActiveIds: [], // [admin page] ids for list of active 'acknowledgments'
    acksPreviousIds: [], // [admin page] ids for list of previous 'acknowledgments'
    allIds: [],
  },
  recipients: { // list of recipients (for user and admin)
    byId: {},
    allIds: [],
  },
  acknowledgments: { // list of acknowledgments (for user and admin)
    byId: {},
    allIds: [],
  },
};

// TODO: MOVE TO COMMON!
const mergeApi = (state, section, data, id) => {
  const { byId, allIds } = normalizeById(data, id);

  return {
    byId: state.getIn([section, 'byId']).merge(fromJS(byId)),
    allIds: state.getIn([section, 'allIds']).toSet().union(Set(allIds)).toList(),
  };
};

export default handleActions({
  [GET_USER_DATA_SUCCESS]: (state, action) => {
    const { payload } = action;
    const user = {
      isCached: true, // set user data as cached (we will keep track of changed locally)
      recipientsPendingIds: [],
      recipientsPreviousIds: [],
    };
    // populate pending and previous 'recipients' and 'acknowledgment' ids
    payload.recipients.forEach((recipient) => {
      const id = recipient[RECIPIENT.ID];
      if (recipient[RECIPIENT.ACK_DATE]) {
        user.recipientsPreviousIds.push(String(id));
      } else {
        user.recipientsPendingIds.push(String(id));
      }
    });
    // add entries to recipients and acks (could potentally already have some entries, so just add new)
    const recipients = mergeApi(state, 'recipients', payload.recipients, RECIPIENT.ID);
    const acknowledgments = mergeApi(state, 'acknowledgments', payload.acknowledgments, ACK.ID);
    // combine with current state
    return state.mergeDeep(fromJS({
      user,
      recipients,
      acknowledgments,
    }));
  },

  [GET_ADMIN_DATA_SUCCESS]: (state, action) => {
    const { payload } = action;
    const admin = {
      isCached: true, // set user data as cached (we will keep track of changed locally)
      acksActiveIds: [],
      acksPreviousIds: [],
    };
    // populate pending and previous 'recipients' and 'acknowledgment' ids
    payload.acknowledgments.forEach((ack) => {
      const id = ack[ACK.ID];
      if (ack[ACK.STATUS] === STATUS.ACTIVE) {
        admin.acksActiveIds.push(String(id));
      } else {
        admin.acksPreviousIds.push(String(id));
      }
    });
    // add entries to acks (could potentally already have some entries, so just add new)
    const acknowledgments = mergeApi(state, 'acknowledgments', payload.acknowledgments, ACK.ID);
    // combine with current state
    return state.mergeDeep(fromJS({
      admin,
      acknowledgments,
    }));
  },

  [GET_ACK_RECIPIENTS_SUCCESS]: (state, action) => {
    const { payload } = action;
    // add ack id to list of ids in admin
    const admin = {
      allIds: state.getIn(['admin', 'allIds']).toSet().union(Set(payload.id)).toList(),
    };
    // add entries to acks (could potentally already have some entries, so just add new)
    const recipients = mergeApi(state, 'recipients', payload.recipients, RECIPIENT.ID);
    // combine with current state
    return state.mergeDeep(fromJS({
      admin,
      recipients,
    }));
  },

  [DISABLE_ACK_SUCCESS]: () => {
    // move to admin inactie
    // move for all recipients to previous
    // move for user to previous
  },

  // [INIT_DATA_SUCCESS]: (state, action) => state.set('recipient', fromJS(normalizeById(action.payload, RECIPIENT.))),
  // [DISABLE_ACK_SUCCESS]: (state, action) => state.update('data', (acks) => (
  //   acks.setIn(
  //     [acks.findIndex((x) => x.get(ACK.ID) === action.payload[ACK.ID]), ACK.STATUS],
  //     STATUS.DISABLED,
  //   )
  // )),
  // [GET_RECIPIENTS_SUCCESS]: (state, action) => {
  //   // just grab id from first entry (as all ack ids will be the same id)
  //   const id = action.payload[0] && action.payload[0][RECIPIENT.ACK_ID];
  //   if (id) {
  //     const recipients = normalizeById(action.payload, RECIPIENT.ACK_ID);
  //     console.log(recipients);
  //     // return state.setIn(['recipients', 'byId', id], fromJS(action.payload));
  //     // return state.setIn(['recipients', 'byId', id], fromJS(action.payload));
  //   }
  //   return state;
  // },
}, fromJS(initialState));


/**

{
  // [load home page] GET /spa/recipients/{sid} -> list of 'recipient' objects with ackDate/Ids
  // [load home page] GET /spa/recipients/{sid}/acknowledgments -> list of 'acknowledgments' objects with fileName, etc
  user: {
    isCached: true, // determine if should fetch
    ackPendingIds: [100], // [home page] added when recipientPendingIds generated -> add unique ackId
    ackPreviousIds: [101], // [home page] added when recipientPreviousIds generated -> add unique ackId
    recipientPendingIds: [999], // [home page] sid == users sid && !dateAck && ack status == active
    recipientPreviousIds: [1000], // [home page] sid == users sid && (dateAck || ack status != active)
  },
  admin: {
    isCached: true, // determine if should fetch
    ackPendingIds: [], // [admin page]
    ackPreviousIds: [], // [admin page]
  },
  // [click on ack - admin page] GET /spa/acknowledgements/{id}/recipients, append to list if not present
  recipients: {
    byId: {
      999: {
        id: 999,
        sid: 1,
        sam,
        firstName,
        lastName,
        email,
        ackId: 100,
        ackDate,
        ...
      },
      1000: {
        id: 1000,
        sid: 1,
        sam,
        firstName,
        lastName,
        email,
        ackId: 101,
        ackDate,
        ...
      },
      1001: {
        id: 1001,
        sid: 999999,
        sam,
        firstName,
        lastName,
        email,
        ackId: 101,
        ackDate,
        ...
      },
    },
    allIds: [999, 1000, 1001],
  },
  // [click on admin page] GET /spa/acknowledgements
  acknowledgments: {
    byId:{
      100: {
        id: 100
        title,
        startDate,
        endDate,
        status: 0,
        creatorGroup: 0,
        ...
      },
      101: {
        id: 101,
        title,
        startDate,
        endDate,
        status: 0,
        creatorGroup: 0,
        ...
      },
    },
    allIds: [100, 101],
    activeIds: [100], // [admin page] status == active
    previousIds: [101], // [admin page] status != active
  },
}

// user is not admin
// loads only acks for self? (merge? if new)
// display users pending acknowledgments (in list)

// find pending recipients for ack (for list)
recipients.allIds.filter(x => !recipients.byId[x].ackDate && recipients.byId[x].sid === userSid)
// find previous recipients for ack (for list)
recipients.allIds.filter(x => recipients.byId[x].ackDate && recipients.byId[x].sid === userSid)


// clicks ack, get details

// user is admin
// loads all acks

 */
