/* eslint-disable */
import { fromJS } from 'immutable';

import pasReducer, { initialState } from '../reducer';
import * as C from '../constants';


const authorizations = {
  byId: {
    A: { managerSID: 'CS', lastUpdated: '1', authYear: 2018, managerFullName: 'Al1 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'AS', app1: 1, app2: 1, app3: 1, app4: 1, status: 'active', fullName: 'joe1 franks', _id: 'A', email: 'a@b.com', posNumber: 'd13' },
    B: { managerSID: 'AS', lastUpdated: '1', authYear: 2018, managerFullName: 'Al2 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'BS', app1: 1, app2: 1, app3: 0, app4: 1, status: 'active', fullName: 'joe2 franks', _id: 'B', email: 'a@b.com', posNumber: 'd13' },
    C: { managerSID: '', lastUpdated: '1', authYear: 2018, managerFullName: '', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'CS', app1: 1, app2: 1, app3: 1, app4: 1, status: 'noManager', fullName: 'joe3 franks', _id: 'C', email: 'a@b.com', posNumber: 'd13' },
    D: { managerSID: 'AS', lastUpdated: '1', authYear: 2018, managerFullName: 'Al1 Smith', created: '2011-01-01', lastApproved: '2012-02-02', sid: 'DS', app1: 1, app2: 1, app3: 1, app4: 1, status: 'assignedManager', fullName: 'joe4 franks', _id: 'D', email: 'a@b.com', posNumber: 'd13' },
  },
  allIds: ['A', 'B', 'C', 'D'],
};

const manager = {
};

const data = {
  all: [
    ...authorizations.byId,
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
  // describe('UPDATE_USER_MANAGER_SUCCESS', () => {
  //   let actual;
  //   beforeEach(() => {
  //     payload = { manager_id: 'A', employee_id: 'B' };
  //     action = { type: C.UPDATE_USER_MANAGER_SUCCESS, payload };
  //     actual = pasReducer(fromJS(state), action);
  //   });

  //   it('should remove from nomanagerlist', () => {
  //     expected = [];
  //     expect(actual.getIn(['report', 'data', 'assignedManager']).toJS()).toEqual(expected);
  //   });
  // });
});
