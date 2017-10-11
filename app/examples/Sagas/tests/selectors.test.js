import { fromJS } from 'immutable';
import makeSelectSagasData, { selectSagasDomain } from '../selectors';

const data = { a: 'test data' };
const sagas = { data };
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
  const dataSelector = makeSelectSagasData();
  it('should select sagas.data from state', () => {
    expect(dataSelector(state).toJS()).toEqual(data);
  });
});
