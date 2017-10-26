import { fromJS } from 'immutable';

import makeSelectTestApp, {
  selectTestAppDomain,
  makeSelectTestAppLoading,
  makeSelectTestAppError,
  makeSelectTestAppData,
} from '../selectors';

const data = { a: 'test data' };
const testApp = { data, loading: false, error: null };
const state = fromJS({
  testApp,
  otherStuff: { b: 'other stuff' },
});

describe('makeSelectTestApp', () => {
  const selector = makeSelectTestApp();
  it('should select the TestApp state as plain JS', () => {
    expect(selector(state)).toEqual(testApp);
  });
});

describe('selectTestAppDomain', () => {
  it('should select the testApp state', () => {
    expect(selectTestAppDomain(state).toJS()).toEqual(testApp);
  });
});

describe('makeSelectData', () => {
  const selector = makeSelectTestAppData();
  it('should select data from state', () => {
    expect(selector(state).toJS()).toEqual(testApp.data);
  });
});

describe('makeSelectTestAppError', () => {
  const selector = makeSelectTestAppError();
  it('should select error from state', () => {
    expect(selector(state)).toEqual(testApp.error);
  });
});

describe('makeSelectTestAppLoading', () => {
  const selector = makeSelectTestAppLoading();
  it('should select loading from state', () => {
    expect(selector(state)).toEqual(testApp.loading);
  });
});
