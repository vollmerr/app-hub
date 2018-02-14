import { fromJS } from 'immutable';

import { formattedDate } from '../../../utils/date';

import spaReducer, { initialState } from '../reducer';
import * as C from '../constants';


const recipients = [
  { [C.RECIPIENT.ID]: '0', [C.RECIPIENT.ACK_ID]: 'b', [C.RECIPIENT.SID]: '111', [C.RECIPIENT.ACK_DATE]: null },
  { [C.RECIPIENT.ID]: '1', [C.RECIPIENT.ACK_ID]: 'b', [C.RECIPIENT.SID]: '222', [C.RECIPIENT.ACK_DATE]: '12/02/2019' },
  { [C.RECIPIENT.ID]: '2', [C.RECIPIENT.ACK_ID]: 'c', [C.RECIPIENT.SID]: '111', [C.RECIPIENT.ACK_DATE]: '10/12/2013' },
  { [C.RECIPIENT.ID]: '3', [C.RECIPIENT.ACK_ID]: 'd', [C.RECIPIENT.SID]: '222', [C.RECIPIENT.ACK_DATE]: null },
  { [C.RECIPIENT.ID]: '4', [C.RECIPIENT.ACK_ID]: 'a', [C.RECIPIENT.SID]: '222', [C.RECIPIENT.ACK_DATE]: null },
];

const acknowledgments = [
  { [C.ACK.ID]: 'a', [C.ACK.TITLE]: 'title a', [C.ACK.STATUS]: C.STATUS.PENDING },
  { [C.ACK.ID]: 'b', [C.ACK.TITLE]: 'title b', [C.ACK.STATUS]: C.STATUS.ACTIVE },
  { [C.ACK.ID]: 'c', [C.ACK.TITLE]: 'title c', [C.ACK.STATUS]: C.STATUS.DISABLED },
  { [C.ACK.ID]: 'd', [C.ACK.TITLE]: 'title d', [C.ACK.STATUS]: C.STATUS.EXPIRED },
  { [C.ACK.ID]: 'e', [C.ACK.TITLE]: 'title e', [C.ACK.STATUS]: C.STATUS.CANCELED },
];

const targets = [
  { [C.GROUP.SID]: 'a', [C.GROUP.NAME]: 'name a' },
  { [C.GROUP.SID]: 'b', [C.GROUP.NAME]: 'name b' },
];

const creators = [
  { [C.GROUP.SID]: 'c', [C.GROUP.NAME]: 'name a' },
  { [C.GROUP.SID]: 'd', [C.GROUP.NAME]: 'name d' },
];

const state = {
  user: {
    lastFetched: null,
    recipientsPendingIds: ['abc'],
    recipientsPreviousIds: ['def'],
  },
  admin: {
    lastFetched: null,
    acksActiveIds: ['g'],
    acksPreviousIds: ['h'],
    fetchedIds: ['h'],
  },
  report: {
    id: 'g',
    item: {
      [C.ACK.ID]: 'g',
      [C.ACK.STATUS]: C.STATUS.ACTIVE,
    },
    key: C.REPORT.PENDING,
    lastFetchedById: {
      g: '01/02/2011',
    },
    byId: {
      g: [],
    },
  },
  groups: {
    byId: {
      m: { [C.GROUP.SID]: 'm', [C.GROUP.NAME]: 'name1' },
      b: { [C.GROUP.SID]: 'b', [C.GROUP.NAME]: 'name2' },
    },
    creatorIds: ['m'],
    targetIds: ['b'],
    allIds: ['b', 'm'],
  },
  enums: {
    [C.ACK.TARGET_GROUPS]: {},
  },
  recipients: {
    byId: {
      abc: { [C.RECIPIENT.ID]: 'abc', [C.RECIPIENT.ACK_ID]: 'g' },
      def: { [C.RECIPIENT.ID]: 'def', [C.RECIPIENT.ACK_ID]: 'g' },
    },
    allIds: ['abc', 'def'],
  },
  acknowledgments: {
    byId: {
      g: { [C.ACK.ID]: 'g', [C.ACK.STATUS]: C.STATUS.ACTIVE },
      h: { [C.ACK.ID]: 'h', [C.ACK.STATUS]: C.STATUS.EXPIRED },
    },
    allIds: ['g', 'h'],
  },
};


