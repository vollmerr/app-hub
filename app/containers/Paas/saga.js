// import { delay } from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';

import requestWithToken from 'utils/requestWithToken';
import * as C from './constants';
import * as actions from './actions';


export const base = API.PAAS;


export function* getManagerData() {
  try {
    const url = `${base}`;
    const data = yield call(requestWithToken, url);
    yield put(actions.getManagerDataSuccess(data));
  } catch (error) {
    yield put(actions.getManagerDataFailure(error));
  }
}


export function* updateUsers(action) {
  try {
    const url = `${base}`;
    const options = {
      method: 'POST',
      body: action.payload,
    };

    yield call(requestWithToken, url, options);
    yield put(actions.updateUsersSuccess(action.payload));
  } catch (error) {
    yield put(actions.updateUsersFailure(error));
  }
}


function* paasSaga() {
  yield takeEvery(C.GET_MANAGER_DATA_REQUEST, getManagerData);
  yield takeEvery(C.UPDATE_USERS_REQUEST, updateUsers);
}


export default paasSaga;
