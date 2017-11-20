/* eslint-disable redux-saga/yield-effects */
import { testSaga } from 'redux-saga-test-plan';

import { authenticate } from 'utils/requestWithToken';
import appHubSaga, { matchPattern } from '../saga';
import { CHANGE_APP_STATUS, AUTH_USER } from '../constants';

describe('appHubSaga Saga', () => {
  it('should call `authenticate` then `matchPattern` for any patterns', () => {
    testSaga(appHubSaga)
      .next()
      .takeEveryEffect(AUTH_USER, authenticate)
      .next()
      .takeEveryEffect('*', matchPattern)
      .finish()
      .isDone();
  });
});

describe('matchPattern', () => {
  it('should change the app status if the type ends in REQUEST', () => {
    const action = { type: 'TEST_REQUEST' };
    const payload = { loading: true, error: null };

    testSaga(matchPattern, action)
      .next()
      .put({ type: CHANGE_APP_STATUS, payload })
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
    const payload = { loading: false, error: null };

    testSaga(matchPattern, action)
      .next()
      .put({ type: CHANGE_APP_STATUS, payload })
      .finish()
      .isDone();
  });

  it('should put changeAppStatus if the type ends in FAILURE', () => {
    const error = new Error('test error');
    const action = { type: 'TEST_FAILURE', error: true, payload: error };
    const payload = { loading: false, error };

    testSaga(matchPattern, action)
      .next()
      .put({ type: CHANGE_APP_STATUS, payload })
      .finish()
      .isDone();
  });
});
