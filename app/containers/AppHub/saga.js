import { call, put, takeEvery } from 'redux-saga/effects';
import { authenticate } from 'utils/requestWithToken';

import { REQUEST, SUCCESS, FAILURE } from './constants';
import { changeAppStatus } from './actions';

export function* matchPattern(action) {
  const type = action.type;

  if (type.match(REQUEST)) {
    yield call(authenticate, 'BARS');
  }

  if (type.match(SUCCESS) || type.match(FAILURE)) {
    yield put(changeAppStatus({ loading: false, error: action.error || null }));
  }
}

export default function* appHubSaga() {
  yield takeEvery('*', matchPattern);
}
