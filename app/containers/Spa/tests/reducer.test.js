
import { fromJS } from 'immutable';

import spaReducer, { initialState } from '../reducer';

import {
  INIT_DATA_SUCCESS,
  DISABLE_ACK_SUCCESS,
  ACK,
  STATUS,
} from '../constants';

const pendingAcks = [
  { [ACK.ID]: 1, [ACK.TITLE]: 'testPending1', [ACK.STATUS]: STATUS.ACTIVE },
  { [ACK.ID]: 2, [ACK.TITLE]: 'testPending2', [ACK.STATUS]: STATUS.ACTIVE },
];

const previousAcks = [
  { [ACK.ID]: 3, [ACK.TITLE]: 'testPrevious1', [ACK.STATUS]: STATUS.DISABLED },
  { [ACK.ID]: 4, [ACK.TITLE]: 'testPrevious2', [ACK.STATUS]: STATUS.EXPIRED },
];

const data = [
  ...pendingAcks,
  ...previousAcks,
];

describe('spaReducer', () => {
  let expected;
  beforeEach(() => {
    expected = fromJS(initialState);
  });

  it('should return the initial state', () => {
    expect(spaReducer(undefined, {})).toEqual(expected);
  });

  it('should set the data on `INIT_DATA_SUCCESS`', () => {
    const action = { type: INIT_DATA_SUCCESS, payload: data };
    const actual = spaReducer(undefined, action).get('data').toJS();
    expect(actual).toEqual(data);
  });

  it('should set the acknowledgment as disabled on `DISABLE_ACK_SUCCESS`', () => {
    const action = { type: DISABLE_ACK_SUCCESS, payload: pendingAcks[0] };
    const state = fromJS({ data });
    const actual = spaReducer(state, action).get('data').toJS();
    expected = [...data];
    expected[0][ACK.STATUS] = STATUS.DISABLED;
    expect(actual).toEqual(expected);
  });
});
