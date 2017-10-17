// import { take, call, put, select } from 'redux-saga/effects';
import { call, takeEvery } from 'redux-saga/effects';
import { authenticate } from 'utils/request';

import { REQUEST } from './constants';

export function* matchPattern(action) {
  const type = action.type;

  if (type.match(REQUEST)) {
    yield call(authenticate, 'BARS');
  }
}

export default function* appHubSaga() {
  yield takeEvery('*', matchPattern);
}
