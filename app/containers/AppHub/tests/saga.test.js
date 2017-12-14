/* eslint-disable redux-saga/yield-effects */
import { fromJS } from 'immutable';
import { testSaga } from 'redux-saga-test-plan';

import { authenticate } from 'utils/requestWithToken';
import appHubSaga, { matchPattern } from '../saga';
import { CHANGE_APP_STATUS, AUTH_USER } from '../constants';
import * as selectors from '../selectors';


describe('appHubSaga Saga', () => {
  it('should call `authenticate` then `matchPattern` for any patterns', () => {
    testSaga(appHubSaga).next()
      .takeEveryEffect(AUTH_USER, authenticate).next()
      .takeEveryEffect('*', matchPattern).next()
      .finish().isDone();
  });
});

describe('matchPattern', () => {
  let app;
  let loading;
  beforeEach(() => {
    loading = 1;
    app = fromJS({ error: null, loading });
    selectors.selectApp = () => app;
  });

  it('should change the app status if the type ends in REQUEST', () => {
    const action = { type: 'TEST_REQUEST' };
    const payload = { loading: loading + 1, error: null };

    testSaga(matchPattern, action).next()
      .select(selectors.selectApp).next(app)
      .put({ type: CHANGE_APP_STATUS, payload }).next()
      .finish().isDone();
  });

  it('should call not authenticate if the type does not end in REQUEST', () => {
    const action = { type: 'TEST_OTHER' };

    testSaga(matchPattern, action).next()
      .select(selectors.selectApp).next(app)
      .finish().isDone();
  });

  it('should put changeAppStatus if the type ends in SUCCESS', () => {
    const action = { type: 'TEST_SUCCESS' };
    const payload = { loading: loading - 1, error: null };

    testSaga(matchPattern, action).next()
      .select(selectors.selectApp).next(app)
      .put({ type: CHANGE_APP_STATUS, payload }).next()
      .finish().isDone();
  });

  it('should put changeAppStatus if the type ends in FAILURE', () => {
    const error = new Error('test error');
    const action = { type: 'TEST_FAILURE', error: true, payload: error };
    const payload = { loading: loading - 1, error };

    testSaga(matchPattern, action).next()
      .select(selectors.selectApp).next(app)
      .put({ type: CHANGE_APP_STATUS, payload }).next()
      .finish().isDone();
  });

  it('should not update the store if there is an error', () => {
    app = fromJS({ error: true, loading });
    selectors.selectApp = () => app;
    const action = { type: 'TEST_REQUEST' };

    testSaga(matchPattern, action).next()
      .select(selectors.selectApp).next(app)
      .finish().isDone();
  });
});
