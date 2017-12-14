import { put, takeEvery, select } from 'redux-saga/effects';

import { authenticate } from 'utils/requestWithToken';

import { selectApp } from './selectors';
import { REQUEST, SUCCESS, FAILURE, AUTH_USER } from './constants';
import { changeAppStatus } from './actions';

export function* matchPattern(action) {
  const type = action.type;
  const app = yield select(selectApp);

  if (!app.get('error')) {
    if (type.match(REQUEST)) {
      yield put(changeAppStatus({ loading: app.get('loading') + 1, error: null }));
    }

    if (type.match(SUCCESS) || type.match(FAILURE)) {
      yield put(changeAppStatus({ loading: app.get('loading') - 1, error: action.error ? action.payload : null }));
    }
  }
}

export default function* appHubSaga() {
  yield takeEvery(AUTH_USER, authenticate);
  yield takeEvery('*', matchPattern);
}
