import { fromJS } from 'immutable';

import pasReducer, { initialState } from '../reducer';
import * as C from '../constants';


const authorizations = {
  byId: {
    A: { [C.AUTH.MANAGER_SID]: 'CZS', [C.AUTH.LAST_MODIFIED]: '1', [C.AUTH.AUTH_YEAR]: 2018, [C.AUTH.MANAGER_NAME]: 'Al1 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'AS', app1: 1, app2: 1, app3: 1, app4: 1, status: C.STATUS.ACTIVE, fullName: 'joe1 franks', [C.AUTH.ID]: 'A', [C.AUTH.EMAIL]: 'a@b.com', [C.AUTH.POS_NUMBER]: 'd13' },
    B: { [C.AUTH.MANAGER_SID]: 'AYS', [C.AUTH.LAST_MODIFIED]: '1', [C.AUTH.AUTH_YEAR]: 2018, [C.AUTH.MANAGER_NAME]: 'Al2 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'BS', app1: 1, app2: 1, app3: 0, app4: 1, status: C.STATUS.ACTIVE, fullName: 'joe2 franks', [C.AUTH.ID]: 'B', [C.AUTH.EMAIL]: 'a@b.com', [C.AUTH.POS_NUMBER]: 'd13' },
    C: { [C.AUTH.MANAGER_SID]: '', [C.AUTH.LAST_MODIFIED]: '1', [C.AUTH.AUTH_YEAR]: 2018, [C.AUTH.MANAGER_NAME]: '', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'CS', app1: 1, app2: 1, app3: 1, app4: 1, status: C.STATUS.NO_MANAGER, fullName: 'joe3 franks', [C.AUTH.ID]: 'C', [C.AUTH.EMAIL]: 'c@b.com', [C.AUTH.POS_NUMBER]: 'd13' },
    D: { [C.AUTH.MANAGER_SID]: 'AXS', [C.AUTH.LAST_MODIFIED]: '1', [C.AUTH.AUTH_YEAR]: 2018, [C.AUTH.MANAGER_NAME]: 'Al4 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'DS', app1: 1, app2: 1, app3: 1, app4: 1, status: C.STATUS.ASSIGNED_MANAGER, fullName: 'joe4 franks', [C.AUTH.ID]: 'D', [C.AUTH.EMAIL]: 'd@b.com', [C.AUTH.POS_NUMBER]: 'd13' },
    E: { [C.AUTH.MANAGER_SID]: 'AXS', [C.AUTH.LAST_MODIFIED]: '1', [C.AUTH.AUTH_YEAR]: 2018, [C.AUTH.MANAGER_NAME]: 'Al5 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'ES', app1: 1, app2: 1, app3: 1, app4: 1, status: C.STATUS.ASSIGNED_MANAGER, fullName: 'joe5 franks', [C.AUTH.ID]: 'E', [C.AUTH.EMAIL]: 'e@b.com', [C.AUTH.POS_NUMBER]: 'd13' },
    F: { [C.AUTH.MANAGER_SID]: 'AXS', [C.AUTH.LAST_MODIFIED]: '1', [C.AUTH.AUTH_YEAR]: 2018, [C.AUTH.MANAGER_NAME]: 'Al6 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'FS', app1: 1, app2: 1, app3: 1, app4: 1, status: C.STATUS.INACTIVE, fullName: 'joe6 franks', [C.AUTH.ID]: 'F', [C.AUTH.EMAIL]: 'f@b.com', [C.AUTH.POS_NUMBER]: 'd13' },
    G: { [C.AUTH.MANAGER_SID]: 'AXS', [C.AUTH.LAST_MODIFIED]: '1', [C.AUTH.AUTH_YEAR]: 2018, [C.AUTH.MANAGER_NAME]: 'Al7 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'GS', app1: null, app2: null, app3: null, app4: null, status: C.STATUS.INACTIVE, fullName: 'joe7 franks', [C.AUTH.ID]: 'G', [C.AUTH.EMAIL]: 'g@b.com', [C.AUTH.POS_NUMBER]: 'd13' },
  },
  allIds: [],
};

authorizations.allIDs = Object.values(authorizations.byId).map((item) => item[C.AUTH.ID]);

const manager = {
};

const data = {
  all: Object.values(authorizations.byId),
  [C.REPORT.APPROVED]: Object.values(authorizations.byId).filter((item) => C.APP_LIST.every((app) => item[app] === 1))
                       .filter((item) => item[C.AUTH.STATUS] !== C.STATUS.NO_MANAGER),
  [C.REPORT.DENIED]: Object.values(authorizations.byId).filter((item) => C.APP_LIST.some((app) => item[app] === 0))
                        .filter((item) => item[C.AUTH.STATUS] !== C.STATUS.NO_MANAGER),
  [C.REPORT.PENDING]: Object.values(authorizations.byId).filter((item) => C.APP_LIST.every((app) => item[app] === null))
                        .filter((item) => item[C.AUTH.STATUS] !== C.STATUS.NO_MANAGER),
  [C.REPORT.NO_MANAGER]: Object.values(authorizations.byId).filter((item) => item[C.AUTH.STATUS] === C.STATUS.NO_MANAGER),
  [C.STATUS.ASSIGNED_MANAGER]: Object.values(authorizations.byId).filter((item) => item[C.AUTH.STATUS] === C.STATUS.ASSIGNED_MANAGER),
};

const report = {
  isAdmin: false,
  lastFetched: undefined,
  key: 2,
  data,
  filters: {},
};

const state = {
  authorizations,
  manager,
  report,
};

// console.log('state.report=',state.report);

describe('pasReducer', () => {
  let action;
  let payload;
  beforeEach(() => {
  });

  it('should return the initial state', () => {
    expect(pasReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  describe('GET_MANAGER_DATA_SUCCESS', () => {
    let actual;
    beforeEach(() => {
      payload = Object.values(authorizations.byId); //  Object.values(authorizations.byId);
      action = { type: C.GET_MANAGER_DATA_SUCCESS, payload };
    });
    it('set currentids', () => {
      actual = pasReducer(fromJS(state), action);
      expect(actual.getIn(['manager', 'currentIds']).size).toEqual(4);
    });
    it('set previousIds', () => {
      actual = pasReducer(fromJS(state), action);
      expect(actual.getIn(['manager', 'previousIds']).size).toEqual(3);  // takes the pending and the nomanager
    });
    it('set allIds', () => {
      actual = pasReducer(fromJS(state), action);
      expect(actual.getIn(['manager', 'allIds']).size).toEqual(7);  // takes the pending and the nomanager
    });
  });

  describe('UPDATE_USERS_SUCCESS', () => {
    let actual;
    beforeEach(() => {
      payload = Object.values(authorizations.byId);
      action = { type: C.UPDATE_USERS_SUCCESS, payload };
    });

    it('should add to data.approved with updated values', () => {
      actual = pasReducer(fromJS(state), action);
      expect(actual.getIn(['report', 'data', `${C.REPORT.APPROVED}`]).size).toEqual(5);
    });
    it('should add to data.denied', () => {
      actual = pasReducer(fromJS(state), action);
      expect(actual.getIn(['report', 'data', `${C.REPORT.DENIED}`]).size).toEqual(1);
    });

    it('should put back in assignedManager', () => {
      actual = pasReducer(fromJS(state), action);
      expect(actual.getIn(['report', 'data', `${C.STATUS.ASSIGNED_MANAGER}`]).size).toEqual(2);
      expect(actual.getIn(['report', 'data', `${C.STATUS.ASSIGNED_MANAGER}`]).toJS()[0][C.AUTH.ID]).toEqual('D');
      expect(actual.getIn(['report', 'data', `${C.STATUS.ASSIGNED_MANAGER}`]).toJS()[1][C.AUTH.ID]).toEqual('E');
    });

    it('should not crash if report.data.all is undefined', () => {
      state.report.data.all = undefined;
      actual = pasReducer(fromJS(state), action);
      expect(actual.getIn(['report', 'data']).toJS().all).toEqual(undefined);
      state.report.data.all = Object.values(authorizations.byId);
    });
  });


  describe('GET_REPORT_DATA_SUCCESS', () => {
    let actual;
    beforeEach(() => {
      payload = { data: Object.values(authorizations.byId) };
      action = { type: C.GET_REPORT_DATA_SUCCESS, payload };
      actual = pasReducer(fromJS(state), action);
    });
    it('set ASSIGNED_MANAGER', () => {
      expect(actual.getIn(['report', 'data', `${C.STATUS.ASSIGNED_MANAGER}`]).size).toEqual(2);
    });
    it('set NO_MANAGER', () => {
      expect(actual.getIn(['report', 'data', `${C.REPORT.NO_MANAGER}`]).size).toEqual(1);
    });
    it('set APPROVED', () => {
      expect(actual.getIn(['report', 'data', `${C.REPORT.APPROVED}`]).size).toEqual(4);
    });
    it('set any denied', () => {
      expect(actual.getIn(['report', 'data', `${C.REPORT.DENIED}`]).size).toEqual(1);
    });
    it('set PENDING', () => {
      expect(actual.getIn(['report', 'data', `${C.REPORT.PENDING}`]).size).toEqual(1);
    });
  });

  describe('SET_REPORT_KEY', () => {
    it('should set the report key in the store', () => {
      payload = 100;
      action = { type: C.SET_REPORT_KEY, payload };
      const actual = pasReducer(fromJS(state), action);
      expect(actual.getIn(['report', 'key'])).toEqual(100);
    });
  });

  describe('SET_REPORT_FILTER', () => {
    it('should set the values into report filters', () => {
      payload = { [C.AUTH.AUTH_YEAR]: '2018' };
      action = { type: C.SET_REPORT_FILTER, payload };
      let actual = pasReducer(fromJS(state), action);
      expect(actual.getIn(['report', 'filters']).size).toEqual(1);

      // now add a second one
      payload = { [C.AUTH.MANAGER_SID]: 'aaaa' };
      action = { type: C.SET_REPORT_FILTER, payload };
      actual = pasReducer(fromJS(actual), action);
      expect(actual.getIn(['report', 'filters']).size).toEqual(2);
    });
    it('should set the filters to empty if no filter passed in', () => {
      payload = undefined;
      action = { type: C.SET_REPORT_FILTER, payload };
      const actual = pasReducer(fromJS(state), action);
      expect(actual.getIn(['report', 'filters']).size).toEqual(0);
    });
  });


  describe('UPDATE_USER_MANAGER_SUCCESS', () => {
    let actual;
    let expected;
    beforeEach(() => {
      expect(state.report.data[C.REPORT.NO_MANAGER].length).toEqual(1);
      expect(state.report.data[C.REPORT.PENDING].length).toEqual(1);
      payload = { manager: authorizations.byId.A, employee: authorizations.byId.C };
      action = { type: C.UPDATE_USER_MANAGER_SUCCESS, payload };
      actual = pasReducer(fromJS(state), action);
    });

    it('should remove from nomanagerlist', () => {
      expected = report.data[C.REPORT.NO_MANAGER].filter((item) => item[C.AUTH.ID] !== authorizations.byId.C[C.AUTH.ID]);
      expect(actual.getIn(['report', 'data', `${C.REPORT.NO_MANAGER}`]).toJS()).toEqual(expected);
    });

    it('should add to data.all with updated values', () => {
      expect(actual.getIn(['report', 'data', 'all']).size).toEqual(7);
    });

    it('should add to data.pending with updated values', () => {
      // id C should be removed from no manager and placed in pending..
      expect(actual.getIn(['report', 'data', `${C.REPORT.PENDING}`]).size).toEqual(2);
      expect(actual.getIn(['report', 'data', `${C.REPORT.NO_MANAGER}`]).size).toEqual(0);
    });
  });
});
