/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import requestWithToken from 'utils/requestWithToken';
import paasSaga, { paasWorker } from '../saga';
import { INIT_DATA_REQUEST } from '../constants';
import { initDataSuccess, initDataFailure } from '../actions';

const data = { data: 'test data' };
const error = { message: 'test error' };


describe('paasSaga', () => {
  it('should wait for INIT_DATA_REQUEST', () => {
    testSaga(paasSaga)
      .next()
      .takeEveryEffect(INIT_DATA_REQUEST, paasWorker)
      .finish()
      .isDone();
  });
});


describe('paasWorker', () => {
  it('should call the api and update the store with its results', () => {
    testSaga(paasWorker)
      .next()
      .call(requestWithToken, 'TODO')
      .next(data)
      .put(initDataSuccess(data))
      .finish()
      .isDone();
  });

  it('should handle errors', () => {
    const errGen = paasWorker();
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(initDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});
