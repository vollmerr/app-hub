import { takeLatest, call, put } from 'redux-saga/effects';

import requestWithToken from 'utils/requestWithToken';

import {
  INIT_DATA_REQUEST,
  NEW_ACK_REQUEST,
  DISABLE_ACK_REQUEST,
  STATUS,
  ACK,
} from './constants';

import {
  initDataSuccess,
  initDataFailure,
  newAckSuccess,
  newAckFailure,
  disableAckSuccess,
  disableAckFailure,
} from './actions';

export const base = API.SPA;

export function* initData() {
  try {
    const url = `${base}/`; // TODO! STARTUP ROUTE!
    const data = yield call(requestWithToken, url);
    yield put(initDataSuccess(data));
  } catch (error) {
    yield put(initDataFailure(error));
  }
}

/**
 * Posts a new acknowledgment to the api
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
    yield put(newAckSuccess(data));
  } catch (error) {
    yield put(newAckFailure(error));
  }
}

/**
 * Disables an existing acknowledgment
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
          path: `/${ACK.STATUS}`,
          value: STATUS.DISABLED, // TODO... DISBALED VALUE / STATUS IN GENERAL
        },
      ],
    };
    const data = yield call(requestWithToken, url, options);
    yield put(disableAckSuccess(data));
  } catch (error) {
    yield put(disableAckFailure(error));
  }
}

function* spaSaga() {
  yield takeLatest(INIT_DATA_REQUEST, initData);
  yield takeLatest(NEW_ACK_REQUEST, newAck);
  yield takeLatest(DISABLE_ACK_REQUEST, disableAck);
}

export default spaSaga;
