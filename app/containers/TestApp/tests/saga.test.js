/* eslint-disable redux-saga/yield-effects */
import { takeEvery, call, put } from 'redux-saga/effects';

import requestWithToken from 'utils/requestWithToken';
import testAppSaga, { testAppWorker } from '../saga';
import { INIT_DATA_REQUEST } from '../constants';
import { initDataSuccess, initDataFailure } from '../actions';

const data = { data: 'test data' };
const error = { message: 'test error' };


describe('testAppSaga', () => {
  const gen = testAppSaga();

  it('should wait for INIT_DATA_REQUEST', () => {
    expect(gen.next().value).toEqual(takeEvery(INIT_DATA_REQUEST, testAppWorker));
  });

  it('should be done', () => {
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('testAppWorker', () => {
  const gen = testAppWorker();

  it('should call the api', () => {
    expect(gen.next().value).toEqual(call(requestWithToken, 'TODO'));
  });

  it('should update the store with the api results', () => {
    expect(gen.next(data).value).toEqual(put(initDataSuccess(data)));
  });

  it('should be done', () => {
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('should handle errors', () => {
    const errGen = testAppWorker();
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(initDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});
