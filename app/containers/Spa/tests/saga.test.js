/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';

import requestWithToken from 'utils/requestWithToken';
import spaSaga, { initData, newAck, urls } from '../saga';

import {
  INIT_DATA_REQUEST,
  NEW_ACK_REQUEST,
} from '../constants';

import {
  initDataSuccess,
  initDataFailure,
  newAckSuccess,
  newAckFailure,
} from '../actions';

const data = { data: 'test data' };
const error = { message: 'test error' };

const action = { payload: fromJS(data) };

describe('spaSaga', () => {
  it('should wait for `INIT_DATA_REQUEST` and `NEW_ACK_REQUEST`', () => {
    testSaga(spaSaga)
      .next()
      .takeLatestEffect(INIT_DATA_REQUEST, initData)
      .next()
      .takeLatestEffect(NEW_ACK_REQUEST, newAck)
      .finish()
      .isDone();
  });
});


describe('initData', () => {
  it('should call the api and update the store with its results', () => {
    testSaga(initData)
      .next()
      .call(requestWithToken, urls.initData)
      .next(data)
      .put(initDataSuccess(data))
      .finish()
      .isDone();
  });

  it('should handle errors', () => {
    const errGen = initData();
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(initDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('newAck', () => {
  it('should call the api and update the store with its results', () => {
    const options = {
      method: 'POST',
      body: data,
    };

    testSaga(newAck, action)
      .next()
      .call(requestWithToken, urls.newAck, options)
      .next(data)
      .put(newAckSuccess(data))
      .finish()
      .isDone();
  });

  it('should handle errors', () => {
    const errGen = newAck(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(newAckFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});