describe('spaReducer', () => {
  let expected;
  let action;
  let payload;
  beforeEach(() => {
    expected = fromJS(initialState);
  });

  it('should return the initial state', () => {
    expect(spaReducer(undefined, {})).toEqual(expected);
  });

  describe('GET_USER_DATA_SUCCESS', () => {
    beforeEach(() => {
      payload = { acknowledgments, recipients };
      action = { type: C.GET_USER_DATA_SUCCESS, payload };
    });

    it('should set the `user` as being fetched', () => {
      expect(spaReducer(undefined, action).getIn(['user', 'lastFetched']) != null).toEqual(true);
    });

    it('should set the `user` with pending recipient ids', () => {
      expected = fromJS([recipients[0][C.RECIPIENT.ID]]);
      expect(spaReducer(undefined, action).getIn(['user', 'recipientsPendingIds'])).toEqual(expected);
    });

    it('should set the `user` with previous recipient ids', () => {
      expected = fromJS([
        recipients[1][C.RECIPIENT.ID],
        recipients[2][C.RECIPIENT.ID],
        recipients[3][C.RECIPIENT.ID],
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


  describe('READ_ACK_SUCCESS', () => {
    let actual;
    beforeEach(() => {
      payload = { ...state.acknowledgments.byId.g, ...state.recipients.byId.abc };
      action = { type: C.READ_ACK_SUCCESS, payload };
      actual = spaReducer(fromJS(state), action);
    });

    it('should remove the recipient id from the users active recipient ids', () => {
      expected = [];
      expect(actual.getIn(['user', 'recipientsPendingIds']).toJS()).toEqual(expected);
    });

    it('should add the recipient id to the users previous recipient ids', () => {
      expected = [...state.user.recipientsPreviousIds, ...state.user.recipientsPendingIds];
      expect(actual.getIn(['user', 'recipientsPreviousIds']).toJS()).toEqual(expected);
    });

    it('should update the acknowledgment date for the recipient', () => {
      expect(actual.getIn(['recipients', 'byId', 'abc', C.RECIPIENT.ACK_DATE])).toEqual(formattedDate(new Date()));
    });
  });


  describe('GET_ADMIN_DATA_SUCCESS', () => {
    beforeEach(() => {
      payload = { acknowledgments };
      action = { type: C.GET_ADMIN_DATA_SUCCESS, payload };
    });

    it('should set the `admin` as being fetched', () => {
      expect(spaReducer(undefined, action).getIn(['admin', 'lastFetched'])).toBeTruthy();
    });

    it('should set the `admin` with active acknowledgment ids', () => {
      expected = fromJS([acknowledgments[0][C.ACK.ID], acknowledgments[1][C.ACK.ID]]);
      expect(spaReducer(undefined, action).getIn(['admin', 'acksActiveIds'])).toEqual(expected);
    });

    it('should set the `admin` with previous acknowledgment ids', () => {
      expected = fromJS([
        acknowledgments[2][C.ACK.ID],
        acknowledgments[3][C.ACK.ID],
        acknowledgments[4][C.ACK.ID],
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
      payload = { targets, creators };
      action = { type: C.GET_GROUPS_SUCCESS, payload };
    });

    it('should set the `targetIds` as the ids of the target groups', () => {
      expected = [targets[0][C.GROUP.SID], targets[1][C.GROUP.SID]];
      expect(spaReducer(undefined, action).getIn(['groups', 'targetIds']).toJS()).toEqual(expected);
    });

    it('should set the `creatorIds` as the ids of the creator groups', () => {
      expected = [creators[0][C.GROUP.SID], creators[1][C.GROUP.SID]];
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


  describe('NEW_ACK_SUCCESS', () => {
    beforeEach(() => {
      payload = acknowledgments[0];
      action = { type: C.NEW_ACK_SUCCESS, payload };
    });

    it('should merge the ack id with the admins `acksActiveIds`', () => {
      expected = [acknowledgments[0][C.ACK.ID]];
      expect(spaReducer(undefined, action).getIn(['admin', 'acksActiveIds']).toJS()).toEqual(expected);
      expected = [...state.admin.acksActiveIds, acknowledgments[0][C.ACK.ID]];
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
      payload = { ...state.acknowledgments.byId.g, [C.ACK.STATUS]: C.STATUS.DISABLED };
      action = { type: C.DISABLE_ACK_SUCCESS, payload };
    });

    it('should update the acknowledgment`s status in the lookup', () => {
      expect(spaReducer(fromJS(state), action).getIn(['acknowledgments', 'byId', 'g']).toJS()).toEqual(payload);
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


  describe('GET_REPORT_DATA_SUCCESS', () => {
    let id;
    beforeEach(() => {
      payload = { recipients, acknowledgment: acknowledgments[0] };
      action = { type: C.GET_REPORT_DATA_SUCCESS, payload };
      id = acknowledgments[0][C.ACK.ID];
    });

    it('should set the report as being fetched', () => {
      expect(spaReducer(undefined, action).getIn(['report', 'lastFetchedById', id])).toBeTruthy();
    });

    it('should set the items details', () => {
      expect(spaReducer(undefined, action).getIn(['report', 'id'])).toEqual(id);
      expect(spaReducer(undefined, action).getIn(['report', 'item'])).toEqual(payload.acknowledgment);
    });

    it('should set the reports data in the byId lookup based off previous and pending', () => {
      expected = fromJS({
        [C.REPORT.PREVIOUS]: recipients.filter((x) => x[C.RECIPIENT.ACK_DATE]),
        [C.REPORT.PENDING]: recipients.filter((x) => !x[C.RECIPIENT.ACK_DATE]),
      });
      expect(spaReducer(undefined, action).getIn(['report', 'byId', id])).toEqual(expected);
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


  describe('SET_REPORT_KEY', () => {
    it('should set the report key to the payload', () => {
      payload = 3;
      action = { type: C.SET_REPORT_KEY, payload };
      expect(spaReducer(fromJS(state), action).getIn(['report', 'key'])).toEqual(payload);
    });
  });
});
