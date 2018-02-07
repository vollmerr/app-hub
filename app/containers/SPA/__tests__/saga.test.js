/* eslint-disable redux-saga/yield-effects */
import { put, call, takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';

import { requestWithToken } from '../../../utils/api';

import * as hubSelectors from '../../AppHub/selectors';

import spaSaga, {
  getUserData,
  getAdminData,
  getGroups,
  getReportData,
  newAck,
  disableAck,
  readAck,
  base,
} from '../saga';

import * as selectors from '../selectors';
import * as C from '../constants';
import * as actions from '../actions';


const data = { recipients: ['1', '2'], acknowledgments: ['3', '4'], id: 1 };
const groups = { targets: ['1', '2'], creators: ['13', '23'] };
const error = { message: 'test error' };

let action;


describe('spaSaga', () => {
  it(`should take the latest
      'GET_USER_DATA_REQUEST',
      'READ_ACK_REQUEST',
      'GET_ADMIN_DATA_REQUEST',
      'GET_GROUPS_REQUEST',
      'NEW_ACK_REQUEST',
      'DISABLE_ACK_REQUEST',
      'GET_REPORT_DATA_REQUEST'`,
    () => {
      testSaga(spaSaga).next()
        .all([
          takeLatest(C.GET_USER_DATA_REQUEST, getUserData),
          takeLatest(C.READ_ACK_REQUEST, readAck),
          takeLatest(C.GET_ADMIN_DATA_REQUEST, getAdminData),
          takeLatest(C.GET_GROUPS_REQUEST, getGroups),
          takeLatest(C.NEW_ACK_REQUEST, newAck),
          takeLatest(C.DISABLE_ACK_REQUEST, disableAck),
          takeLatest(C.GET_REPORT_DATA_REQUEST, getReportData),
        ]).next()
        .finish().isDone();
    });
});


describe('getUserData', () => {
  it('should get the users sid, call the api, and update the store with its results', () => {
    const sid = 99;
    const urls = {
      recipients: `${base}/recipients/${sid}`,
      acknowledgments: `${base}/recipients/${sid}/acknowledgments`,
    };
    hubSelectors.getUserSid = jest.fn(() => sid);

    testSaga(getUserData).next()
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
    const errGen = getUserData();
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
    const url = `${base}/recipients/${data.id}/acknowledge`;

    testSaga(readAck, action).next()
      .call(requestWithToken, url, options).next(data)
      .put(actions.readAckSuccess(data)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = readAck(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.readAckFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('getAdminData', () => {
  it('should call the api and update the store with its results', () => {
    const url = `${base}/acknowledgments`;

    testSaga(getAdminData).next()
      .call(requestWithToken, url).next(data.acknowledgments)
      .put(actions.getAdminDataSuccess({
        acknowledgments: data.acknowledgments,
      })).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = getAdminData(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getAdminDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('getGroups', () => {
  it('should call the api and update the store with its results', () => {
    const urls = {
      targets: `${base}/groups/targets`,
      creators: `${base}/groups/creators`,
    };

    testSaga(getGroups).next()
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
    const errGen = getGroups(action);
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
    const url = `${base}/acknowledgments`;

    testSaga(newAck, action).next()
      .call(requestWithToken, url, options).next(data)
      .put(actions.newAckSuccess(data)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = newAck(action);
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
    const url = `${base}/acknowledgments/${data.id}`;

    testSaga(disableAck, action).next()
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
    const url = `${base}/acknowledgments/${data.id}`;

    testSaga(disableAck, action).next()
      .call(requestWithToken, url, options).next(data)
      .put(actions.disableAckSuccess(data)).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = disableAck(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.disableAckFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});


describe('getReportData', () => {
  it('should call the api and update the store with its results', () => {
    const acknowledgment = { id: 1, name: 'abc' };
    const url = `${base}/acknowledgments/${data.id}/recipients`;
    action = { payload: data.id };

    const selector = () => fromJS(acknowledgment);
    selectors.getAckById = () => selector;

    testSaga(getReportData, action).next()
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
      recipients: `${base}/acknowledgments/${data.id}/recipients`,
      acknowledgment: `${base}/acknowledgments/${data.id}`,
    };
    action = { payload: data.id };

    const selector = () => fromJS(acknowledgment);
    selectors.getAckById = () => selector;

    testSaga(getReportData, action).next()
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
    const errGen = getReportData(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getReportDataFailure(error)));
    expect(errGen.next()).toEqual({ done: true, value: undefined });
  });
});

