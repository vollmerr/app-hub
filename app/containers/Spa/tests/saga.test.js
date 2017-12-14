/* eslint-disable redux-saga/yield-effects */
import { put, call } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';

import requestWithToken from 'utils/requestWithToken';
import * as selectors from 'containers/AppHub/selectors';

import spaSaga, {
  getUserData,
  getAdminData,
  getGroups,
  getAckRecipients,
  newAck,
  disableAck,
  base,
} from '../saga';

import * as C from '../constants';
import * as actions from '../actions';

const data = { recipients: ['1', '2'], acknowledgments: ['3', '4'], id: 1 };
const groups = { targets: ['1', '2'], creators: ['13', '23'] };
const error = { message: 'test error' };

let action;


describe('spaSaga', () => {
  it(`should take the latest
      'GET_USER_DATA_REQUEST',
      'GET_ADMIN_DATA_REQUEST',
      'GET_GROUPS_REQUEST',
      'GET_ACK_RECIPIENTS_REQUEST',
      'NEW_ACK_REQUEST',
      'DISABLE_ACK_REQUEST''`,
    () => {
      testSaga(spaSaga).next()
        .takeLatestEffect(C.GET_USER_DATA_REQUEST, getUserData).next()
        .takeLatestEffect(C.GET_ADMIN_DATA_REQUEST, getAdminData).next()
        .takeLatestEffect(C.GET_GROUPS_REQUEST, getGroups).next()
        .takeLatestEffect(C.GET_ACK_RECIPIENTS_REQUEST, getAckRecipients).next()
        .takeLatestEffect(C.NEW_ACK_REQUEST, newAck).next()
        .takeLatestEffect(C.DISABLE_ACK_REQUEST, disableAck).next()
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
    const selector = () => sid;
    selectors.makeSelectUserSid = () => selector;

    testSaga(getUserData).next()
      .select(selector).next(sid)
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


describe('getAckRecipients', () => {
  it('should call the api and update the store with its results', () => {
    action = { payload: { id: data.id } };
    const url = `${base}/acknowledgements/${data.id}/recipients`;

    testSaga(getAckRecipients, action).next()
      .call(requestWithToken, url).next(data.recipients)
      .put(actions.getAckRecipientsSuccess({
        recipients: data.recipients,
        id: data.id,
      })).next()
      .finish().isDone();
  });

  it('should handle errors', () => {
    const errGen = getAckRecipients(action);
    errGen.next();
    expect(errGen.throw(error).value).toEqual(put(actions.getAckRecipientsFailure(error)));
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
          value: C.STATUS.DISABLED, // TODO... DISBALED VALUE / STATUS IN GENERAL
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
