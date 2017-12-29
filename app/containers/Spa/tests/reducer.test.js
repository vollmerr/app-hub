
import { fromJS } from 'immutable';

import spaReducer, { initialState } from '../reducer';

import {
  GET_USER_DATA_SUCCESS,
  GET_ADMIN_DATA_SUCCESS,
  GET_GROUPS_SUCCESS,
  GET_ACK_RECIPIENTS_SUCCESS,
  NEW_ACK_SUCCESS,
  DISABLE_ACK_SUCCESS,
  RECIPIENT,
  GROUP,
  ACK,
  STATUS,
} from '../constants';

const recipients = [
  { [RECIPIENT.ID]: '0', [RECIPIENT.ACK_ID]: 'b', [RECIPIENT.SID]: '111', [RECIPIENT.ACK_DATE]: null },
  { [RECIPIENT.ID]: '1', [RECIPIENT.ACK_ID]: 'b', [RECIPIENT.SID]: '222', [RECIPIENT.ACK_DATE]: '12/02/2019' },
  { [RECIPIENT.ID]: '2', [RECIPIENT.ACK_ID]: 'c', [RECIPIENT.SID]: '111', [RECIPIENT.ACK_DATE]: '10/12/2013' },
  { [RECIPIENT.ID]: '3', [RECIPIENT.ACK_ID]: 'd', [RECIPIENT.SID]: '222', [RECIPIENT.ACK_DATE]: null },
  { [RECIPIENT.ID]: '4', [RECIPIENT.ACK_ID]: 'a', [RECIPIENT.SID]: '222', [RECIPIENT.ACK_DATE]: null },
];

const acknowledgments = [
  { [ACK.ID]: 'a', [ACK.TITLE]: 'title a', [ACK.STATUS]: STATUS.PENDING },
  { [ACK.ID]: 'b', [ACK.TITLE]: 'title b', [ACK.STATUS]: STATUS.ACTIVE },
  { [ACK.ID]: 'c', [ACK.TITLE]: 'title c', [ACK.STATUS]: STATUS.DISABLED },
  { [ACK.ID]: 'd', [ACK.TITLE]: 'title d', [ACK.STATUS]: STATUS.EXPIRED },
  { [ACK.ID]: 'e', [ACK.TITLE]: 'title e', [ACK.STATUS]: STATUS.CANCELED },
];

const targets = [
  { [GROUP.SID]: 'a', [GROUP.NAME]: 'name a' },
  { [GROUP.SID]: 'b', [GROUP.NAME]: 'name b' },
];

const creators = [
  { [GROUP.SID]: 'c', [GROUP.NAME]: 'name a' },
  { [GROUP.SID]: 'd', [GROUP.NAME]: 'name d' },
];

const state = {
  user: {
    isCached: false,
    recipientsPendingIds: ['abc'],
    recipientsPreviousIds: ['def'],
  },
  admin: {
    isCached: false,
    acksActiveIds: ['g'],
    acksPreviousIds: ['h'],
    cachedIds: ['h'],
  },
  groups: {
    byId: {
      m: { [GROUP.SID]: 'm', [GROUP.NAME]: 'name1' },
      b: { [GROUP.SID]: 'b', [GROUP.NAME]: 'name2' },
    },
    creatorIds: ['m'],
    targetIds: ['b'],
    allIds: ['b', 'm'],
  },
  enums: {
    [ACK.TARGET_GROUPS]: {},
  },
  recipients: {
    byId: {
      abc: { [RECIPIENT.ID]: 'abc', [RECIPIENT.ACK_ID]: 'g' },
      def: { [RECIPIENT.ID]: 'def', [RECIPIENT.ACK_ID]: 'g' },
    },
    allIds: ['abc', 'def'],
  },
  acknowledgments: {
    byId: {
      g: { [ACK.ID]: 'g', [ACK.STATUS]: STATUS.ACTIVE },
      h: { [ACK.ID]: 'h', [ACK.STATUS]: STATUS.EXPIRED },
    },
    allIds: ['g', 'h'],
  },
};


