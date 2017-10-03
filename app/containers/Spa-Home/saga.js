// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import { EXAMPLE_DATA_REQUEST } from './constants';
import { exampleDataSuccess } from './actions';

// example of a url, just dummy data pulled in
const exampleUrl = 'https://jsonplaceholder.typicode.com/posts/1';

/**
 * This function is a generator (notice the * after function), meaning it
 * can 'pause' to do an async action, then resume once the result returns.
 *
 * This function makes a call to the API and puts the result into the
 * redux store once it returns.
 */
function* exampleDataSagaWorker() {
  try {
    const data = yield call(request, exampleUrl);
    yield put(exampleDataSuccess(data));
  } catch (error) {
    console.log("FETCH FAILURE: ", error)
  }
}


/**
 * This function is a generator (notice the * after function), meaning it
 * can 'pause' to do an async action, then resume once the result returns.
 *
 * This function waits until EXAMPLE_DATA_REQUEST is dispatched
 * to the redux store (from an action), at which point it calls exampleSagaWorker
 */
export default function* spaHomeSaga() {
  yield takeEvery(EXAMPLE_DATA_REQUEST, exampleDataSagaWorker);
}
