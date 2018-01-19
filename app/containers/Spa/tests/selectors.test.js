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
  describe('user selectors', () => {
    describe('getUserIsCached', () => {
      it('should select if the user data is cached', () => {
        const selector = selectors.getUserIsCached();
        expect(selector(state)).toEqual(spa.user.isCached);
      });
    });

    describe('getUserPendingList', () => {
      it('should select a List of pending acks combined with recipient details', () => {
        const selector = selectors.getUserPendingList();
        const expected = fromJS([
          { ...spa.recipients.byId.abc, ...spa.acknowledgments.byId.g, id: 'abc' }, // recipients id
        ]);
        expect(selector(state)).toEqual(expected);
      });
    });

    describe('getUserPreviousList', () => {
      it('should select a List of previous acks combined with recipient details', () => {
        const selector = selectors.getUserPreviousList();
        const expected = fromJS([
          { ...spa.recipients.byId.def, ...spa.acknowledgments.byId.x, id: 'def' }, // recipients id
        ]);
        expect(selector(state)).toEqual(expected);
      });
    });
  });


  describe('admin selectors', () => {
    describe('getAdminIsCached', () => {
      it('should select if the admin data is cached', () => {
        const selector = selectors.getAdminIsCached();
        expect(selector(state)).toEqual(spa.admin.isCached);
      });
    });

    describe('getAdminCachedIds', () => {
      it('should select all ack ids from admin', () => {
        const selector = selectors.getAdminCachedIds();
        const expected = fromJS(spa.admin.cachedIds);
        expect(selector(state)).toEqual(expected);
      });
    });

    describe('getAdminActiveList', () => {
      it('should a List of active acks', () => {
        const selector = selectors.getAdminActiveList();
        const expected = fromJS([
          spa.acknowledgments.byId.g,
        ]);
        expect(selector(state)).toEqual(expected);
      });
    });

    describe('getAdminPreviousList', () => {
      it('should a List of active acks', () => {
        const selector = selectors.getAdminPreviousList();
        const expected = fromJS([
          spa.acknowledgments.byId.y,
        ]);
        expect(selector(state)).toEqual(expected);
      });
    });
  });

  describe('recipients', () => {
    describe('getRecipientsById', () => {
      it('should select `recipients.byId`', () => {
        const selector = selectors.getRecipientsById();
        const expected = fromJS(spa.recipients.byId);
        expect(selector(state)).toEqual(expected);
      });
    });
  });

  describe('groups', () => {
    describe('getGroupsById', () => {
      it('should select the `groups.byId`', () => {
        const selector = selectors.getGroupsById();
        const expected = fromJS(spa.groups.byId);
        expect(selector(state)).toEqual(expected);
      });
    });

    describe('getTargetGroupIds', () => {
      it('should select the `groups.targetIds`', () => {
        const selector = selectors.getTargetGroupIds();
        const expected = fromJS(spa.groups.targetIds);
        expect(selector(state)).toEqual(expected);
      });
    });
  });


  describe('getEnums', () => {
    it('should select the `groups`', () => {
      const selector = selectors.getEnums();
      expect(selector(state)).toEqual(fromJS(spa.enums));
    });
  });
});
