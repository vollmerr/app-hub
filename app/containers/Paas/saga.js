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


function* paasSaga() {
  yield takeEvery(C.GET_MANAGER_DATA_REQUEST, getManagerData);
}


export default paasSaga;
