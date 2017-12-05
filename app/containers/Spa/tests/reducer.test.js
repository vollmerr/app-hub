
import { fromJS } from 'immutable';

import spaReducer, { initialState } from '../reducer';

import {
  INIT_DATA_SUCCESS,
  DISABLE_ACK_SUCCESS,
  GET_RECIPIENTS_SUCCESS,
  RECIPIENT,
  ACK,
  STATUS,
} from '../constants';

const recipients = [
  { [RECIPIENT.ID]: 1, [RECIPIENT.ACK_ID]: 11, [RECIPIENT.SID]: 111 },
  { [RECIPIENT.ID]: 2, [RECIPIENT.ACK_ID]: 11, [RECIPIENT.SID]: 222 },
];

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
  let state;
  beforeEach(() => {
    expected = fromJS(initialState);
    state = fromJS({
      data,
      recipients: {},
    });
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
    const actual = spaReducer(state, action).get('data').toJS();
    expected = [...data];
    expected[0][ACK.STATUS] = STATUS.DISABLED;
    expect(actual).toEqual(expected);
  });

  it('should set the `recipients` to the `id` of the acknowledgment', () => {
    const action = { type: GET_RECIPIENTS_SUCCESS, payload: recipients };
    const actual = spaReducer(state, action).get('recipients').toJS();
    expected = {
      [recipients[0][RECIPIENT.ACK_ID]]: recipients,
    };
    expect(actual).toEqual(expected);
  });

  it('should not update the `recipients` if no recipients', () => {
    const action = { type: GET_RECIPIENTS_SUCCESS, payload: [] };
    const actual = spaReducer(state, action).get('recipients');
    expect(actual).toEqual(state.get('recipients'));
  });
});
