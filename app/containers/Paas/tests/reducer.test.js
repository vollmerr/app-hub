
import { fromJS } from 'immutable';

import paasReducer, { initialState } from '../reducer';

import * as C from '../constants';


const authorizations = [
  { sid: 'sid1', firstName: 'firstName 1', lastName: 'lastName 1', app1: 1, app2: undefined, app3: 0, app4: undefined },
  { sid: 'sid2', firstName: 'firstName 2', lastName: 'lastName 2', app1: 1, app2: undefined, app3: 1, app4: 1 },
];


describe('paasReducer', () => {
  let expected;
  beforeEach(() => {
    expected = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(paasReducer(undefined, {})).toEqual(expected);
  });

  it('handles `GET_MANAGER_DATA_SUCCESS`', () => {
    const sid1 = authorizations[0].sid;
    const sid2 = authorizations[1].sid;
    expected = fromJS({
      byId: {
        [sid1]: authorizations[0],
        [sid2]: authorizations[1],
      },
      allIds: [sid1, sid2],
    });
    const action = { type: C.GET_MANAGER_DATA_SUCCESS, payload: authorizations };
    expect(paasReducer(undefined, action).get('authorizations')).toEqual(expected);
  });
});
