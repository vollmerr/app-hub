import { fromJS } from 'immutable';
import makeSelectSagasData, {
  selectSagasDomain,
  makeSelectSagasLoading,
  makeSelectSagasError,
} from '../selectors';

const data = { a: 'test data' };
const sagas = { data, loading: false, error: null };
const state = fromJS({
  sagas,
  otherStuff: { b: 'other stuff' },
});


describe('selectSagasDomain', () => {
  it('should select the sagas state', () => {
    expect(selectSagasDomain(state).toJS()).toEqual(sagas);
  });
});

describe('makeSelectSagasData', () => {
  const selector = makeSelectSagasData();
  it('should select data from state', () => {
    expect(selector(state).toJS()).toEqual(sagas.data);
  });
});

describe('makeSelectSagasLoading', () => {
  const selector = makeSelectSagasLoading();
  it('should select loading from state', () => {
    expect(selector(state)).toEqual(sagas.loading);
  });
});

describe('makeSelectSagasError', () => {
  const selector = makeSelectSagasError();
  it('should select error from state', () => {
    expect(selector(state)).toEqual(sagas.error);
  });
});
