import { fromJS } from 'immutable';

import * as selectors from '../selectors';
import * as C from '../constants';


const spa = {
  user: {
    lastFetched: null,
    recipientsPendingIds: ['abc'],
    recipientsPreviousIds: ['def'],
  },
  admin: {
    lastFetched: null,
    acksActiveIds: ['g'],
    acksPreviousIds: ['y'],
    fetchedIds: ['y'],
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
  describe('user', () => {
    describe('getUser', () => {
      it('should select if the user state', () => {
        const selector = selectors.getUser;
        expect(selector(state)).toEqual(fromJS(spa.user));
      });
    });

    describe('getUserItems', () => {
      it('should select a List of acknowledgments combined with recipient details based off the type passed', () => {
        const selector = selectors.getUserItems('recipientsPrevious');
        const expected = fromJS([
          { ...spa.recipients.byId.def, ...spa.acknowledgments.byId.x, id: 'def' }, // recipients id
        ]);
        expect(selector(state)).toEqual(expected);
      });
    });
  });

  describe('enums', () => {
    describe('getEnums', () => {
      it('should select the enums', () => {
        const selector = selectors.getEnums;
        expect(selector(state)).toEqual(fromJS(spa.enums));
      });
    });
  });
});
