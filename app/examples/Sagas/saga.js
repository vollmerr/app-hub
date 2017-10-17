import { delay } from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import { request } from 'utils/request';

import { EXAMPLE_DATA_REQUEST } from './constants';
import { exampleFailure, exampleSuccess } from './actions';

// example of a url, just dummy data pulled in
export const exampleUrl = 'https://jsonplaceholder.typicode.com/posts/1';

/**
 * This function is a generator (notice the * after function), meaning it
 * can 'pause' to do an async action, then resume once the result returns.
 *
 * This function makes a call to the API and puts the result into the
 * redux store once it returns.
 */
export function* exampleSagaWorker() {
  try {
    const data = yield call(request, exampleUrl);
    yield delay(500); // making sure async delay is noticable for example by adding a delay
    yield put(exampleSuccess(data));
  } catch (error) {
    yield put(exampleFailure(error));
  }
}

/**
 * This function is a generator (notice the * after function), meaning it
 * can 'pause' to do an async action, then resume once the result returns.
 *
 * This function waits until EXAMPLE_DATA_REQUEST is dispatched
 * to the redux store (from an action), at which point it calls exampleSagaWorker
 */
function* exampleSaga() {
  yield takeEvery(EXAMPLE_DATA_REQUEST, exampleSagaWorker);
}

export default exampleSaga;
