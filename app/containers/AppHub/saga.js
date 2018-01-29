import { put, takeEvery, select } from 'redux-saga/effects';

import { authenticate } from 'utils/api';

import * as selectors from './selectors';
import * as actions from './actions';
import * as C from './constants';


export function* matchPattern(action) {
  const type = action.type;
  const app = yield select(selectors.selectApp);

  if (!app.get('error')) {
    if (type.match(C.REQUEST)) {
      yield put(actions.changeAppStatus({ loading: app.get('loading') + 1, error: null }));
    }

    if (type.match(C.SUCCESS) || type.match(C.FAILURE)) {
      yield put(actions.changeAppStatus({ loading: app.get('loading') - 1, error: action.error ? action.payload : null }));
    }
  }
}


export default function* appHubSaga() {
  yield takeEvery(C.AUTH_USER, authenticate);
  yield takeEvery('*', matchPattern);
}

// TODO: tests