describe('spaReducer', () => {
  let expected;
  let action;
  beforeEach(() => {
    expected = fromJS(initialState);
  });

  it('should return the initial state', () => {
    expect(spaReducer(undefined, {})).toEqual(expected);
  });

  describe('GET_USER_DATA_SUCCESS', () => {
    beforeEach(() => {
      const payload = { acknowledgments, recipients };
      action = { type: GET_USER_DATA_SUCCESS, payload };
    });

    it('should set the `user` as being cached', () => {
      expect(spaReducer(undefined, action).getIn(['user', 'isCached'])).toEqual(true);
    });

    it('should set the `user` with pending recipient ids', () => {
      expected = fromJS([recipients[0][RECIPIENT.ID]]);
      expect(spaReducer(undefined, action).getIn(['user', 'recipientsPendingIds'])).toEqual(expected);
    });

    it('should set the `user` with previous recipient ids', () => {
      expected = fromJS([
        recipients[1][RECIPIENT.ID],
        recipients[2][RECIPIENT.ID],
        recipients[3][RECIPIENT.ID],
      ]);
      expect(spaReducer(undefined, action).getIn(['user', 'recipientsPreviousIds'])).toEqual(expected);
    });

    it('should merge the `recipients` with the existing ones', () => {
      expected = {
        byId: {
          0: recipients[0],
          1: recipients[1],
          2: recipients[2],
          3: recipients[3],
          4: recipients[4],
        },
        allIds: ['0', '1', '2', '3', '4'],
      };
      expect(spaReducer(undefined, action).get('recipients').toJS()).toEqual(expected);

      expected.byId = { ...state.recipients.byId, ...expected.byId };
      expected.allIds = [...state.recipients.allIds, ...expected.allIds];
      expect(spaReducer(fromJS(state), action).get('recipients').toJS()).toEqual(expected);
    });

    it('should merge the `acknowledgments` with the existing ones', () => {
      expected = {
        byId: {
          a: acknowledgments[0],
          b: acknowledgments[1],
          c: acknowledgments[2],
          d: acknowledgments[3],
          e: acknowledgments[4],
        },
        allIds: ['a', 'b', 'c', 'd', 'e'],
      };
      expect(spaReducer(undefined, action).get('acknowledgments').toJS()).toEqual(expected);

      expected.byId = { ...state.acknowledgments.byId, ...expected.byId };
      expected.allIds = [...state.acknowledgments.allIds, ...expected.allIds];
      expect(spaReducer(fromJS(state), action).get('acknowledgments').toJS()).toEqual(expected);
    });
  });


  describe('GET_ADMIN_DATA_SUCCESS', () => {
    beforeEach(() => {
      const payload = { acknowledgments };
      action = { type: GET_ADMIN_DATA_SUCCESS, payload };
    });

    it('should set the `admin` as being cached', () => {
      expect(spaReducer(undefined, action).getIn(['admin', 'isCached'])).toEqual(true);
    });

    it('should set the `admin` with active acknowledgment ids', () => {
      expected = fromJS([acknowledgments[0][ACK.ID], acknowledgments[1][ACK.ID]]);
      expect(spaReducer(undefined, action).getIn(['admin', 'acksActiveIds'])).toEqual(expected);
    });

    it('should set the `admin` with previous acknowledgment ids', () => {
      expected = fromJS([
        acknowledgments[2][ACK.ID],
        acknowledgments[3][ACK.ID],
        acknowledgments[4][ACK.ID],
      ]);
      expect(spaReducer(undefined, action).getIn(['admin', 'acksPreviousIds'])).toEqual(expected);
    });

    it('should merge the `acknowledgments` with the existing ones', () => {
      expected = {
        byId: {
          a: acknowledgments[0],
          b: acknowledgments[1],
          c: acknowledgments[2],
          d: acknowledgments[3],
          e: acknowledgments[4],
        },
        allIds: ['a', 'b', 'c', 'd', 'e'],
      };
      expect(spaReducer(undefined, action).get('acknowledgments').toJS()).toEqual(expected);

      expected.byId = { ...state.acknowledgments.byId, ...expected.byId };
      expected.allIds = [...state.acknowledgments.allIds, ...expected.allIds];
      expect(spaReducer(fromJS(state), action).get('acknowledgments').toJS()).toEqual(expected);
    });
  });


  describe('GET_GROUPS_SUCCESS', () => {
    beforeEach(() => {
      const payload = { targets, creators };
      action = { type: GET_GROUPS_SUCCESS, payload };
    });

    it('should set the `targetIds` as the ids of the target groups', () => {
      expected = [targets[0][GROUP.SID], targets[1][GROUP.SID]];
      expect(spaReducer(undefined, action).getIn(['groups', 'targetIds']).toJS()).toEqual(expected);
    });

    it('should set the `creatorIds` as the ids of the creator groups', () => {
      expected = [creators[0][GROUP.SID], creators[1][GROUP.SID]];
      expect(spaReducer(undefined, action).getIn(['groups', 'creatorIds']).toJS()).toEqual(expected);
    });

    it('should merge the target and creator groups with the existing `groups`', () => {
      expected = {
        byId: {
          a: targets[0],
          b: targets[1],
          c: creators[0],
          d: creators[1],
        },
        allIds: ['a', 'b', 'c', 'd'],
      };
      expect(spaReducer(undefined, action).get('groups').get('byId').toJS()).toEqual(expected.byId);
      expect(spaReducer(undefined, action).get('groups').get('allIds').toJS()).toEqual(expected.allIds);

      expected.byId = { ...state.groups.byId, ...expected.byId };
      expected.allIds = [...state.groups.allIds, ...expected.allIds].filter((x, i, a) => i === a.indexOf(x));
      expect(spaReducer(fromJS(state), action).get('groups').get('byId').toJS()).toEqual(expected.byId);
      expect(spaReducer(fromJS(state), action).get('groups').get('allIds').toJS()).toEqual(expected.allIds);
    });
  });


  describe('GET_ACK_RECIPIENTS_SUCCESS', () => {
    beforeEach(() => {
      const payload = { recipients, id: recipients[0][RECIPIENT.ACK_ID] };
      action = { type: GET_ACK_RECIPIENTS_SUCCESS, payload };
    });

    it('should merge the ack id with the admins `cachedIds` for caching', () => {
      expected = [recipients[0][RECIPIENT.ACK_ID]];
      expect(spaReducer(undefined, action).getIn(['admin', 'cachedIds']).toJS()).toEqual(expected);
      expected = [...state.admin.cachedIds, recipients[0][RECIPIENT.ACK_ID]];
      expect(spaReducer(fromJS(state), action).getIn(['admin', 'cachedIds']).toJS()).toEqual(expected);
    });

    it('should merge the `recipients` with the existing ones', () => {
      expected = {
        byId: {
          0: recipients[0],
          1: recipients[1],
          2: recipients[2],
          3: recipients[3],
          4: recipients[4],
        },
        allIds: ['0', '1', '2', '3', '4'],
      };
      expect(spaReducer(undefined, action).get('recipients').toJS()).toEqual(expected);

      expected.byId = { ...state.recipients.byId, ...expected.byId };
      expected.allIds = [...state.recipients.allIds, ...expected.allIds];
      expect(spaReducer(fromJS(state), action).get('recipients').toJS()).toEqual(expected);
    });
  });


  describe('NEW_ACK_SUCCESS', () => {
    beforeEach(() => {
      const payload = acknowledgments[0];
      action = { type: NEW_ACK_SUCCESS, payload };
    });

    it('should merge the ack id with the admins `acksActiveIds`', () => {
      expected = [acknowledgments[0][ACK.ID]];
      expect(spaReducer(undefined, action).getIn(['admin', 'acksActiveIds']).toJS()).toEqual(expected);
      expected = [...state.admin.acksActiveIds, acknowledgments[0][ACK.ID]];
      expect(spaReducer(fromJS(state), action).getIn(['admin', 'acksActiveIds']).toJS()).toEqual(expected);
    });

    it('should merge the acknowledgment with the existing `acknowledgments`', () => {
      expected = {
        byId: {
          a: acknowledgments[0],
        },
        allIds: ['a'],
      };
      expect(spaReducer(undefined, action).get('acknowledgments').toJS()).toEqual(expected);

      expected.byId = { ...state.acknowledgments.byId, ...expected.byId };
      expected.allIds = [...state.acknowledgments.allIds, ...expected.allIds];
      expect(spaReducer(fromJS(state), action).get('acknowledgments').toJS()).toEqual(expected);
    });
  });


  describe('DISABLE_ACK_SUCCESS', () => {
    beforeEach(() => {
      const payload = state.acknowledgments.byId.g;
      action = { type: DISABLE_ACK_SUCCESS, payload };
    });

    it('should update the acknowledgment`s status in the lookup', () => {
      expected = { ...state.acknowledgments.byId.g, [ACK.STATUS]: STATUS.DISABLED };
      expect(spaReducer(fromJS(state), action).getIn(['acknowledgments', 'byId', 'g']).toJS()).toEqual(expected);
    });

    it('should remove the acknowledgment id from admins active ids', () => {
      expected = [];
      expect(spaReducer(fromJS(state), action).getIn(['admin', 'acksActiveIds']).toJS()).toEqual([]);
    });

    it('should add the acknowledgment id to admins previous ids', () => {
      expected = [...state.admin.acksPreviousIds, ...state.admin.acksActiveIds];
      expect(spaReducer(fromJS(state), action).getIn(['admin', 'acksPreviousIds']).toJS()).toEqual(expected);
    });

    it('should remove the recipient id from the users active recipients if it exists', () => {
      expected = [];
      expect(spaReducer(fromJS(state), action).getIn(['user', 'recipientsPendingIds']).toJS()).toEqual(expected);
    });

    it('should add the recipient id to the users previous recipients if it was removed from their active', () => {
      expected = [...state.user.recipientsPreviousIds, ...state.user.recipientsPendingIds];
      expect(spaReducer(fromJS(state), action).getIn(['user', 'recipientsPreviousIds']).toJS()).toEqual(expected);
    });

    it('should not update the users pending or previous recipients if it is not in their active ids', () => {
      action.payload = state.acknowledgments.byId.h;
      expect(spaReducer(fromJS(state), action).getIn(['user', 'recipientsPendingIds']).toJS()).toEqual(state.user.recipientsPendingIds);
      expect(spaReducer(fromJS(state), action).getIn(['user', 'recipientsPreviousIds']).toJS()).toEqual(state.user.recipientsPreviousIds);
    });
  });
});
