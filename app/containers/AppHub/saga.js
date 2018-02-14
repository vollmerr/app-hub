import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { authenticate } from 'utils/api';

import * as selectors from './selectors';
import * as actions from './actions';
import * as C from './constants';


export function* matchPattern(action) {
  const type = action.type;
  const app = yield select(selectors.getApp);

  if (type.match(C.REQUEST)) {
    yield put(actions.changeAppStatus({ loading: app.get('loading') + 1, error: null }));
  }

  if (type.match(C.SUCCESS)) {
    yield put(actions.changeAppStatus({ loading: app.get('loading') - 1, error: null }));
  }

  if (type.match(C.FAILURE)) {
    yield put(actions.changeAppStatus({ loading: app.get('loading') - 1, error: action.payload }));
  }
}


export default function* appHubSaga() {
  yield [
    takeLatest(C.AUTH_USER, authenticate),
    takeEvery('*', matchPattern),
  ];
}
