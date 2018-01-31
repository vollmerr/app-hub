// import { fromJS, Set, List } from 'immutable';
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { mergeById } from '../../utils/data';
import { formattedDate } from '../../utils/date';

import * as C from './constants';


export const initialState = {
  user: {
    lastFetched: null, // determine if should fetch user data
    recipientsPendingIds: [], // [home page] ids of pending 'recipients' objects
    recipientsPreviousIds: [], // [home page] ids of previous 'recipients' objects
  },
  admin: {
    lastFetched: null, // determine if should fetch admin data
    acksActiveIds: [], // [admin page] ids for list of active 'acknowledgments'
    acksPreviousIds: [], // [admin page] ids for list of previous 'acknowledgments'
    fetchedIds: [],
  },
  recipients: { // list of recipients (for user and admin)
    byId: {},
    allIds: [],
  },
  acknowledgments: { // list of acknowledgments (for user and admin)
    byId: {},
    allIds: [],
  },
  groups: { // lists of AD groups
    byId: {},
    creatorIds: [],
    targetIds: [],
    allIds: [],
  },
  enums: {
    [C.ACK.TARGET_GROUPS]: {},
    [C.ACK.STATUS]: C.STATUS_CODES,
  },
};


export default handleActions({
  [C.GET_USER_DATA_SUCCESS]: (state, action) => {
    const { payload } = action;
    const user = {
      lastFetched: new Date(), // set user data as cached (we will keep track of changed locally)
      recipientsPendingIds: [],
      recipientsPreviousIds: [],
    };
    // populate pending and previous 'recipients' and 'acknowledgment' ids
    payload.recipients.forEach((recipient) => {
      const id = String(recipient[C.RECIPIENT.ID]);
      const ack = payload.acknowledgments.find((x) => x[C.ACK.ID] === recipient[C.RECIPIENT.ACK_ID]);
      // only add recipients that are not pending and exist...
      if (ack && ack[C.ACK.STATUS] !== C.STATUS.PENDING) {
        // if the recipient has acknoweldged and acknowledgment is active
        if (recipient[C.RECIPIENT.ACK_DATE] || (ack && ack[C.ACK.STATUS] !== C.STATUS.ACTIVE)) {
          user.recipientsPreviousIds.push(id);
        } else {
          user.recipientsPendingIds.push(id);
        }
      }
    });
    // add entries to recipients and acks (could potentally already have some entries, so just add new)
    const recipients = mergeById(state, 'recipients', payload.recipients, C.RECIPIENT.ID);
    const acknowledgments = mergeById(state, 'acknowledgments', payload.acknowledgments, C.ACK.ID);
    // combine with current state
    return state.mergeDeep(fromJS({
      user,
      recipients,
      acknowledgments,
    }));
  },


  // [C.GET_ADMIN_DATA_SUCCESS]: (state, action) => {
  //   const { payload } = action;
  //   const admin = {
  //     isCached: true, // set user data as cached (we will keep track of changed locally)
  //     acksActiveIds: [],
  //     acksPreviousIds: [],
  //   };
  //   // populate pending and previous 'recipients' and 'acknowledgment' ids
  //   payload.acknowledgments.forEach((ack) => {
  //     const id = String(ack[C.ACK.ID]);
  //     // add active and pending to 'active' list
  //     if (ack[C.ACK.STATUS] === C.STATUS.ACTIVE || ack[C.ACK.STATUS] === C.STATUS.PENDING) {
  //       admin.acksActiveIds.push(id);
  //     } else {
  //       admin.acksPreviousIds.push(id);
  //     }
  //   });
  //   // add entries to acks (could potentally already have some entries, so just add new)
  //   const acknowledgments = mergeById(state, 'acknowledgments', payload.acknowledgments, C.ACK.ID);
  //   // combine with current state
  //   return state.mergeDeep(fromJS({
  //     admin,
  //     acknowledgments,
  //   }));
  // },


  // [C.GET_GROUPS_SUCCESS]: (state, action) => {
  //   const { payload: { targets, creators } } = action;
  //   // set details and ids of all for lookup
  //   let groups = mergeById(state, 'groups', [...targets, ...creators], C.GROUP.SID);
  //   // set ids of each group
  //   groups = groups.set('targetIds', List(targets.map((x) => String(x[C.GROUP.SID]))));
  //   groups = groups.set('creatorIds', List(creators.map((x) => String(x[C.GROUP.SID]))));
  //   // map tagret groups to enums
  //   const targetsEnum = {};
  //   targets.forEach((x) => { targetsEnum[String(x[C.GROUP.SID])] = x[C.GROUP.NAME]; });
  //   const enums = state.get('enums').set(C.ACK.TARGET_GROUPS, targetsEnum);
  //   // combine with current state
  //   return state.mergeDeep(fromJS({
  //     enums,
  //     groups,
  //   }));
  // },


  // [C.GET_ACK_RECIPIENTS_SUCCESS]: (state, action) => {
  //   const { payload } = action;
  //   // add ack id to list of ids in admin
  //   const id = Set([String(payload.id)]);
  //   const admin = {
  //     cachedIds: state.getIn(['admin', 'cachedIds']).toSet().union(id).toList(),
  //   };
  //   // add entries to acks (could potentally already have some entries, so just add new)
  //   const recipients = mergeById(state, 'recipients', payload.recipients, C.RECIPIENT.ID);
  //   // combine with current state
  //   return state.mergeDeep(fromJS({
  //     admin,
  //     recipients,
  //   }));
  // },


  // [C.NEW_ACK_SUCCESS]: (state, action) => {
  //   const { payload } = action;
  //   // add to active ids for admin page (assumes all new acks are active...)
  //   const newActiveIds = state
  //     .getIn(['admin', 'acksActiveIds'])
  //     .push(String(payload[C.ACK.ID]));
  //   const admin = state
  //     .get('admin')
  //     .set('acksActiveIds', newActiveIds);
  //   // add to acks for lookup
  //   const acknowledgments = mergeById(state, 'acknowledgments', [payload], C.ACK.ID);
  //   // combine with current state
  //   return state.mergeDeep(fromJS({
  //     admin,
  //     acknowledgments,
  //   }));
  // },


  // [C.DISABLE_ACK_SUCCESS]: (state, action) => {
  //   const { payload } = action;
  //   // id must be string
  //   const ackId = String(payload[C.ACK.ID]);
  //   let newState = state;
  //   // update status in acknowledgments lookup
  //   newState = newState.setIn(
  //     ['acknowledgments', 'byId', ackId, C.ACK.STATUS],
  //     payload[C.ACK.STATUS]
  //   );
  //   // remove from admin active
  //   newState = newState.setIn(
  //     ['admin', 'acksActiveIds'],
  //     state.getIn(['admin', 'acksActiveIds']).filter((id) => id !== ackId)
  //   );
  //   // add to admin inactive
  //   newState = newState.setIn(
  //     ['admin', 'acksPreviousIds'],
  //     state.getIn(['admin', 'acksPreviousIds']).push(ackId)
  //   );
  //   // get the id of the users 'recipeint' object of the pending acknowledgment
  //   const recipientId = state.getIn(['user', 'recipientsPendingIds'])
  //     .find((id) => String(state.getIn(['recipients', 'byId', String(id), C.RECIPIENT.ACK_ID])) === ackId);
  //   // if the acknowledgment is in users active list
  //   if (recipientId) {
  //     // remove from user active
  //     newState = newState.setIn(
  //       ['user', 'recipientsPendingIds'],
  //       state.getIn(['user', 'recipientsPendingIds']).filter((x) => x !== recipientId)
  //     );
  //     // add to user previous
  //     newState = newState.setIn(
  //       ['user', 'recipientsPreviousIds'],
  //       state.getIn(['user', 'recipientsPreviousIds']).push(recipientId)
  //     );
  //   }
  //   // gimme that new state
  //   return newState;
  // },


  [C.READ_ACK_SUCCESS]: (state, action) => {
    const { payload } = action;
    const id = payload[C.RECIPIENT.ID];
    let newState = state;
    // remove from user active
    newState = newState.setIn(
      ['user', 'recipientsPendingIds'],
      state.getIn(['user', 'recipientsPendingIds']).filter((x) => x !== id)
    );
    // add to user previous
    newState = newState.setIn(
      ['user', 'recipientsPreviousIds'],
      state.getIn(['user', 'recipientsPreviousIds']).push(id)
    );
    // update date acknowledged in lookup table
    newState = newState.setIn(
      ['recipients', 'byId', id, C.RECIPIENT.ACK_DATE],
      formattedDate(new Date()),
    );
    // gimme that new state
    return newState;
  },
}, fromJS(initialState));
