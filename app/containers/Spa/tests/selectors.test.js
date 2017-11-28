import { fromJS } from 'immutable';

import {
  makeSelectSpa,
  makeSelectPendingAcks,
  makeSelectPreviousAcks,
} from '../selectors';

import { STATUS } from '../constants';


const pendingAcks = [
  { id: 1, name: 'testPending1', status: STATUS.ACTIVE },
  { id: 2, name: 'testPending2', status: STATUS.ACTIVE },
];

const previousAcks = [
  { id: 3, name: 'testPrevious1', status: STATUS.DISABLED },
  { id: 4, name: 'testPrevious2', status: STATUS.EXPIRED },
];

const data = [
  ...pendingAcks,
  ...previousAcks,
];

const spa = { data };

const state = fromJS({
  spa,
  otherStuff: { b: 'other stuff' },
});


describe('makeSelectSpa', () => {
  const selector = makeSelectSpa();
  it('should select the `spa` state', () => {
    expect(selector(state)).toEqual(fromJS(spa));
  });
});


describe('makeSelectPendingAcks', () => {
  const selector = makeSelectPendingAcks();
  it('should select `pendingAcks`', () => {
    expect(selector(state)).toEqual(fromJS(pendingAcks));
  });
});


describe('makeSelectPreviousAcks', () => {
  const selector = makeSelectPreviousAcks();
  it('should select `previousAcks`', () => {
    expect(selector(state)).toEqual(fromJS(previousAcks));
  });
});
