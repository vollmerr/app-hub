// import { delay } from 'redux-saga';
import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import * as api from '../../utils/api';

import { getUserSid } from '../AppHub/selectors';

import * as actions from './actions';
import * as C from './constants';


export const base = API.SPA;


// HOME PAGE

/**
 * GETs user data (recipients, acknowledgments)
 */
export function* getUserData() {
  try {
    const sid = yield select(getUserSid);

    const urls = {
      recipients: `${base}/recipients/${sid}`,
      acknowledgments: `${base}/recipients/${sid}/acknowledgments`,
    };

    const [recipients, acknowledgments] = yield all([
      call(api.requestWithToken, urls.recipients),
      call(api.requestWithToken, urls.acknowledgments),
    ]);

    yield put(actions.getUserDataSuccess({ recipients, acknowledgments }));
  } catch (error) {
    yield put(actions.getUserDataFailure(error));
  }
}

/**
 * PUT an existing acknowledgment as acknowledged/read
 *
 * @param {object} action   - action that was dispatched
 */
export function* readAck(action) {
  try {
    const id = action.payload[C.RECIPIENT.ID];
    const url = `${base}/recipients/${id}/acknowledge`;
    const options = {
      method: 'POST',
    };

    yield call(api.requestWithToken, url, options);
    yield put(actions.readAckSuccess(action.payload));
  } catch (error) {
    yield put(actions.readAckFailure(error));
  }
}


// ADMIN PAGE

/**
 * GETs admin data (acknowledgments)
 */
export function* getAdminData() {
  try {
    const url = `${base}/acknowledgments`;

    const acknowledgments = yield call(api.requestWithToken, url);
    yield put(actions.getAdminDataSuccess({ acknowledgments }));
  } catch (error) {
    yield put(actions.getAdminDataFailure(error));
  }
}


/**
 * GETs the lists of AD groups
 *
 * @param {object} action   - action that was dispatched
 */
export function* getGroups() {
  try {
    const urls = {
      targets: `${base}/groups/targets`,
      creators: `${base}/groups/creators`,
    };

    const [targets, creators] = yield all([
      call(api.requestWithToken, urls.targets),
      call(api.requestWithToken, urls.creators),
    ]);

    yield put(actions.getGroupsSuccess({ targets, creators }));
  } catch (error) {
    yield put(actions.getGroupsFailure(error));
  }
}

/**
 * POSTs a new acknowledgment to the api
 *
 * @param {object} action   - action that was dispatched
 */
export function* newAck(action) {
  try {
    const url = `${base}/acknowledgments`;
    const options = {
      method: 'POST',
      body: action.payload,
    };

    const data = yield call(api.requestWithToken, url, options);
    yield put(actions.newAckSuccess(data));
  } catch (error) {
    yield put(actions.newAckFailure(error));
  }
}


/**
 * PATCHs an existing acknowledgment with disable
 *
 * @param {object} action   - action that was dispatched
 */
export function* disableAck(action) {
  try {
    const id = action.payload[C.ACK.ID];
    // TODO: API SHOULD HANDLE SETTING DISABLED OR CANCELED.........
    const value = action.payload[C.ACK.STATUS] === C.STATUS.PENDING ? C.STATUS.CANCELED : C.STATUS.DISABLED;
    const url = `${base}/acknowledgments/${id}`;
    const options = {
      method: 'PATCH',
      body: [
        {
          value,
          op: 'replace',
          path: `/${C.ACK.STATUS}`,
        },
      ],
    };

    const data = yield call(api.requestWithToken, url, options);
    yield put(actions.disableAckSuccess(data));
  } catch (error) {
    yield put(actions.disableAckFailure(error));
  }
}


// REPORT

/**
 * GETs the recipients for an existing acknowledgment
 *
 * @param {object} action   - action that was dispatched
 */
export function* getAckRecipients(action) {
  try {
    const id = action.payload[C.ACK.ID];
    const url = `${base}/acknowledgments/${id}/recipients`;

    const recipients = yield call(api.requestWithToken, url);
    yield put(actions.getAckRecipientsSuccess({ recipients, id }));
  } catch (error) {
    yield put(actions.getAckRecipientsFailure(error));
  }
}


export default function* root() {
  yield [
    // home
    takeLatest(C.GET_USER_DATA_REQUEST, getUserData),
    takeLatest(C.READ_ACK_REQUEST, readAck),
    // admin
    takeLatest(C.GET_ADMIN_DATA_REQUEST, getAdminData),
    takeLatest(C.GET_GROUPS_REQUEST, getGroups),
    takeLatest(C.NEW_ACK_REQUEST, newAck),
    takeLatest(C.DISABLE_ACK_REQUEST, disableAck),
    // report
    takeLatest(C.GET_ACK_RECIPIENTS_REQUEST, getAckRecipients),
  ];
}
