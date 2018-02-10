import { fromJS } from 'immutable';

import * as selectors from '../selectors';
import * as C from '../constants';


const paas = {
  authorizations: {
    byId: {
      c1: { id: 'c1', test: 'stuff' },
      p1: { id: 'p1', test: 'other' },
    },
    allIds: ['c1', 'p1'],
  },
  manager: {
    lastFetched: null,
    currentIds: ['c1'],
    previousIds: ['p1'],
    allIds: ['c1', 'p1'],
  },
  report: {
    lastFetched: null,
    key: C.REPORT.NO_MANAGER,
    data: {
      0: [
        { id: 1, toFilter: 'no' },
        { id: 2, toFilter: 'yes' },
        { id: 3, toFilter: 'yes' },
      ],
      1: [
        { id: 4, toFilter: 'no' },
        { id: 5, toFilter: 'no' },
        { id: 6, toFilter: 'yes' },
      ],
    },
    filters: {
      toFilter: 'yes',
    },
  },
};

const state = fromJS({ paas });


describe('paas selectors', () => {
  describe('getManagerById', () => {
    it('should return a Map of authorizations for the manager based off the type passed', () => {
      const selector = selectors.getManagerById('current');
      const expected = {
        c1: paas.authorizations.byId.c1,
      };
      expect(selector(state)).toEqual(fromJS(expected));
    });
  });


  describe('getManagerItems', () => {
    it('should return a List of authorizations for the manager based off the type passed', () => {
      const selector = selectors.getManagerItems('previous');
      const expected = [paas.authorizations.byId.p1];
      expect(selector(state)).toEqual(fromJS(expected));
    });
  });


  describe('getReport', () => {
    it('should return the `report` section of the store', () => {
      const selector = selectors.getReport;
      expect(selector(state)).toEqual(fromJS(paas.report));
    });
  });


  describe('getReportData', () => {
    it('should return a Map of Lists, containing filtered report data', () => {
      const selector = selectors.getReportData;
      const expected = {
        0: [
          { id: 2, toFilter: 'yes' },
          { id: 3, toFilter: 'yes' },
        ],
        1: [
          { id: 6, toFilter: 'yes' },
        ],
      };
      expect(selector(state)).toEqual(fromJS(expected));
    });

    it('should not filter data if no filters are present', () => {
      const selector = selectors.getReportData;
      const newState = state.setIn(['paas', 'report', 'filters'], fromJS({}));
      expect(selector(newState)).toEqual(fromJS(paas.report.data));
    });
  });
});
