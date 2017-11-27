
import { fromJS } from 'immutable';

import spaReducer, { initialState } from '../reducer';

import {
  INIT_DATA_SUCCESS,
} from '../constants';

const pendingAcks = [
  { id: 1, name: 'testPending1', isActive: true },
  { id: 2, name: 'testPending2', isActive: true },
];

const previousAcks = [
  { id: 3, name: 'testPrevious1', isActive: false },
  { id: 4, name: 'testPrevious2', isActive: false },
];

const payload = [
  ...pendingAcks,
  ...previousAcks,
];

describe('spaReducer', () => {
  let expected;
  beforeEach(() => {
    expected = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(spaReducer(undefined, {})).toEqual(expected);
  });

  it('sets the pending acknowledgments on `INIT_DATA_SUCCESS`', () => {
    const action = { type: INIT_DATA_SUCCESS, payload };
    const actual = spaReducer(undefined, action).get('data').get('pendingAcks').toJS();
    expect(actual).toEqual(pendingAcks);
  });

  it('sets the previous acknowledgments on `INIT_DATA_SUCCESS`', () => {
    const action = { type: INIT_DATA_SUCCESS, payload };
    const actual = spaReducer(undefined, action).get('data').get('previousAcks').toJS();
    expect(actual).toEqual(previousAcks);
  });
});
