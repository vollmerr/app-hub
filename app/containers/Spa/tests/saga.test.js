/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';

import requestWithToken from 'utils/requestWithToken';
import spaSaga, { initData, newAck, disableAck, base } from '../saga';

import {
  INIT_DATA_REQUEST,
  NEW_ACK_REQUEST,
  DISABLE_ACK_REQUEST,
  STATUS,
  ACK,
} from '../constants';

import {
  initDataRequest,
  initDataSuccess,
  initDataFailure,
  newAckSuccess,
  newAckFailure,
  disableAckSuccess,
  disableAckFailure,
} from '../actions';

const data = { data: 'test data', id: 2 };
const error = { message: 'test error' };

let action;


describe('spaSaga', () => {
  it(`should take the latest
      'INIT_DATA_REQUEST',
      'NEW_ACK_REQUEST', and
      'DISABLE_ACK_REQUEST'`, () => {
    testSaga(spaSaga)
      .next()
      .takeLatestEffect(INIT_DATA_REQUEST, initData)
      .next()
      .takeLatestEffect(NEW_ACK_REQUEST, newAck)
      .next()
      .takeLatestEffect(DISABLE_ACK_REQUEST, disableAck)
      .finish()
      .isDone();
  });
});


describe('initData', () => {
  it('should call the api and update the store with its results', () => {
    action = { payload: fromJS(data) };
    const url = `${base}/`;

    testSaga(initData)
      .next()
      .call(requestWithToken, url)
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
  it('should call the api, update the store with its results, then get the updated acknowledgments', () => {
    action = { payload: fromJS(data) };
    const options = {
      method: 'POST',
      body: data,
    };
    const url = `${base}/acknowledgments`;

    testSaga(newAck, action)
      .next()
      .call(requestWithToken, url, options)
      .next(data)
      .put(newAckSuccess(data))
      .next()
      .put(initDataRequest())
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


describe('disableAck', () => {
  it('should call the api and update the store with its results', () => {
    action = { payload: data };
    const options = {
      method: 'PATCH',
      body: [
        {
          op: 'replace',
          path: `/${ACK.STATUS}`,
          value: STATUS.DISABLED, // TODO... DISBALED VALUE / STATUS IN GENERAL
        },
      ],
    };
    const url = `${base}/acknowledgments/${data.id}`;

    testSaga(disableAck, action)
      .next()
      .call(requestWithToken, url, options)
      .next(data)
      .put(disableAckSuccess(data))
      .finish()
      .isDone();
  });

  it('should handle errors', () => {
    const errGen = disableAck(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(disableAckFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});
