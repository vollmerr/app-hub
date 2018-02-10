/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { requestWithToken } from '../../../utils/api';

import * as sagas from '../saga';
import * as C from '../constants';
import * as actions from '../actions';


const data = { authorizations: ['1', '2'] };
const error = { message: 'test error' };

let action;


describe('paasSaga', () => {
  it(`should take the latest
      'GET_MANAGER_DATA_REQUEST',
      'UPDATE_USERS_REQUEST',
      'GET_REPORT_DATA_REQUEST'`,
    () => {
      testSaga(sagas.default).next()
        .all([
          takeLatest(C.GET_MANAGER_DATA_REQUEST, sagas.getManagerData),
          takeLatest(C.UPDATE_USERS_REQUEST, sagas.updateUsers),
          takeLatest(C.GET_REPORT_DATA_REQUEST, sagas.getReportData),
        ]).next()
        .finish().isDone();
    });
});


describe('getManagerData', () => {
  it('should call the api and update the store with its results', () => {
    const url = `${sagas.base}`;

    testSaga(sagas.getManagerData).next()
      .call(requestWithToken, url).next(data.authorizations)
      .put(actions.getManagerDataSuccess(data.authorizations)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.getManagerData(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getManagerDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('getReportData', () => {
  it('should call the api and update the store with its results', () => {
    const url = `${sagas.base}/reports`;

    testSaga(sagas.getReportData).next()
      .call(requestWithToken, url).next(data.authorizations)
      .put(actions.getReportDataSuccess(data.authorizations)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.getReportData(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getReportDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('updateUsers', () => {
  it('should call the api with data and update the store with its results', () => {
    action = { payload: data };
    const options = {
      method: 'POST',
      body: action.payload,
    };
    const url = `${sagas.base}`;

    testSaga(sagas.updateUsers, action).next()
      .call(requestWithToken, url, options).next(data)
      .put(actions.updateUsersSuccess(data)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.updateUsers(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.updateUsersFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});
