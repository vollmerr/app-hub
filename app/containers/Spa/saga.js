import { takeEvery, call, put } from 'redux-saga/effects';

import requestWithToken from 'utils/requestWithToken';
import { INIT_DATA_REQUEST } from './constants';
import { initDataSuccess, initDataFailure } from './actions';

export const api = API.BARS;

export function* initData() {
  try {
    const data = yield call(requestWithToken, api);
    yield put(initDataSuccess(data));
  } catch (error) {
    yield put(initDataFailure(error));
  }
}

function* spaSaga() {
  yield takeEvery(INIT_DATA_REQUEST, initData);
}

export default spaSaga;
