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
      g: { 0: [1, 2, 3], 1: [4, 5, 6] },
    },
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
  describe('getAckById', () => {
    it('should select an acknowledgment by id from the lookup', () => {
      const selector = selectors.getAckById('x');
      expect(selector(state)).toEqual(fromJS(spa.acknowledgments.byId.x));
    });
  });

  describe('user', () => {
    describe('getUser', () => {
      it('should select the user state', () => {
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


  describe('admin', () => {
    describe('getAdmin', () => {
      it('should select the admin state', () => {
        const selector = selectors.getAdmin;
        expect(selector(state)).toEqual(fromJS(spa.admin));
      });
    });

    describe('getAdminItems', () => {
      it('should select a List of acknowledgments based off the type passed', () => {
        const selector = selectors.geAdminItems('acksPrevious');
        const expected = fromJS([
          spa.acknowledgments.byId[spa.admin.acksPreviousIds[0]], // recipients id
        ]);
        expect(selector(state)).toEqual(expected);
      });
    });
  });


  describe('report', () => {
    describe('getReport', () => {
      it('should select the report state', () => {
        const selector = selectors.getReport;
        expect(selector(state)).toEqual(fromJS(spa.report));
      });
    });

    describe('getReportData', () => {
      it('should select a the report data based off the reports id', () => {
        const selector = selectors.getReportData;
        const expected = fromJS(spa.report.byId[spa.report.id]);
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
