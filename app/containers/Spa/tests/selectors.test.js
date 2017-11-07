import { fromJS } from 'immutable';
import makeSelectSpa, {
  selectSpaDomain,
  makeSelectSpaData,
} from '../selectors';

const data = { a: 'test data' };
const spa = { data };
const state = fromJS({
  spa,
  otherStuff: { b: 'other stuff' },
});

describe('makeSelectSpa', () => {
  const selector = makeSelectSpa();
  it('should select the Spa state as plain JS', () => {
    expect(selector(state)).toEqual(spa);
  });
});

describe('selectSpaDomain', () => {
  it('should select the spa state', () => {
    expect(selectSpaDomain(state).toJS()).toEqual(spa);
  });
});

describe('makeSelectData', () => {
  const selector = makeSelectSpaData();
  it('should select data from state', () => {
    expect(selector(state).toJS()).toEqual(spa.data);
  });
});
