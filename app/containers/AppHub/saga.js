import { put, takeEvery } from 'redux-saga/effects';
import { authenticate } from 'utils/requestWithToken';

import { REQUEST, SUCCESS, FAILURE, AUTH_USER } from './constants';
import { changeAppStatus } from './actions';

export function* matchPattern(action) {
  const type = action.type;

  if (type.match(REQUEST)) {
    yield put(changeAppStatus({ loading: true, error: null }));
  }

  if (type.match(SUCCESS) || type.match(FAILURE)) {
    yield put(changeAppStatus({ loading: false, error: action.error ? action.payload : null }));
  }
}

export default function* appHubSaga() {
  yield takeEvery(AUTH_USER, authenticate);
  yield takeEvery('*', matchPattern);
}
