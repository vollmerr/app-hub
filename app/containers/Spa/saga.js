// import { delay } from 'redux-saga';
import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import requestWithToken from 'utils/requestWithToken';
import { makeSelectUserSid } from 'containers/AppHub/selectors';

import * as C from './constants';
import * as actions from './actions';

export const base = API.SPA;


/**
 * GETs user data (recipients, acknowledgments)
 */
export function* getUserData() {
  try {
    const selector = makeSelectUserSid();
    const sid = yield select(selector);

    const urls = {
      recipients: `${base}/recipients/${sid}`,
      acknowledgments: `${base}/recipients/${sid}/acknowledgments`,
    };

    const [recipients, acknowledgments] = yield all([
      call(requestWithToken, urls.recipients),
      call(requestWithToken, urls.acknowledgments),
    ]);

    yield put(actions.getUserDataSuccess({ recipients, acknowledgments }));
  } catch (error) {
    yield put(actions.getUserDataFailure(error));
  }
}


/**
 * GETs admin data (acknowledgments)
 */
export function* getAdminData() {
  try {
    const url = `${base}/acknowledgments`;

    const acknowledgments = yield call(requestWithToken, url);
    yield put(actions.getAdminDataSuccess({ acknowledgments }));
  } catch (error) {
    yield put(actions.getAdminDataFailure(error));
  }
}


/**
 * GETs the lists of AD groups
 *
 * @param {object} action   - action that was dispatched, with immutable payload
 */
export function* getGroups() {
  try {
    const urls = {
      targets: `${base}/groups/targets`,
      creators: `${base}/groups/creators`,
    };

    const [targets, creators] = yield all([
      call(requestWithToken, urls.targets),
      call(requestWithToken, urls.creators),
    ]);

    yield put(actions.getGroupsSuccess({ targets, creators }));
  } catch (error) {
    yield put(actions.getGroupsFailure(error));
  }
}


/**
 * GETs the recipients for an existing acknowledgment
 *
 * @param {object} action   - action that was dispatched, with immutable payload
 */
export function* getAckRecipients(action) {
  try {
    const id = action.payload.id;
    const url = `${base}/acknowledgements/${id}/recipients`;

    const recipients = yield call(requestWithToken, url);
    yield put(actions.getAckRecipientsSuccess({ recipients, id }));
  } catch (error) {
    yield put(actions.getAckRecipientsFailure(error));
  }
}


/**
 * POSTs a new acknowledgment to the api
 *
 * @param {object} action   - action that was dispatched, with immutable payload
 */
export function* newAck(action) {
  try {
    const url = `${base}/acknowledgments`;
    const options = {
      method: 'POST',
      body: action.payload.toJS(),
    };

    const data = yield call(requestWithToken, url, options);
    yield put(actions.newAckSuccess(data));
  } catch (error) {
    yield put(actions.newAckFailure(error));
  }
}


/**
 * PATCHs an existing acknowledgment with disable
 *
 * @param {object} action   - action that was dispatched, with immutable payload
 */
export function* disableAck(action) {
  try {
    const id = action.payload.id;
    const url = `${base}/acknowledgments/${id}`;
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

    const data = yield call(requestWithToken, url, options);
    yield put(actions.disableAckSuccess(data));
  } catch (error) {
    yield put(actions.disableAckFailure(error));
  }
}


function* spaSaga() {
  yield takeLatest(C.GET_USER_DATA_REQUEST, getUserData);
  yield takeLatest(C.GET_ADMIN_DATA_REQUEST, getAdminData);
  yield takeLatest(C.GET_GROUPS_REQUEST, getGroups);
  yield takeLatest(C.GET_ACK_RECIPIENTS_REQUEST, getAckRecipients);
  yield takeLatest(C.NEW_ACK_REQUEST, newAck);
  yield takeLatest(C.DISABLE_ACK_REQUEST, disableAck);
}

export default spaSaga;
