import { fromJS } from 'immutable';
import makeSelectSpa, {
  selectSpaDomain,
  makeSelectSpaData,
  makeSelectPendingAcks,
  makeSelectPreviousAcks,
} from '../selectors';

const data = {
  a: 'test data',
  pendingAcks: [{ name: 'test1' }],
  previousAcks: [{ name: 'test2' }],
};
const spa = { data };
const state = fromJS({
  spa,
  otherStuff: { b: 'other stuff' },
});


describe('makeSelectSpa', () => {
  const selector = makeSelectSpa();
  it('should select the `spa` state as plain JS', () => {
    expect(selector(state)).toEqual(spa);
  });
});

describe('selectSpaDomain', () => {
  it('should select the `spa` state', () => {
    expect(selectSpaDomain(state).toJS()).toEqual(spa);
  });
});

describe('makeSelectSpaData', () => {
  const selector = makeSelectSpaData();
  it('should select `data` from state', () => {
    expect(selector(state).toJS()).toEqual(spa.data);
  });
});

describe('makeSelectPendingAcks', () => {
  const selector = makeSelectPendingAcks();
  it('should select `pendingAcks` from spa.data as plain JS', () => {
    expect(selector(state)).toEqual(spa.data.pendingAcks);
  });
});

describe('makeSelectPreviousAcks', () => {
  const selector = makeSelectPreviousAcks();
  it('should select `previousAcks` from spa.data as plain JS', () => {
    expect(selector(state)).toEqual(spa.data.previousAcks);
  });
});
