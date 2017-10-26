/* eslint-disable redux-saga/yield-effects */
import { testSaga } from 'redux-saga-test-plan';

import { authenticate } from 'utils/requestWithToken';
import appHubSaga, { matchPattern } from '../saga';
import { CHANGE_APP_STATUS } from '../constants';

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
    const action = { type: 'TEST_OTHER' };

    testSaga(matchPattern, action)
      .next()
      .finish()
      .isDone();
  });

  it('should put changeAppStatus if the type ends in SUCCESS', () => {
    const action = { type: 'TEST_SUCCESS' };

    testSaga(matchPattern, action)
      .next()
      .put({ type: CHANGE_APP_STATUS, loading: false, error: null })
      .finish()
      .isDone();
  });

  it('should put changeAppStatus if the type ends in FAILURE', () => {
    const error = 'test error';
    const action = { type: 'TEST_FAILURE', error };

    testSaga(matchPattern, action)
      .next()
      .put({ type: CHANGE_APP_STATUS, loading: false, error })
      .finish()
      .isDone();
  });
});
