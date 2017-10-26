import { takeEvery, call, put } from 'redux-saga/effects';

import requestWithToken from 'utils/requestWithToken';
import { INIT_DATA_REQUEST } from './constants';
import actions from './actions';


export function* testAppWorker() {
  try {
    const data = yield call(requestWithToken, 'TODO');
    yield put(actions.initDataSuccess(data));
  } catch (error) {
    yield put(actions.initDataFailure(error));
  }
}

function* testAppSaga() {
  yield takeEvery(INIT_DATA_REQUEST, testAppWorker);
}

export default testAppSaga;
