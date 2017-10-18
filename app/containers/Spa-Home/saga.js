// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeEvery } from 'redux-saga/effects';
import requestWithToken from 'utils/requestWithToken';
import { EXAMPLE_DATA_REQUEST } from './constants';
import { exampleDataSuccess, exampleDataFailure } from './actions';

// example of a url, just dummy data pulled in
const exampleUrl = 'http://barsapi/api/BadgeRequests/GetBarsAppStartupData/';

function* exampleDataSagaWorker() {
  try {
    const data = yield call(requestWithToken, exampleUrl);
    yield put(exampleDataSuccess(data));
  } catch (error) {
    yield put(exampleDataFailure(error.message));
  }
}

export default function* spaHomeSaga() {
  yield takeEvery(EXAMPLE_DATA_REQUEST, exampleDataSagaWorker);
}
