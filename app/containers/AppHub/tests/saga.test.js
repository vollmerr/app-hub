/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { testSaga } from 'redux-saga-test-plan';

import { authenticate } from 'utils/request';
import appHubSaga, { matchPattern } from '../saga';

describe('appHubSaga Saga', () => {
  it('should call matchPattern for any patterns', () => {
    testSaga(appHubSaga)
      .next()
      .takeEveryEffect('*', matchPattern)
      .finish()
      .isDone();
  });
});

describe('matchPattern', () => {
  it('should call authenticate if the type ends in REQUEST', () => {
    const action = { type: 'TEST_REQUEST' };

    testSaga(matchPattern, action)
      .next()
      .call(authenticate, 'BARS')
      .finish()
      .isDone();
  });

  it('should call not authenticate if the type does not end in REQUEST', () => {
    const action = { type: 'TEST_SUCCESS' };

    testSaga(matchPattern, action)
      .next()
      .finish()
      .isDone();
  });
});
