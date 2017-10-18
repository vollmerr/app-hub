/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { delay } from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';

import request from 'utils/request';
import exampleSaga, { exampleSagaWorker, exampleUrl } from '../saga';
import { EXAMPLE_DATA_REQUEST } from '../constants';
import { exampleSuccess, exampleFailure } from '../actions';

const testData = { data: 'test data' };
const testError = { message: 'test error' };


describe('exampleSaga', () => {
  const gen = exampleSaga();

  it('should wait for EXAMPLE_DATA_REQUEST', () => {
    expect(gen.next().value).toEqual(takeEvery(EXAMPLE_DATA_REQUEST, exampleSagaWorker));
  });

  it('should be done', () => {
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('exampleSagaWorker', () => {
  const gen = exampleSagaWorker();

  it('should call the api', () => {
    expect(gen.next().value).toEqual(call(request, exampleUrl));
  });

  it('should delay (to show that it is async more clearly)', () => {
    const value = JSON.stringify(gen.next(testData).value); // note must call with testData to setup next test...
    const expected = JSON.stringify(delay());
    expect(value).toEqual(expected);
  });

  it('should update the store with the api results', () => {
    expect(gen.next(testData).value).toEqual(put(exampleSuccess(testData)));
  });

  it('should be done', () => {
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('should handle errors', () => {
    const errGen = exampleSagaWorker();
    errGen.next();
    expect(errGen.throw(testError).value).toEqual(put(exampleFailure(testError)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});
