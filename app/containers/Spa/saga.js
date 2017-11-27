import { takeLatest, call, put } from 'redux-saga/effects';

import requestWithToken from 'utils/requestWithToken';

import {
  INIT_DATA_REQUEST,
  NEW_ACK_REQUEST,
} from './constants';

import {
  initDataSuccess,
  initDataFailure,
  newAckSuccess,
  newAckFailure,
} from './actions';

const base = API.SPA;
export const urls = {
  initData: `${base}/`,
  newAck: `${base}/acknowledgments`,
};

export function* initData() {
  try {
    const data = yield call(requestWithToken, urls.initData);
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
    const options = {
      method: 'POST',
      body: action.payload.toJS(),
    };
    const data = yield call(requestWithToken, urls.newAck, options);
    yield put(newAckSuccess(data));
  } catch (error) {
    yield put(newAckFailure(error));
  }
}

function* spaSaga() {
  yield takeLatest(INIT_DATA_REQUEST, initData);
  yield takeLatest(NEW_ACK_REQUEST, newAck);
}

export default spaSaga;
