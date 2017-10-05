// import { take, call, put, select } from 'redux-saga/effects';
import { call, takeEvery } from 'redux-saga/effects';
import { authenticate } from 'utils/request';
import { REQUEST } from './constants';

function* authenticateUser(action) {
  if (action.type.match(REQUEST)) {
    yield call(authenticate, 'BARS');
  }
}

export default function* appHubSaga() {
  yield takeEvery('*', authenticateUser);
}
