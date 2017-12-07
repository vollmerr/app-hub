
import { fromJS } from 'immutable';

import spaReducer, { initialState } from '../reducer';

import {
  GET_USER_DATA_SUCCESS,
  GET_ADMIN_DATA_SUCCESS,
  GET_ACK_RECIPIENTS_SUCCESS,
  RECIPIENT,
  ACK,
  STATUS,
} from '../constants';

const recipients = [
  { [RECIPIENT.ID]: '0', [RECIPIENT.ACK_ID]: 'a', [RECIPIENT.SID]: '111', [RECIPIENT.ACK_DATE]: null },
  { [RECIPIENT.ID]: '1', [RECIPIENT.ACK_ID]: 'b', [RECIPIENT.SID]: '222', [RECIPIENT.ACK_DATE]: '12/02/2019' },
  { [RECIPIENT.ID]: '2', [RECIPIENT.ACK_ID]: 'c', [RECIPIENT.SID]: '111', [RECIPIENT.ACK_DATE]: '10/12/2013' },
  { [RECIPIENT.ID]: '3', [RECIPIENT.ACK_ID]: 'd', [RECIPIENT.SID]: '222', [RECIPIENT.ACK_DATE]: null },
];

const acknowledgments = [
  { [ACK.ID]: 'a', [ACK.TITLE]: 'title a', [ACK.STATUS]: STATUS.ACTIVE },
  { [ACK.ID]: 'b', [ACK.TITLE]: 'title b', [ACK.STATUS]: STATUS.ACTIVE },
  { [ACK.ID]: 'c', [ACK.TITLE]: 'title c', [ACK.STATUS]: STATUS.DISABLED },
  { [ACK.ID]: 'd', [ACK.TITLE]: 'title d', [ACK.STATUS]: STATUS.EXPIRED },
];

const state = {
  user: {
    isCached: false,
    recipientsPendingIds: ['999'],
    recipientsPreviousIds: ['123'],
  },
  admin: {
    isCached: false,
    acksActiveIds: ['999'],
    acksPreviousIds: ['123'],
    allIds: ['123', '999'],
  },
  recipients: {
    byId: {
      abc: { [RECIPIENT.ID]: 'abc', [RECIPIENT.ACK_ID]: '999' },
    },
    allIds: ['abc'],
  },
  acknowledgments: {
    byId: {
      g: { [ACK.ID]: 'g', [ACK.STATUS]: STATUS.ACTIVE },
    },
    allIds: ['g'],
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
      expected = fromJS([recipients[1][RECIPIENT.ID], recipients[2][RECIPIENT.ID], recipients[3][RECIPIENT.ID]]);
      expect(spaReducer(undefined, action).getIn(['user', 'recipientsPreviousIds'])).toEqual(expected);
    });

    it('should merge the `recipients` with the existing ones', () => {
      expected = {
        byId: {
          0: recipients[0],
          1: recipients[1],
          2: recipients[2],
          3: recipients[3],
        },
        allIds: ['0', '1', '2', '3'],
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
        },
        allIds: ['a', 'b', 'c', 'd'],
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
      expected = fromJS([acknowledgments[2][ACK.ID], acknowledgments[3][ACK.ID]]);
      expect(spaReducer(undefined, action).getIn(['admin', 'acksPreviousIds'])).toEqual(expected);
    });

    it('should merge the `acknowledgments` with the existing ones', () => {
      expected = {
        byId: {
          a: acknowledgments[0],
          b: acknowledgments[1],
          c: acknowledgments[2],
          d: acknowledgments[3],
        },
        allIds: ['a', 'b', 'c', 'd'],
      };
      expect(spaReducer(undefined, action).get('acknowledgments').toJS()).toEqual(expected);

      expected.byId = { ...state.acknowledgments.byId, ...expected.byId };
      expected.allIds = [...state.acknowledgments.allIds, ...expected.allIds];
      expect(spaReducer(fromJS(state), action).get('acknowledgments').toJS()).toEqual(expected);
    });
  });


  describe('GET_ACK_RECIPIENTS_SUCCESS', () => {
    beforeEach(() => {
      const payload = { recipients, id: recipients[0][RECIPIENT.ACK_ID] };
      action = { type: GET_ACK_RECIPIENTS_SUCCESS, payload };
    });

    it('should merge the ack id with the admins `allIds` for caching', () => {
      expected = [recipients[0][RECIPIENT.ACK_ID]];
      expect(spaReducer(undefined, action).getIn(['admin', 'allIds']).toJS()).toEqual(expected);
      expected = [...state.admin.allIds, recipients[0][RECIPIENT.ACK_ID]];
      expect(spaReducer(fromJS(state), action).getIn(['admin', 'allIds']).toJS()).toEqual(expected);
    });

    it('should merge the `recipients` with the existing ones', () => {
      expected = {
        byId: {
          0: recipients[0],
          1: recipients[1],
          2: recipients[2],
          3: recipients[3],
        },
        allIds: ['0', '1', '2', '3'],
      };
      expect(spaReducer(undefined, action).get('recipients').toJS()).toEqual(expected);

      expected.byId = { ...state.recipients.byId, ...expected.byId };
      expected.allIds = [...state.recipients.allIds, ...expected.allIds];
      expect(spaReducer(fromJS(state), action).get('recipients').toJS()).toEqual(expected);
    });
  });
});
