/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import requestWithToken from 'utils/requestWithToken';
import spaSaga, { spaWorker } from '../saga';
import { INIT_DATA_REQUEST } from '../constants';
import { initDataSuccess, initDataFailure } from '../actions';

const data = { data: 'test data' };
const error = { message: 'test error' };


describe('spaSaga', () => {
  it('should wait for INIT_DATA_REQUEST', () => {
    testSaga(spaSaga)
      .next()
      .takeEveryEffect(INIT_DATA_REQUEST, spaWorker)
      .finish()
      .isDone();
  });
});


describe('spaWorker', () => {
  it('should call the api and update the store with its results', () => {
    testSaga(spaWorker)
      .next()
      .call(requestWithToken, 'http://barsapi/api/BadgeRequests/GetBarsAppStartupData/')
      .next(data)
      .put(initDataSuccess(data))
      .finish()
      .isDone();
  });

  it('should handle errors', () => {
    const errGen = spaWorker();
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(initDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});
