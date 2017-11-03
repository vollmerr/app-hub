import { call, put, takeEvery } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import requestWithToken from 'utils/requestWithToken';
import { EXAMPLE_DATA_REQUEST } from './constants';
import { exampleDataSuccess, exampleDataFailure } from './actions';

// example of a url, just dummy data pulled in
const exampleUrl = 'http://barsapi/api/BadgeRequests/GetBarsAppStartupData/';

function* exampleDataSagaWorker() {
  try {
    const data = yield call(requestWithToken, exampleUrl);
    // yield delay(2000) // uncomment to guarantee some delay for testing
    yield put(exampleDataSuccess(data));
  } catch (error) {
    yield put(exampleDataFailure(error.message));
  }
}

export default function* demoHomeSaga() {
  yield takeEvery(EXAMPLE_DATA_REQUEST, exampleDataSagaWorker);
}
