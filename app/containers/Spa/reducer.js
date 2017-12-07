import { fromJS, Set } from 'immutable';
import { handleActions } from 'redux-actions';

import { mergeById } from 'utils/request';

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
      const ack = payload.acknowledgments.find((x) => x[ACK.ID] === recipient[RECIPIENT.ACK_ID]);
      // if the recipient has acknoweldged and acknowledgment is active
      if (recipient[RECIPIENT.ACK_DATE] || (ack && ack[ACK.STATUS] !== STATUS.ACTIVE)) {
        user.recipientsPreviousIds.push(String(id));
      } else {
        user.recipientsPendingIds.push(String(id));
      }
    });
    // add entries to recipients and acks (could potentally already have some entries, so just add new)
    const recipients = mergeById(state, 'recipients', payload.recipients, RECIPIENT.ID);
    const acknowledgments = mergeById(state, 'acknowledgments', payload.acknowledgments, ACK.ID);
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
    const acknowledgments = mergeById(state, 'acknowledgments', payload.acknowledgments, ACK.ID);
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
    const recipients = mergeById(state, 'recipients', payload.recipients, RECIPIENT.ID);
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
}, fromJS(initialState));
