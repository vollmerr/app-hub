// import { delay } from 'redux-saga';
import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import * as api from '../../utils/api';

import { getUserSid } from '../AppHub/selectors';

import * as selectors from './selectors';
import * as actions from './actions';
import * as C from './constants';


export const base = API.SPA;


/**
 * GETs acknowledgment status codes
 */
export function* getAckStatus() {
  try {
    const url = `${base}/acknowledgementstatuses`;

    const status = yield call(api.requestWithToken, url);
    yield put(actions.getAckStatusSuccess(status));
  } catch (error) {
    yield put(actions.getAckStatusFailure(error));
  }
}


// HOME PAGE

/**
 * GETs user data (recipients, acknowledgments)
 */
export function* getUserData() {
  try {
    const sid = yield select(getUserSid);

    const urls = {
      recipients: `${base}/recipients/${sid}`,
      acknowledgments: `${base}/recipients/${sid}/acknowledgements`,
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
    const url = `${base}/acknowledgements`;

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
      targets: `${base}/targets`,
      creators: `${base}/creators`,
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
    const url = `${base}/acknowledgements`;
    const options = {
      method: 'POST',
      body: action.payload,
    };
// options.body.creatorGroupSid = 'S-1-5-21-695811389-1873965473-9522986-26199';
    const data = yield call(api.requestWithToken, url, options);
    yield put(actions.newAckSuccess(data));
  } catch (error) {
    yield put(actions.newAckFailure(error));
  }
}


/**
 * POSTs an acknowledgment to the api in draft mode
 *
 * @param {object} action   - action that was dispatched
 */
export function* saveAck(action) {
  try {
    const url = `${base}/acknowledgements`;
    const options = {
      method: 'POST',
      body: action.payload,
    };
// options.body.creatorGroupSid = 'S-1-5-21-695811389-1873965473-9522986-26199';
    const data = yield call(api.requestWithToken, url, options);
    yield put(actions.newAckSuccess(data));
  } catch (error) {
    yield put(actions.newAckFailure(error));
  }
}


/**
 * POST an existing acknowledgment to disable it
 *
 * @param {object} action   - action that was dispatched
 */
export function* deactivateAck(action) {
  try {
    const id = action.payload[C.ACK.ID];
    const url = `${base}/acknowledgements/${id}/deactivate`;
    const options = {
      method: 'POST',
    };

    const data = yield call(api.requestWithToken, url, options);
    yield put(actions.deactivateAckSuccess(data));
  } catch (error) {
    yield put(actions.deactivateAckFailure(error));
  }
}


// REPORT

/**
 * GETs the report data
 *
 * @param {object} action   - action that was dispatched
 */
export function* getReportData(action) {
  try {
    const id = action.payload;
    const selector = selectors.getAckById(id);
    let acknowledgment = yield select(selector);

    const urls = {
      recipients: `${base}/acknowledgements/${id}/recipients`,
      acknowledgment: `${base}/acknowledgements/${id}`,
    };
    let recipients;
    // id acknowledgment details aleady exist, dont refetch
    if (acknowledgment) {
      recipients = yield call(api.requestWithToken, urls.recipients);
      acknowledgment = acknowledgment.toJS();
    } else {
      [recipients, acknowledgment] = yield all([
        call(api.requestWithToken, urls.recipients),
        call(api.requestWithToken, urls.acknowledgment),
      ]);
    }
    yield put(actions.getReportDataSuccess({ recipients, acknowledgment }));
  } catch (error) {
    yield put(actions.getReportDataFailure(error));
  }
}


export default function* spaSaga() {
  yield [
    takeLatest(C.GET_ACK_STATUS_REQUEST, getAckStatus),
    // home
    takeLatest(C.GET_USER_DATA_REQUEST, getUserData),
    takeLatest(C.READ_ACK_REQUEST, readAck),
    // admin
    takeLatest(C.GET_ADMIN_DATA_REQUEST, getAdminData),
    takeLatest(C.GET_GROUPS_REQUEST, getGroups),
    takeLatest(C.NEW_ACK_REQUEST, newAck),
    takeLatest(C.SAVE_ACK_REQUEST, saveAck),
    takeLatest(C.DEACTIVATE_ACK_REQUEST, deactivateAck),
    // report
    takeLatest(C.GET_REPORT_DATA_REQUEST, getReportData),
  ];
}
