import { takeEvery, call, put } from 'redux-saga/effects';

import requestWithToken from 'utils/requestWithToken';
import { INIT_DATA_REQUEST } from './constants';
import { initDataSuccess, initDataFailure } from './actions';


export function* paasWorker() {
  try {
    const data = yield call(requestWithToken, 'TODO');
    yield put(initDataSuccess(data));
  } catch (error) {
    yield put(initDataFailure(error));
  }
}

function* paasSaga() {
  yield takeEvery(INIT_DATA_REQUEST, paasWorker);
}

export default paasSaga;
