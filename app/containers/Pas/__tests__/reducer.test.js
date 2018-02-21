/* eslint-disable */
import { fromJS } from 'immutable';

import pasReducer, { initialState } from '../reducer';
import * as C from '../constants';


const authorizations = {
  byId: {
    A: { managerSID: 'CZS', lastUpdated: '1', authYear: 2018, managerFullName: 'Al1 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'AS', app1: 1, app2: 1, app3: 1, app4: 1, status: 'active', fullName: 'joe1 franks', _id: 'A', email: 'a@b.com', posNumber: 'd13' },
    B: { managerSID: 'AYS', lastUpdated: '1', authYear: 2018, managerFullName: 'Al2 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'BS', app1: 1, app2: 1, app3: 0, app4: 1, status: 'active', fullName: 'joe2 franks', _id: 'B', email: 'a@b.com', posNumber: 'd13' },
    C: { managerSID: '', lastUpdated: '1', authYear: 2018, managerFullName: '', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'CS', app1: 1, app2: 1, app3: 1, app4: 1, status: 'noManager', fullName: 'joe3 franks', _id: 'C', email: 'a@b.com', posNumber: 'd13' },
    D: { managerSID: 'AXS', lastUpdated: '1', authYear: 2018, managerFullName: 'Al4 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'DS', app1: 1, app2: 1, app3: 1, app4: 1, status: 'assignedManager', fullName: 'joe4 franks', _id: 'D', email: 'a@b.com', posNumber: 'd13' },
  },
  allIds: ['A', 'B', 'C', 'D'],
};

const manager = {
};

const data = {
  all: [
    authorizations.byId.A,
    authorizations.byId.B,
    authorizations.byId.C,
    authorizations.byId.D,
  ],
  [C.REPORT.APPROVED]: [authorizations.byId.A],
  [C.REPORT.DENIED]: [authorizations.byId.B],
  [C.REPORT.PENDING]: [],
  [C.REPORT.NO_MANAGER]: [authorizations.byId.C],
  [C.STATUS.ASSIGNED_MANAGER]: [authorizations.byId.D],
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
  let expected;
  let action;
  let payload;
  beforeEach(() => {
    expected = fromJS(initialState);
  });

  it('should return the initial state', () => {
    expect(pasReducer(undefined, {})).toEqual(fromJS(initialState));
  });


  // TODO!>..
  describe('UPDATE_USER_MANAGER_SUCCESS', () => {
    let actual;
    let expected;
    let b;
    beforeEach(() => {
      payload = { manager: authorizations.byId.A, employee: authorizations.byId.B };
      action = { type: C.UPDATE_USER_MANAGER_SUCCESS, payload };
      b = Object.assign({},authorizations.byId.B);
      b[C.AUTH.STATUS] = C.STATUS.ASSIGNED_MANAGER;
      b[C.AUTH.MANAGER_NAME] = authorizations.byId.A[C.AUTH.FULL_NAME];
      b[C.AUTH.MANAGER_SID] = authorizations.byId.A[C.AUTH.SID];
      actual = pasReducer(fromJS(state), action);
     });

    it('should remove from nomanagerlist', () => {
      expected = [ authorizations.byId.D, b ];
      expect(actual.getIn(['report', 'data', 'assignedManager']).toJS()).toEqual(expected);
    });

    it('should add to data.all with updated values', () => {
      expected = [ authorizations.byId.A, authorizations.byId.C, authorizations.byId.D, b ];
      expect(actual.getIn(['report', 'data', 'all']).toJS()).toEqual(expected);
    });

    it('should add to data.pending with updated values', () => {
      expected = [ b ];
      expect(actual.getIn(['report', 'data', `${C.REPORT.PENDING}`]).toJS()).toEqual(expected);
    });
  });


  describe('UPDATE_USERS_SUCCESS', () => {
    let actual;
    let expected;
    let b;
    beforeEach(() => {
      b = Object.assign({},authorizations.byId.B);
      b[C.APPS.APP_3] = 1;
      b[C.AUTH.MANAGER_NAME] = authorizations.byId.A[C.AUTH.FULL_NAME];
      b[C.AUTH.MANAGER_SID] = authorizations.byId.A[C.AUTH.SID];
      payload = [b];
      action = { type: C.UPDATE_USERS_SUCCESS, payload };
    });

    it('should add to data.approved with updated values', () => {
      actual = pasReducer(fromJS(state), action);
      expected = [authorizations.byId.A, b ];
     expect(actual.getIn(['report', 'data', `${C.REPORT.APPROVED}`]).size).toEqual(2);
    });
    it('should remove from data.denied', () => {
      actual = pasReducer(fromJS(state), action);
      expected = [ ];
      expect(actual.getIn(['report', 'data', `${C.REPORT.DENIED}`]).toJS()).toEqual(expected);
    });

    it('should put back in assignedManager', () => {
      let d = Object.assign({},authorizations.byId.D);
      payload = [d];
      action = { type: C.UPDATE_USERS_SUCCESS, payload };
      actual = pasReducer(fromJS(state), action);
      expected = [ d ];
      expect(actual.getIn(['report', 'data', `${C.STATUS.ASSIGNED_MANAGER}`]).size).toEqual(1);
      expect(actual.getIn(['report', 'data', `${C.STATUS.ASSIGNED_MANAGER}`]).toJS()[0][C.AUTH.ID]).toEqual('D');
    });

  });
});
