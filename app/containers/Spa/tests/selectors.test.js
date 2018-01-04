import { fromJS } from 'immutable';

import * as selectors from '../selectors';
import * as C from '../constants';

const spa = {
  user: {
    isCached: false,
    recipientsPendingIds: ['abc'],
    recipientsPreviousIds: ['def'],
  },
  admin: {
    isCached: false,
    acksActiveIds: ['g'],
    acksPreviousIds: ['y'],
    cachedIds: ['y'],
  },
  groups: {
    byId: {
      1: { a: 1 },
      2: { n: 4 },
    },
    creatorIds: ['1'],
    targetIds: ['2'],
    allIds: ['1', '2'],
  },
  recipients: {
    byId: {
      abc: { [C.RECIPIENT.ID]: 'abc', [C.RECIPIENT.ACK_ID]: 'g' },
      def: { [C.RECIPIENT.ID]: 'def', [C.RECIPIENT.ACK_ID]: 'x' },
    },
    allIds: ['abc', '123'],
  },
  acknowledgments: {
    byId: {
      g: { [C.ACK.ID]: 'g', [C.ACK.STATUS]: C.STATUS.ACTIVE },
      x: { [C.ACK.ID]: 'x', [C.ACK.STATUS]: C.STATUS.EXPIRED },
      y: { [C.ACK.ID]: 'y', [C.ACK.STATUS]: C.STATUS.DISABLED },
    },
    allIds: ['g', 'x', 'y'],
  },
  enums: {
    [C.ACK.TARGET_GROUPS]: {},
    [C.ACK.STATUS]: C.STATUS_CODES,
  },
};

const state = fromJS({ spa });

describe('Spa selectors', () => {
  describe('getSpa', () => {
    it('should select the `spa` state', () => {
      const selector = selectors.getSpa();
      expect(selector(state)).toEqual(fromJS(spa));
    });
  });


  describe('user selectors', () => {
    describe('getUserCached', () => {
      it('should select if the user data is cached', () => {
        const selector = selectors.getUserCached();
        expect(selector(state)).toEqual(spa.user.isCached);
      });
    });

    describe('getUserPendingAcks', () => {
      it('should select a List of pending acks combined with recipient details', () => {
        const selector = selectors.getUserPendingAcks();
        const expected = fromJS([
          { ...spa.recipients.byId.abc, ...spa.acknowledgments.byId.g, id: 'abc' }, // recipients id
        ]);
        expect(selector(state)).toEqual(expected);
      });
    });

    describe('getUserPreviousAcks', () => {
      it('should select a List of previous acks combined with recipient details', () => {
        const selector = selectors.getUserPreviousAcks();
        const expected = fromJS([
          { ...spa.recipients.byId.def, ...spa.acknowledgments.byId.x, id: 'def' }, // recipients id
        ]);
        expect(selector(state)).toEqual(expected);
      });
    });
  });


  describe('admin selectors', () => {
    describe('getUserCached', () => {
      it('should select if the admin data is cached', () => {
        const selector = selectors.getAdminCached();
        expect(selector(state)).toEqual(spa.admin.isCached);
      });
    });

    describe('getAdminCachedIds', () => {
      it('should select all ack ids from admin', () => {
        const selector = selectors.getAdminCachedIds();
        expect(selector(state)).toEqual(fromJS(spa.admin.cachedIds));
      });
    });

    describe('getAdminActiveAcks', () => {
      it('should a List of active acks', () => {
        const selector = selectors.getAdminActiveAcks();
        const expected = fromJS([
          spa.acknowledgments.byId.g,
        ]);
        expect(selector(state)).toEqual(expected);
      });
    });

    describe('getAdminPreviousAcks', () => {
      it('should a List of active acks', () => {
        const selector = selectors.getAdminPreviousAcks();
        const expected = fromJS([
          spa.acknowledgments.byId.y,
        ]);
        expect(selector(state)).toEqual(expected);
      });
    });
  });


  describe('getRecipients', () => {
    it('should select the `recipients`', () => {
      const selector = selectors.getRecipients();
      expect(selector(state)).toEqual(fromJS(spa.recipients));
    });
  });


  describe('getGroups', () => {
    it('should select the `groups`', () => {
      const selector = selectors.getGroups();
      expect(selector(state)).toEqual(fromJS(spa.groups));
    });
  });


  describe('getEnums', () => {
    it('should select the `groups`', () => {
      const selector = selectors.getEnums();
      expect(selector(state)).toEqual(fromJS(spa.enums));
    });
  });


  describe('selectById', () => {
    it('should select the `byId` section of state', () => {
      const actual = selectors.selectById(state.getIn(['spa', 'recipients']));
      const expected = state.getIn(['spa', 'recipients', 'byId']);
      expect(actual).toEqual(expected);
    });
  });

  describe('selectByAckId', () => {
    it('should filter recipients by an acknowledgment id', () => {
      const id = 'g';
      const actual = selectors.selectByAckId(state.getIn(['spa', 'recipients']), id);
      const expected = fromJS({ abc: spa.recipients.byId.abc });
      expect(actual).toEqual(expected);
    });
  });

  describe('selectIdExists', () => {
    it('should return true if the value exists in the state', () => {
      const id = 'g';
      const actual = selectors.selectIdExists(state.getIn(['spa', 'acknowledgments', 'allIds']), id);
      expect(actual).toEqual(true);
    });

    it('should return false if the value does not exist in the state', () => {
      const id = 'g';
      const actual = selectors.selectIdExists(state.getIn(['spa', 'recipients', 'allIds']), id);
      expect(actual).toEqual(false);
    });
  });
});
