import { fromJS } from 'immutable';
import makeSelectPaas, {
  selectPaasDomain,
  makeSelectPaasData,
} from '../selectors';

const data = { a: 'test data' };
const paas = { data };
const state = fromJS({
  paas,
  otherStuff: { b: 'other stuff' },
});

describe('makeSelectPaas', () => {
  const selector = makeSelectPaas();
  it('should select the Paas state as plain JS', () => {
    expect(selector(state)).toEqual(paas);
  });
});

describe('selectPaasDomain', () => {
  it('should select the paas state', () => {
    expect(selectPaasDomain(state).toJS()).toEqual(paas);
  });
});

describe('makeSelectData', () => {
  const selector = makeSelectPaasData();
  it('should select data from state', () => {
    expect(selector(state).toJS()).toEqual(paas.data);
  });
});
