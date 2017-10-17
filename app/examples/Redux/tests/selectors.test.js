import { fromJS } from 'immutable';
import { selectReduxDomain, makeSelectExampleData } from '../selectors';

const exampleData = { a: 'test data' };
const redux = { exampleData };
const state = fromJS({
  redux,
  otherStuff: { b: 'other stuff' },
});


describe('selectReduxDomain', () => {
  it('should select the sagas state', () => {
    expect(selectReduxDomain(state).toJS()).toEqual(redux);
  });
});

describe('makeSelectExampleData', () => {
  const dataSelector = makeSelectExampleData();
  it('should select redux.exampleData from state', () => {
    expect(dataSelector(state).toJS()).toEqual(exampleData);
  });
});
