/* eslint-disable redux-saga/yield-effects */
import { put, call, takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';

import { requestWithToken } from '../../../utils/api';

import * as hubSelectors from '../../AppHub/selectors';

import * as sagas from '../saga';
import * as selectors from '../selectors';
import * as C from '../constants';
import * as actions from '../actions';


const data = { recipients: ['1', '2'], acknowledgments: ['3', '4'], id: 1 };
const groups = { targets: ['1', '2'], creators: ['13', '23'] };
const error = { message: 'test error' };

let action;


describe('spaSaga', () => {
  it(`should take the latest
      'GET_ACK_STATUS_REQUEST',
      'GET_USER_DATA_REQUEST',
      'READ_ACK_REQUEST',
      'GET_ADMIN_DATA_REQUEST',
      'GET_GROUPS_REQUEST',
      'NEW_ACK_REQUEST',
      'SAVE_ACK_REQUEST',
      'DISABLE_ACK_REQUEST',
      'GET_REPORT_DATA_REQUEST'`,
    () => {
      testSaga(sagas.default).next()
        .all([
          takeLatest(C.GET_ACK_STATUS_REQUEST, sagas.getAckStatus),
          takeLatest(C.GET_USER_DATA_REQUEST, sagas.getUserData),
          takeLatest(C.READ_ACK_REQUEST, sagas.readAck),
          takeLatest(C.GET_ADMIN_DATA_REQUEST, sagas.getAdminData),
          takeLatest(C.GET_GROUPS_REQUEST, sagas.getGroups),
          takeLatest(C.NEW_ACK_REQUEST, sagas.newAck),
          takeLatest(C.SAVE_ACK_REQUEST, sagas.saveAck),
          takeLatest(C.DISABLE_ACK_REQUEST, sagas.disableAck),
          takeLatest(C.GET_REPORT_DATA_REQUEST, sagas.getReportData),
        ]).next()
        .finish().isDone();
    });
});


describe('getAckStatus', () => {
  it('should call the api and update the store with its results', () => {
    const url = `${sagas.base}/acknowledgementstatuses`;

    testSaga(sagas.getAckStatus).next()
      .call(requestWithToken, url).next(data)
      .put(actions.getAckStatusSuccess(data)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.getAckStatus(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getAckStatusFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('getUserData', () => {
  it('should get the users sid, call the api, and update the store with its results', () => {
    const sid = 99;
    const urls = {
      recipients: `${sagas.base}/recipients/${sid}`,
      acknowledgments: `${sagas.base}/recipients/${sid}/acknowledgements`,
    };
    hubSelectors.getUserSid = jest.fn(() => sid);

    testSaga(sagas.getUserData).next()
      .select(hubSelectors.getUserSid).next(sid)
      .all([
        call(requestWithToken, urls.recipients),
        call(requestWithToken, urls.acknowledgments),
      ]).next([data.recipients, data.acknowledgments])
      .put(actions.getUserDataSuccess({
        recipients: data.recipients,
        acknowledgments: data.acknowledgments,
      })).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.getUserData();
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getUserDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('readAck', () => {
  it('should call the api and update the store with its results', () => {
    action = { payload: data };
    const options = {
      method: 'POST',
    };
    const url = `${sagas.base}/recipients/${data.id}/acknowledge`;

    testSaga(sagas.readAck, action).next()
      .call(requestWithToken, url, options).next(data)
      .put(actions.readAckSuccess(data)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.readAck(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.readAckFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('getAdminData', () => {
  it('should call the api and update the store with its results', () => {
    const url = `${sagas.base}/acknowledgements`;

    testSaga(sagas.getAdminData).next()
      .call(requestWithToken, url).next(data.acknowledgments)
      .put(actions.getAdminDataSuccess({
        acknowledgments: data.acknowledgments,
      })).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.getAdminData(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getAdminDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('getGroups', () => {
  it('should call the api and update the store with its results', () => {
    const urls = {
      targets: `${sagas.base}/targets`,
      creators: `${sagas.base}/creators`,
    };

    testSaga(sagas.getGroups).next()
      .all([
        call(requestWithToken, urls.targets),
        call(requestWithToken, urls.creators),
      ]).next([groups.targets, groups.creators])
      .put(actions.getGroupsSuccess({
        targets: groups.targets,
        creators: groups.creators,
      })).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.getGroups(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getGroupsFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('newAck', () => {
  it('should call the api, update the store with its results, then get the updated acknowledgments', () => {
    action = { payload: data };
    const options = {
      method: 'POST',
      body: data,
    };
    const url = `${sagas.base}/acknowledgements`;

    testSaga(sagas.newAck, action).next()
      .call(requestWithToken, url, options).next(data)
      .put(actions.newAckSuccess(data)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.newAck(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.newAckFailure(error)));
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
          path: `/${C.ACK.STATUS}`,
          value: C.STATUS.DISABLED,
        },
      ],
    };
    const url = `${sagas.base}/acknowledgements/${data.id}`;

    testSaga(sagas.disableAck, action).next()
      .call(requestWithToken, url, options).next(data)
      .put(actions.disableAckSuccess(data)).next()
      .finish().isDone();
  });

  it('should set the value based off the acknowledgments status', () => {
    action = { payload: { ...data, [C.ACK.STATUS]: C.STATUS.PENDING } };
    const options = {
      method: 'PATCH',
      body: [
        {
          op: 'replace',
          path: `/${C.ACK.STATUS}`,
          value: C.STATUS.CANCELED,
        },
      ],
    };
    const url = `${sagas.base}/acknowledgements/${data.id}`;

    testSaga(sagas.disableAck, action).next()
      .call(requestWithToken, url, options).next(data)
      .put(actions.disableAckSuccess(data)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.disableAck(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.disableAckFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('getReportData', () => {
  it('should call the api and update the store with its results', () => {
    const acknowledgment = { id: 1, name: 'abc' };
    const url = `${sagas.base}/acknowledgements/${data.id}/recipients`;
    action = { payload: data.id };

    const selector = () => fromJS(acknowledgment);
    selectors.getAckById = () => selector;

    testSaga(sagas.getReportData, action).next()
      .select(selector).next(selector())
      .call(requestWithToken, url).next(data.recipients)
      .put(actions.getReportDataSuccess({
        acknowledgment,
        recipients: data.recipients,
      })).next()
      .finish().isDone();
  });

  it('should get the acknowledgment if not found in the store', () => {
    const acknowledgment = undefined;
    const urls = {
      recipients: `${sagas.base}/acknowledgements/${data.id}/recipients`,
      acknowledgment: `${sagas.base}/acknowledgements/${data.id}`,
    };
    action = { payload: data.id };

    const selector = () => fromJS(acknowledgment);
    selectors.getAckById = () => selector;

    testSaga(sagas.getReportData, action).next()
      .select(selector).next(selector())
      .all([
        call(requestWithToken, urls.recipients),
        call(requestWithToken, urls.acknowledgment),
      ]).next([data.recipients, acknowledgment])
      .put(actions.getReportDataSuccess({
        acknowledgment,
        recipients: data.recipients,
      })).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = sagas.getReportData(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getReportDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});

