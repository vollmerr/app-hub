/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import requestWithToken from 'utils/requestWithToken';
import * as saga from '../saga';
import * as C from '../constants';
import * as actions from '../actions';

const data = { data: 'test data' };
const error = { message: 'test error' };


describe('paasSaga', () => {
  it('should wait for `GET_MANAGER_DATA_REQUEST`', () => {
    testSaga(saga.default).next()
      .takeEveryEffect(C.GET_MANAGER_DATA_REQUEST, saga.getManagerData).next()
      .finish().isDone();
  });
});


describe('getManagerData', () => {
  it('should call the api and update the store with its results', () => {
    const url = `${saga.base}`;

    testSaga(saga.getManagerData).next()
      .call(requestWithToken, url).next(data)
      .put(actions.getManagerDataSuccess(data)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = saga.getManagerData();
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getManagerDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});
