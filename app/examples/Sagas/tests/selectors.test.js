import { fromJS } from 'immutable';
import makeSelectSagasData, { selectSagasDomain } from '../selectors';

const data = { a: 'test data' };
const sagas = { data };
const state = fromJS({
  sagas,
  otherStuff: { b: 'other stuff' },
});


describe('selectSagasDomain', () => {
  it('should select the sagas object', () => {
    expect(selectSagasDomain(state).toJS()).toEqual(sagas);
  });
});

// describe('examples/Sagas makeSelectSagasData', () => {
//   it('should select data from the sagas object', () => {
//     expect(makeSelectSagasData(state).toJS()).toEqual(data);
//   });
// });
